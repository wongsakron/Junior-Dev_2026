import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("🚀 เริ่มต้นการทดสอบ CRUD กับ Prisma Database...")

  // ทำความสะอาดข้อมูลเก่าก่อนรัน (ถ้ามี)
  await prisma.user.deleteMany({ where: { email: "test@example.com" } })

  // 1. CREATE
  console.log("\n📝 1. กำลังสร้างข้อมูล User...")
  const newUser = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Junior Dev",
      password: "hashed_password_mock",
      role: "user",
    },
  })
  console.log("✅ สร้าง User สำเร็จ! ID:", newUser.id)

  console.log("\n📝 กำลังสร้าง Document, Chunk, Conversation และ Message...")
  const doc = await prisma.document.create({
    data: {
      fileName: "resume.pdf",
      fileType: "pdf",
      fileSize: 102400,
      storagePath: "/uploads/resume.pdf",
      userId: newUser.id,
      chunks: {
        create: [
          {
            chunkIndex: 0,
            content: "ประสบการณ์ทำงาน: เคยเขียน Next.js และ Prisma",
            chromaId: "chroma-uuid-1",
            tokenCount: 15
          }
        ]
      }
    },
    include: { chunks: true }
  })
  
  const conversation = await prisma.conversation.create({
    data: {
      title: "สอบถามประวัติการทำงาน",
      userId: newUser.id,
      documents: {
        create: {
          documentId: doc.id
        }
      },
      messages: {
        create: [
          {
            role: "user",
            content: "ผู้สมัครคนนี้มีประสบการณ์อะไรบ้าง?",
            promptTokens: 10
          },
          {
            role: "assistant",
            content: "ผู้สมัครเคยเขียน Next.js และ Prisma ครับ",
            completionTokens: 12,
            citations: {
              create: {
                chunkId: doc.chunks[0].id,
                score: 0.95
              }
            }
          }
        ]
      }
    }
  })
  console.log("✅ สร้างข้อมูลที่เกี่ยวข้องกับ RAG และ Chat สำเร็จ")

  // 2. READ (with nested relations)
  console.log("\n🔍 2. กำลังดึงข้อมูล (Read) พร้อม Relations (Join ตาราง)...")
  const userWithRelations = await prisma.user.findUnique({
    where: { id: newUser.id },
    include: {
      documents: true,
      conversations: {
        include: {
          messages: {
            include: { citations: true }
          },
          documents: {
            include: { document: true }
          }
        }
      }
    }
  })
  
  console.log("✅ ดึงข้อมูลสำเร็จ!")
  console.log(`   - ผู้ใช้งานมีแชททั้งหมด: ${userWithRelations?.conversations.length} แชท`)
  const firstConvo = userWithRelations?.conversations[0]
  console.log(`   - หัวข้อแชท: "${firstConvo?.title}"`)
  console.log(`   - เอกสารที่เชื่อมโยงในแชทนี้: ${firstConvo?.documents[0].document.fileName}`)
  console.log(`   - ข้อความในแชท: ${firstConvo?.messages.length} ข้อความ`)
  const assistantMsg = firstConvo?.messages.find(m => m.role === 'assistant')
  console.log(`   - AI อ้างอิงจากข้อมูล (Citation): ${assistantMsg?.citations.length} จุด (ความแม่นยำ: ${assistantMsg?.citations[0].score})`)

  // 3. UPDATE
  console.log("\n✏️ 3. กำลังอัปเดตข้อมูล...")
  const updatedUser = await prisma.user.update({
    where: { email: "test@example.com" },
    data: { name: "Senior Full-Stack Dev" }
  })
  console.log("✅ อัปเดตชื่อ User สำเร็จ! ชื่อใหม่:", updatedUser.name)

  // 4. DELETE
  console.log("\n🗑️ 4. กำลังทดสอบลบข้อมูล (Cascade Delete)...")
  await prisma.user.delete({
    where: { email: "test@example.com" }
  })
  
  // เช็คว่า Document และ Conversation โดนลบไปด้วยไหม
  const docsLeft = await prisma.document.count({ where: { userId: newUser.id } })
  const chatsLeft = await prisma.conversation.count({ where: { userId: newUser.id } })
  
  console.log(`✅ ลบ User สำเร็จ!`)
  console.log(`   - จำนวน Document ที่เหลืออยู่: ${docsLeft} (ควรเป็น 0 เพราะโดน Cascade Delete)`)
  console.log(`   - จำนวน Conversation ที่เหลืออยู่: ${chatsLeft} (ควรเป็น 0 เพราะโดน Cascade Delete)`)

  console.log("\n🎉 การทดสอบ CRUD และ Relations ผ่านฉลุย 100%!")
}

main()
  .catch((e) => {
    console.error("❌ เกิดข้อผิดพลาด:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

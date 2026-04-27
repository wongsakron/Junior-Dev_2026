## Session 0: Setup และการวางแผน Architecture
Prompt สรุปสิ่งที่ฉันควรทำ และสถาปัตยกรรมที่ แนะนำสำหรับ poc ตรงกับโจทย์ ในระยะเวลาจำกัด และ มีโอกาศได้งานมากที่สุด (แนบไฟล์เอกสาร.txt โจทย์)

AI Response:[สรุปสั้นๆ] 
Part 1: Coding Task (65 คะแนน + โบนัส 15 คะแนน)
เป้าหมาย: สร้าง Mini Knowledge Assistant ที่อัปโหลดไฟล์ ถามตอบได้ และมีระบบ Login สิ่งที่ต้องส่ง: GitHub Repo (Public), ไฟล์ README.md, AI_JOURNAL.md, และ DECISIONS.md จุดโฟกัสเพื่อคะแนนสูงสุด: Commit history ที่เป็นระบบ (ห้ามรวมเป็นก้อนเดียว), โครงสร้างโค้ดที่มี Layering ชัดเจน (Route/Service/Repo), และการจัดการ Error 

Part 2: Business Scenario Video (35 คะแนน)เป้าหมาย: อัดคลิปไม่เกิน 3 นาที แก้ปัญหากรณีลูกค้าระดับ VIP โกรธเพราะระบบล็อกอินไม่ได้ (สาเหตุจากคนในทีมรีเซ็ตแล้วไม่บอก) จุดโฟกัสเพื่อคะแนนสูงสุด: การควบคุมอารมณ์, ขอโทษอย่างมืออาชีพ, ไม่โยนความผิดให้เพื่อนร่วมทีมต่อหน้าลูกค้า, และขอเวลา (เช่น 10-15 นาที) เพื่อตรวจสอบและโทรกลับ 

Part 3: Leadership Reflection (20 คะแนน)
เป้าหมาย: เขียนแผน 500-1,000 คำ สำหรับการ Onboard Trainee ใหม่ 5 คนใน 4 เดือน จุดโฟกัสเพื่อคะแนนสูงสุด: แผนงานรายสัปดาห์ (Week-by-week) ที่ทำได้จริง, มีเป้าหมายที่วัดผลได้ชัดเจน เช่น การตั้งเป้าให้ทำ PR (Pull Request) แรกผ่านในสัปดาห์ที่ 4 เป็นต้น 

Part 4: Legacy System Thinking (20 คะแนน)
เป้าหมาย: เขียนแผน 400-800 คำ อธิบายวิธีรับมือกับ Legacy System อายุ 10 ปี และไฟล์ต้องสงสัยที่ถูก Obfuscate 
จุดโฟกัสเพื่อคะแนนสูงสุด: ลำดับความสำคัญ (Risk Awareness), การไม่ด่วนตัดสินใจลบไฟล์ทันที (ป้องกันผลกระทบกับลูกค้าและการทำลายหลักฐาน), และการตั้งคำถามกลับอย่างฉลาด 

สถาปัตยกรรมที่แนะนำสำหรับ POC (เน้นจบไว โอกาสได้งานสูง)

- Frontend + Backend: Next.js 14 (App Router) (Full-stack เพื่อลดงาน Backend ที่ต้องติดตั้งเพิ่มเติม)
- Database: SQLite + Prisma ORM (ไม่ต้องติดตั้ง Postgres เพิ่ม)
- Vector DB: ChromaDB standalone service
- LLM: Vercel AI SDK + OpenAI API (รองรับ Streaming)
- Deployment: 1 docker-compose up รันครั้งเดียวจบ


เทคนิคดึงคะแนน เพิ่มเติม
- จด Prompt ที่ใช้ เวลาคุณใช้งาน IDE อย่าง Google Antigravity หรือแชทกับ AI ให้เปิดไฟล์ AI_JOURNAL.md ทิ้งไว้ควบคู่กันไปเลย ถามปุ๊บ จดปั๊บ อย่ารอไปเขียนทีเดียวตอนจบเพราะจะลืม
- ที่สำคัญที่สุดคือต้องเขียน "My Adjustment" ให้ชัดเจน เช่น "AI แนะนำให้ใช้ Context API จัดการ State แต่ฉันปรับมาใช้ Zustand แทนเพื่อลด Re-render และให้โค้ดคลีนขึ้น" การทำแบบนี้ประมาณ 15-30 sessions จะช่วยการันตีคะแนนโบนัสส่วนนี้

My Adjustment: เป็นไปตามคำแนะนำของ AI เนื่องจาก satck ยังเป็นแบบ POC และเวลามีจำกัด

## Session 1:  ติดตั้ง nextjs  + css tailwill
Prompt: ติดตั้ง nextjs14Ts  + css tailwill

output: ผมจัดการติดตั้ง Next.js 14 พร้อมกับ TypeScript และ Tailwind CSS ลงในโฟลเดอร์ให้เรียบร้อยแล้วครับ!

My Adjustment: ตั้งค่า output: "standalone"ใน next.config.mjs

## Session 2: ทำ docker-compose สำหรับ Next.js 14

Prompt: "สร้าง docker-compose รันแค่ครั้งเดียว ตามโจทย์ และสร้าง dockerfile สำหรับโปรเจกต์ Nextjs ขอแบบให้กินพื้นที่น้อยๆด้วย  


AI Response: ผมได้สร้างไฟล์ Dockerfile, .dockerignore และ docker-compose.yml ให้สอดคล้องกับ
การทำ Multi-stage build อย่างเหมาะสม เพื่อให้ได้ Image ขนาดเล็กที่สุดสำหรับการนำไปรันบน Production

"My Adjustment" เพิ่ม RUN npx prisma generate ไว้ในฝั่ง builder เพื่อให้ Container สามารถสร้าง Prisma Client และเชื่อมต่อกับ SQLite 
และ Volume ป้องกันข้อมูลหายเวลา Container รีสตาร์ท


My Adjustment: เพิ่มคำสั่ง npx prisma generate เข้าไปในขั้นตอน builder ด้วย เพื่อให้ Prisma Client ถูกสร้างขึ้นมาใน Docker Container ไม่อย่างนั้นระบบจะเชื่อมต่อฐานข้อมูล SQLite ไม่ได้

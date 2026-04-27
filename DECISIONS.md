# Architecture Decisions

## Decision 1: Chose SQLite with Prisma ORM over PostgreSQL

### Context
โจทย์กำหนดให้การตั้งค่าและรันระบบทั้งหมดต้องจบใน 1 คำสั่ง (`docker compose up`)และเป็นโปรเจกต์ขนาดเล็ก ที่มีเวลาจำกัดในการพัฒนา 

### Alternatives Considered
พิจารณาใช้ PostgreSQL ซึ่งเป็นฐานข้อมูลระดับ Production ที่มีความสามารถสูงกว่า (สามารถใช้ร่วมกับ `pgvector` เพื่อทำ Vector Search ในตัวได้เลย) 
และ MongoDB สำหรับเก็บข้อมูลแบบ Document 

### Why SQLite + Prisma ORM
ตัดสินใจเลือก SQLite เพราะเป็นฐานข้อมูลแบบ File-based ที่ไม่ต้องมีการตั้งค่า Container แยกต่างหาก หรือจัดการ Network ภายใน Docker ทำให้ไฟล์ `docker-compose.yml` 
จัดการง่าย ลดความเสี่ยงที่แอปพลิเคชันจะรันไม่ขึ้นในเครื่องของผู้ตรวจข้อสอบ 
การใช้ร่วมกับ Prisma ORM ช่วยให้ได้ Type Safety และทำ Schema Migration ได้สะดวกรวดเร็ว

### Trade-offs
การเลือก SQLite ทำให้เรายอมแลกกับการรองรับ Concurrent connections จำนวนมากๆ และไม่สามารถ Scale เพื่อใช้งานจริงระดับ Production ได้ 
นอกจากนี้ยังทำให้เราไม่สามารถใช้ Vector Database ในตัว (อย่าง `pgvector`) ได้ จึงต้องไปใช้ ChromaDB แยกต่างหาก แต่สำหรับ POC นี้ ความรวดเร็วและประสบการณ์ในการ Setup ของผู้ตรวจมีความสำคัญมากกว่า

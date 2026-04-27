# Knowledge Assistant

## Tech Stack
- Frontend & Backend: Next.js 14 (App Router)
- Database: SQLite with Prisma ORM
- Vector DB: ChromaDB 
- LLM: Vercel AI SDK with OpenAI API

## Setup & Run
1. สร้างไฟล์ `.env` ตามตัวอย่างใน `.env.example`
2. รันคำสั่ง `docker compose up --build` 
3. เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

## Features Done
- [] Login + Protected Routes 
- [] File Upload 
- [] Chat with AI and RAG 
- [] Token Usage Counter 
- [] Streaming response 

## Architecture
โปรเจกต์นี้แบ่งเลเยอร์ชัดเจน (Route/Service/Repository)  
เพื่อแยก Business Logic 
ออกจาก UI ทำให้โค้ด Clean และ Test ได้ง่าย

## Known Issues
- อนาคตจัดการเรื่อง PDF ที่มีขนาดใหญ่มากๆ
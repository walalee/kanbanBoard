# Kanban Board Test Project
This project is part of a pre-interview test.  
Due to time constraints and lack of prior experience with some tools, the project is **not fully completed** and currently has some errors (server not running yet).  
However, I am submitting my progress, project structure, and implementation plan to show my thought process and how I approached the task.

---

## 🚀 Tech Stack (Planned)
- **Frontend:** React + TypeScript + Tailwind CSS  
- **Backend:** Node.js + Express + TypeScript  
- **Database:** PostgreSQL (planned, but not fully set up yet)  
- **Authentication:** JWT (planned)  
- **Extra:** Docker & docker-compose (planned, not implemented due to time)  

---

## ✅ Features Implemented / In Progress
- [ ] Project initialized (frontend + backend structure created)  
- [ ] Register & Login (in progress, currently facing errors when running backend)  
- [ ] Board CRUD (not implemented)  
- [ ] Column CRUD (not implemented)  
- [ ] Task CRUD + Drag & Drop (not implemented)  
- [ ] Invite members (not implemented)  
- [ ] Notifications (optional, not implemented)  

---

## ⚠️ Current Issues
- Backend server does not run correctly (error when starting Express + DB connection).  
- Authentication logic partially written but not fully tested.  
- Database schema created, but migrations/setup not yet integrated.  

---

## 📌 What I Planned to Do Next (If I Had More Time)
1. Fix backend error (Express server + DB connection).  
2. Complete Register & Login with bcrypt + JWT.  
3. Implement Board/Column/Task CRUD.  
4. Add Drag & Drop using `react-beautiful-dnd`.  
5. Add invite & member management.  
6. Containerize the app with Docker.  

---

## 📝 Notes
Although the project is incomplete, I focused on:
- Setting up a **clear structure** for frontend/backend/database.  
- Writing partial code for authentication.  
- Researching how to implement drag-and-drop in React.  

I am confident that with more time, I would be able to complete the missing features and fix the current errors.  

## 🚨 Known Issues
- **Frontend server cannot run yet**  
  When trying to start the frontend with:

```bash
npm run dev

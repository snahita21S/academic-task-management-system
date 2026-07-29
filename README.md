# Academic Task Management & Workflow System (Phase 1)

This repository contains the **Phase 1 deliverables** for the Academic Task Management & Workflow System project.  
Developed using the MERN stack (MongoDB, Express.js, React, Node.js), the system provides secure authentication, project creation and management, task tracking, and a student dashboard.  

Phase 1 focuses on:
- Authentication (register/login with JWT)
- Project creation and management
- Task management linked to projects
- Student dashboard integration
- API and database schema documentation

---

## 🚀 Features

- **Authentication Module**
  - Secure user registration and login
  - Password hashing with bcrypt
  - JWT‑based authentication for protected routes

- **Project Management**
  - Create and manage projects with name and description
  - View all projects linked to the logged‑in user

- **Task Management**
  - Add tasks associated with specific projects
  - View tasks per project
  - Success/error messages for task operations

- **Student Dashboard**
  - Centralized interface for projects and tasks
  - Integrated forms for adding projects and tasks
  - Real‑time updates without page reloads

---

## 🛠️ Tech Stack

- **Frontend:** React, Axios, Bootstrap  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT, bcrypt  

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login existing user  

### Projects
- `POST /api/projects` → Add new project  
- `GET /api/projects` → Get all projects for logged‑in user  

### Tasks
- `POST /api/tasks` → Add new task (requires `projectId`)  
- `GET /api/tasks?projectId=<id>` → Get tasks for a project  

---

## 🗄️ Database Schema

### User
```js
{
  name: String,
  email: String,
  password: String (hashed)
}

### Project
```js
{
name: String,
description: String,
userId: ObjectId (ref: user)
}

### Task
```js
{
projectId : ObjectId (ref: Project),
title: String,
description: String,
dueDate: Date
}

---

# Academic Task Management System – Phase 2

## 📌 Overview
This project is a full‑stack MERN application designed to manage academic tasks.  
Phase‑2 introduces **real‑time notifications** for task operations.

## 🚀 Features Implemented in Phase 2
- ✅ Notification panel in frontend (React).  
- ✅ Real‑time notifications using **Socket.IO**.  
- ✅ Notifications triggered on:
  - Task creation
  - Task update
  - Task deletion
- ✅ Empty state handling: shows *“No notifications yet”* when none exist.  

## 🛠️ Tech Stack
- **Frontend**: React, Axios, Socket.IO client  
- **Backend**: Node.js, Express, MongoDB, Socket.IO  
- **Database**: MongoDB Atlas  

## ⚙️ How to Run Locally
1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/academic-task-management-system.git

## 📷 Demo Screenshots

### 1. Empty Notification Panel
Shows the default state when no notifications exist.


---

## 📌 Why Add Them
- **User schema** → shows how accounts are stored.  
- **Project schema** → shows how projects are linked to users.  
- **Task schema** → shows how tasks are linked to projects.  

Together, they clearly document the backend design and make your README complete. Professors/reviewers expect to see this because it matches your API endpoints.

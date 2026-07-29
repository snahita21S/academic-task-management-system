import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/Task.js";
import projectRoutes from "./routes/project.js";

// PHASE 2 routes
import workspaceRoutes from "./routes/workspaces.js";
import analyticsRoutes from "./routes/analytics.js";
import notificationRoutes from "./routes/notifications.js";

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app); // wrap express in http server

// ✅ Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // ✅ Listen for new tasks
  socket.on("newTask", ({ projectId, task }) => {
    console.log("🆕 New task:", task.title);
    socket.broadcast.emit("newTask", { projectId, task });
  });

  // ✅ Listen for task updates (status changes)
  socket.on("taskUpdate", ({ projectId, task }) => {
    console.log("♻️ Task updated:", task.title, "→", task.status);
    socket.broadcast.emit("taskUpdate", { projectId, task });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

app.use(express.json());
app.use(cors());

// ✅ Attach io to requests so routes can use req.io
app.use((req, res, next) => {
  req.io = io;
  next();
});

// PHASE 1 routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

// PHASE 2 routes
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend running...");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

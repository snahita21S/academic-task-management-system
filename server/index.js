import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth.js";
import workspaceRoutes from "./routes/workspaces.js";
import analyticsRoutes from "./routes/analytics.js";
import notificationRoutes from "./routes/notifications.js";
import taskRoutes from "./routes/Task.js";   // ✅ match file name exactly (capital T)
import errorHandler from "./middleware/errorHandler.js";
import projectRoutes from "./routes/project.js"; // ✅ added project routes
dotenv.config();

const app = express();
app.use(errorHandler);

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/projects", projectRoutes); // ✅ added project routes

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/tasks", taskRoutes);   // ✅ tasks route mounted

// Test route
app.get("/", (req, res) => {
  res.send("Backend running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

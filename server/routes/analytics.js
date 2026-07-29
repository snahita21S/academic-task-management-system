import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Get task analytics for logged-in user
router.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const completed = await Task.countDocuments({ status: "Completed", userId: req.user.id });
    const pending = await Task.countDocuments({ status: "Pending", userId: req.user.id });
    const inProgress = await Task.countDocuments({ status: "In Progress", userId: req.user.id });

    res.json({ completed, pending, inProgress });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching analytics" });
  }
});

export default router;

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth"); // if you use JWT

// Add Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { projectId, title } = req.body;
    const task = new Task({ projectId, title });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get Tasks by Project
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.query;
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

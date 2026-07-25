const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const auth = require("../middleware/Auth");

// CREATE Task
router.post("/", auth, async (req, res) => {
  try {
    const { title, projectId } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ msg: "Title and projectId are required" });
    }

    const newTask = new Task({
      title,
      projectId,
      user: req.user, // from JWT middleware
    });

    await newTask.save();
    res.json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET Tasks by Project
router.get("/:projectId", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId, user: req.user });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE Task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.user.toString() !== req.user) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await task.remove();
    res.json({ msg: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

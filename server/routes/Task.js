import express from "express";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/auth.js";
import validateTask from "../middleware/validateTask.js";

const router = express.Router();

// Create task
router.post("/", authMiddleware, validateTask, async (req, res, next) => {
  try {
    const { title, status, projectId } = req.body;
    const task = new Task({ title, status, userId: req.user.id, projectId });
    await task.save();

    // link task to project
    await Project.findByIdAndUpdate(projectId, { $push: { tasks: task._id } });

    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Update task
router.put("/:id", authMiddleware, validateTask, async (req, res, next) => {
  try {
    const { title, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, status },
      { new: true }
    );
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Get tasks for a project
router.get("/project/:projectId", authMiddleware, async (req, res, next) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId, userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// Delete task
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

    // remove task reference from project
    await Project.findByIdAndUpdate(task.projectId, { $pull: { tasks: task._id } });

    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;

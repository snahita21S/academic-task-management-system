import express from "express";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Create project
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const project = new Project({ name, userId: req.user.id });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Get all projects for logged-in user (with tasks populated)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id }).populate("tasks");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Delete project
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;

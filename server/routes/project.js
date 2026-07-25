const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const auth = require("../middleware/Auth");

// CREATE Project
router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Project name is required" });
    }

    const newProject = new Project({
      name,
      user: req.user, // attach logged-in user
    });

    await newProject.save();
    res.json(newProject);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET Projects for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user });
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE Project
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: "Project not found" });
    if (project.user.toString() !== req.user) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await project.remove();
    res.json({ msg: "Project deleted" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

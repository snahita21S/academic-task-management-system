import express from "express";
import Workspace from "../models/Workspace.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Create a new workspace
router.post("/", authMiddleware, async (req, res) => {
  try {
    const workspace = new Workspace({
      name: req.body.name,
      members: [req.user.id]
    });
    await workspace.save();
    res.json(workspace);
  } catch (err) {
    res.status(500).json({ msg: "Error creating workspace" });
  }
});

// Get all workspaces for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const workspaces = await Workspace.find({ members: req.user.id });
    res.json(workspaces);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching workspaces" });
  }
});

// Add user to workspace
router.post("/:id/addUser", authMiddleware, async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) return res.status(404).json({ msg: "Workspace not found" });

    workspace.members.push(req.body.userId);
    await workspace.save();
    res.json(workspace);
  } catch (err) {
    res.status(500).json({ msg: "Error adding user to workspace" });
  }
});

export default router;

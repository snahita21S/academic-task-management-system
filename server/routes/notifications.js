import express from "express";
import Notification from "../models/Notification.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Create a new notification
router.post("/", authMiddleware, async (req, res) => {
  try {
    const notification = new Notification({
      userId: req.user.id,
      message: req.body.message,
      type: req.body.type
    });
    await notification.save();
    res.json(notification);
  } catch (err) {
    res.status(500).json({ msg: "Error creating notification" });
  }
});

// Get notifications for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching notifications" });
  }
});

export default router;

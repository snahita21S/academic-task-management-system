import express from "express";
import Notification from "../models/Notification.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ✅ Create a new notification
router.post("/", authMiddleware, async (req, res) => {
  try {
    const notification = new Notification({
      userId: req.user.id,
      message: req.body.message,
      type: req.body.type || "Task Update",
      read: false
    });
    await notification.save();

    // 🔔 Emit real-time notification
    req.io.emit("newNotification", {
      userId: req.user.id,
      message: notification.message,
      type: notification.type
    });

    res.json(notification);
  } catch (err) {
    res.status(500).json({ msg: "Error creating notification" });
  }
});

// ✅ Get notifications for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching notifications" });
  }
});

// ✅ Mark notification as read
router.put("/:id/read", authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    res.status(500).json({ msg: "Error marking notification as read" });
  }
});

export default router;

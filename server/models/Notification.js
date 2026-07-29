import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["Reminder", "Alert"],
    default: "Reminder"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Notification", notificationSchema);

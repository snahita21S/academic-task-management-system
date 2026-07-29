import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true }
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
export default mongoose.models.Task || mongoose.model("Task", taskSchema);

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;

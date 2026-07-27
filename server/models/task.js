const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);

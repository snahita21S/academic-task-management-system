import React, { useState } from "react";
import api from "../api.js";

function TaskForm({ projectId, onTaskAdded }) {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!taskName.trim()) return;

    try {
      const res = await api.post("/tasks", {
        title: taskName,
        status: "Pending", // ✅ default status
        projectId: projectId,
      });

      onTaskAdded(res.data);
      setTaskName("");
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
      alert("Could not add task. Check backend.");
    }
  };

  return (
    <form onSubmit={handleAddTask} style={{ marginTop: "10px" }}>
      <input
        type="text"
        placeholder="New task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginRight: "10px"
        }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#4CAF50", // soft green
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;

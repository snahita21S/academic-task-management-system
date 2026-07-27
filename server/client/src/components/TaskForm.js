import React, { useState } from "react";
import axios from "axios";

function TaskForm({ projectId, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        { projectId, title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (onTaskAdded) {
        onTaskAdded(res.data);
      }

      // Reset form + show success message
      setTitle("");
      setError("");
      setSuccess("Task added successfully!");

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to add task");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h4>Add Task</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        type="text"
        placeholder="Task Title"
        className="form-control mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <button type="submit" className="btn btn-primary w-100">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;

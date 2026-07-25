import React, { useState } from "react";
import axios from "axios";

function TaskForm({ token, projectId, onTaskCreated }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle(""); // clear input after success
      onTaskCreated(); // trigger refresh in Dashboard
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task. Try again.");
    }
  };

  return (
    <div className="mb-3">
      <h4>Create Task</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;

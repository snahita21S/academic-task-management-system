import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskList({ projectId, newTask }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/tasks?projectId=${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTasks(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching tasks:", err.response?.data || err.message);
        setError("Failed to load tasks. Please try again.");
      }
    };

    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  // Whenever a new task is passed in, add it instantly
  useEffect(() => {
    if (newTask) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  }, [newTask]);

  return (
    <div className="mt-4">
      <h4>Tasks</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {tasks.length === 0 ? (
        <p>No tasks yet. Add one!</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task._id} className="list-group-item">
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;

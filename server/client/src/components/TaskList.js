import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskList({ token, projectId, refresh }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/tasks/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    if (projectId) {
      fetchTasks();
    }
  }, [projectId, refresh, token]); // re-fetch when projectId or refresh changes

  return (
    <div>
      <h4>Tasks</h4>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

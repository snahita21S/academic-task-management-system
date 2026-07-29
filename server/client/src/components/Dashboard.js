import React, { useEffect, useState } from "react";
import api from "../api.js";
import TaskForm from "./TaskForm.js";
import { io } from "socket.io-client";
import AnalyticsDashboard from "./AnalyticsDashboard.js"; // ✅ Import analytics
import NotificationPanel from "./NotificationPanel.js"; // ✅ Import notifications

const socket = io("http://localhost:5000"); // backend URL

function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");

  // Fetch projects when dashboard loads
  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // ✅ Listen for real-time task updates (new tasks + status changes)
  useEffect(() => {
    socket.on("taskUpdate", ({ projectId, task }) => {
      setProjects((prev) =>
        prev.map((p) =>
          p._id === projectId
            ? {
                ...p,
                tasks: p.tasks.map((t) =>
                  t._id === task._id ? task : t
                )
              }
            : p
        )
      );
    });

    socket.on("newTask", ({ projectId, task }) => {
      setProjects((prev) =>
        prev.map((p) =>
          p._id === projectId ? { ...p, tasks: [...(p.tasks || []), task] } : p
        )
      );
    });

    return () => {
      socket.off("taskUpdate");
      socket.off("newTask");
    };
  }, []);

  // Add a new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.trim()) return;

    try {
      const res = await api.post("/projects", { name: newProject });
      setProjects([...projects, res.data]);
      setNewProject("");
    } catch (err) {
      console.error("Error adding project:", err);
      alert("Could not add project. Check backend.");
    }
  };

  // Update project list when a new task is added
  const handleTaskAdded = (projectId, newTask) => {
    setProjects((prev) =>
      prev.map((p) =>
        p._id === projectId ? { ...p, tasks: [...(p.tasks || []), newTask] } : p
      )
    );

    // ✅ Emit event to backend so other users see it
    socket.emit("newTask", { projectId, task: newTask });
  };

  // ✅ Change task status + broadcast
  const handleStatusChange = (projectId, taskId, newStatus) => {
    api
      .put(`/tasks/${taskId}`, { status: newStatus })
      .then((res) => {
        setProjects((prev) =>
          prev.map((proj) =>
            proj._id === projectId
              ? {
                  ...proj,
                  tasks: proj.tasks.map((task) =>
                    task._id === taskId ? res.data : task
                  )
                }
              : proj
          )
        );

        // ✅ Emit event so other users see status change
        socket.emit("taskUpdate", { projectId, task: res.data });
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "linear-gradient(to right, #fdfbfb, #ebedee)",
        color: "#333",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h2>Welcome, Snahita Srivastava </h2>

      <h3>ATMS🗃️</h3>
      {projects.length > 0 ? (
        projects.map((p) => (
          <div
            key={p._id}
            style={{
              marginBottom: "20px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <strong>{p.name}</strong>
            <ul>
              {p.tasks && p.tasks.length > 0 ? (
                p.tasks.map((t) => (
                  <li key={t._id} style={{ marginBottom: "8px" }}>
                    {t.title}{" "}
                    <span
                      style={{
                        color:
                          t.status === "Completed"
                            ? "green"
                            : t.status === "In Progress"
                            ? "blue"
                            : "orange",
                        fontWeight: "bold"
                      }}
                    >
                      {t.status}
                    </span>
                    {/* ✅ Dropdown to change status */}
                    <select
                      value={t.status}
                      onChange={(e) =>
                        handleStatusChange(p._id, t._id, e.target.value)
                      }
                      style={{
                        marginLeft: "10px",
                        padding: "4px",
                        borderRadius: "4px"
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </li>
                ))
              ) : (
                <li>No tasks yet</li>
              )}
            </ul>
            <TaskForm
              projectId={p._id}
              onTaskAdded={(task) => handleTaskAdded(p._id, task)}
            />
          </div>
        ))
      ) : (
        <p>No projects yet. Add one below!</p>
      )}

      {/* Add project form */}
      <form onSubmit={handleAddProject} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="New project name"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
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
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Add Project
        </button>
      </form>

      {/* ✅ Analytics Dashboard */}
      <AnalyticsDashboard projects={projects} />
      {/* ✅ Notification Panel */}
      <NotificationPanel />
    </div>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import api from "../api.js";
import TaskForm from "./TaskForm.js";

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
  };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "linear-gradient(to right, #fdfbfb, #ebedee)", // soft minimal gradient
        color: "#333",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h2>Welcome, Snahita Srivastava </h2>

      <h3>Your Projects</h3>
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
                p.tasks.map((t) => <li key={t._id}>{t.title}</li>)
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
    </div>
  );
}

export default Dashboard;

import React, { useState } from "react";
import ProjectForm from "./ProjectForm.js";
import ProjectList from "./ProjectList.js";
import TaskForm from "./TaskForm.js";
import TaskList from "./TaskList.js";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectAdded = (newProject) => {
    // Add new project to state immediately
    setProjects([...projects, newProject]);
    setSelectedProject(newProject._id); // auto-select the new project
  };

  const handleTaskAdded = (newTask) => {
    // Optional: refresh tasks or handle task state here
    console.log("Task added:", newTask);
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      {/* Add new project */}
      <ProjectForm onProjectAdded={handleProjectAdded} />

      {/* Show all projects */}
      {projects.length === 0 ? (
        <p>No projects found. Add one!</p>
      ) : (
        <ProjectList
          refresh={false}
          onSelectProject={setSelectedProject}
        />
      )}

      {/* Show tasks only when a project is selected */}
      {selectedProject && (
        <>
          <TaskForm projectId={selectedProject} onTaskAdded={handleTaskAdded} />
          <TaskList projectId={selectedProject} />
        </>
      )}
    </div>
  );
}

export default Dashboard;

import React, { useState } from "react";
import ProjectList from "./ProjectList.js";
import ProjectForm from "./ProjectForm.js";
import TaskList from "./TaskList.js";
import TaskForm from "./TaskForm.js";

function Dashboard({ token }) {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [refreshTasks, setRefreshTasks] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar for Projects */}
        <div className="col-lg-3 bg-light p-3">
          <ProjectForm onProjectCreated={() => setRefreshProjects(!refreshProjects)} />
          <ProjectList 
            refresh={refreshProjects}
            onSelectProject={(id) => setSelectedProjectId(id)} 
          />
        </div>

        {/* Main area for tasks */}
        <div className="col-lg-9 p-3">
          {selectedProjectId ? (
            <>
              <TaskForm
                token={token}
                projectId={selectedProjectId}
                onTaskCreated={() => setRefreshTasks(!refreshTasks)}
              />
              <TaskList
                token={token}
                projectId={selectedProjectId}
                refresh={refreshTasks}
              />
            </>
          ) : (
            <p>Select a project to view tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

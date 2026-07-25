import React, { useEffect, useState } from "react";
import axios from "axios";

function ProjectList({ refresh, onSelectProject }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, [refresh]); // re-fetch whenever refresh changes

  return (
    <div>
      <h4>Projects</h4>
      <ul className="list-group">
        {projects.map((project) => (
          <li
            key={project._id}
            className="list-group-item list-group-item-action"
            onClick={() => onSelectProject(project._id)}
            style={{ cursor: "pointer" }}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;

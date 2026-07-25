import React, { useState } from "react";
import axios from "axios";

function ProjectForm({ onProjectCreated }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token"); // get JWT from localStorage
    await axios.post(
      "http://localhost:5000/api/projects",
      { name },
      {
        headers: { Authorization: `Bearer ${token}` }, // attach token
      }
    );
    alert("Project created successfully!"); // optional success message
    setName(""); // clear input after success
    onProjectCreated(); // trigger refresh in Dashboard
  } catch (err) {
    console.error("Error creating project:", err.response?.data || err.message);
    alert("Failed to create project. Try again.");
  }
};


  return (
    <div className="mb-3">
      <h4>Create Project</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Add Project
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;

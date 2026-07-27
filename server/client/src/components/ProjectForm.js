import React, { useState } from "react";
import axios from "axios";

function ProjectForm({ onProjectAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/projects",
        { name, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Notify Dashboard with new project
      if (onProjectAdded) {
        onProjectAdded(res.data);
      }

      // Reset form + show success message
      setName("");
      setDescription("");
      setError("");
      setSuccess("Project added successfully!");

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error adding project:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to add project");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h4>Add Project</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        type="text"
        placeholder="Project Name"
        className="form-control mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        className="form-control mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit" className="btn btn-success w-100">
        Add Project
      </button>
    </form>
  );
}

export default ProjectForm;

import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

function AnalyticsDashboard({ projects }) {
  // Count tasks by status
  const completed = projects.reduce(
    (acc, p) => acc + (p.tasks?.filter((t) => t.status === "Completed").length || 0),
    0
  );
  const inProgress = projects.reduce(
    (acc, p) => acc + (p.tasks?.filter((t) => t.status === "In Progress").length || 0),
    0
  );
  const pending = projects.reduce(
    (acc, p) => acc + (p.tasks?.filter((t) => t.status === "Pending").length || 0),
    0
  );

  const totalTasks = completed + inProgress + pending;
  const completionRate = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

  const barData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completed, inProgress, pending],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"]
      }
    ]
  };

  const pieData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [completed, inProgress, pending],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"]
      }
    ]
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>📊 Productivity Analytics</h3>

      {/* ✅ Quick summary counters */}
      <div style={{ marginBottom: "15px", fontSize: "16px" }}>
        <strong style={{ color: "green" }}>✔ Completed: {completed}</strong>{" | "}
        <strong style={{ color: "blue" }}>🔵 In Progress: {inProgress}</strong>{" | "}
        <strong style={{ color: "orange" }}>⏳ Pending: {pending}</strong>
      </div>

      {/* ✅ Overall progress bar */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "5px" }}>
          <strong>Overall Completion: {completionRate}%</strong>
        </div>
        <div
          style={{
            height: "20px",
            width: "100%",
            backgroundColor: "#ddd",
            borderRadius: "10px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${completionRate}%`,
              backgroundColor: "#4CAF50",
              transition: "width 0.5s ease"
            }}
          ></div>
        </div>
      </div>

      {/* ✅ Per-project breakdown */}
      <div style={{ marginBottom: "30px" }}>
        <h4>📁 Project-wise Completion</h4>
        {projects.length > 0 ? (
          projects.map((p) => {
            const total = p.tasks?.length || 0;
            const done = p.tasks?.filter((t) => t.status === "Completed").length || 0;
            const rate = total > 0 ? Math.round((done / total) * 100) : 0;

            return (
              <div key={p._id} style={{ marginBottom: "10px" }}>
                <strong>{p.name}</strong>
                <div
                  style={{
                    height: "16px",
                    width: "100%",
                    backgroundColor: "#eee",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginTop: "4px"
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${rate}%`,
                      backgroundColor: "#4CAF50",
                      transition: "width 0.5s ease"
                    }}
                  ></div>
                </div>
                <small style={{ color: "#555" }}>{rate}% completed</small>
              </div>
            );
          })
        ) : (
          <p>No projects yet.</p>
        )}
      </div>

      {/* Charts */}
      <div style={{ width: "400px", marginBottom: "20px" }}>
        <Bar data={barData} />
      </div>
      <div style={{ width: "300px" }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default AnalyticsDashboard;

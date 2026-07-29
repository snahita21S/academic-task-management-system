import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import ProtectedRoute from "./components/ProtectedRoute.js";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={<Login setToken={setToken} setUser={setUser} />}
        />

        {/* Dashboard route (protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute token={token}>
              <Dashboard token={token} user={user} />
            </ProtectedRoute>
          }
        />

        {/* Default route: redirect "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

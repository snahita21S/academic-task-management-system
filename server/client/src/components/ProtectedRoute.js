import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ token, children }) {
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component
  return children;
}

export default ProtectedRoute;

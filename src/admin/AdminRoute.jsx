// src/admin/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Simple protected route wrapper.
 * Checks localStorage astro_admin key (set by AdminLogin).
 * Replace with better auth checks / token verification when backing with server.
 */
export default function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem("astro_admin") === "true";
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

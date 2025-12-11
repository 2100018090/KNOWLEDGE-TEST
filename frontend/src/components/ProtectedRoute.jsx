import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // ambil user dari localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/" replace />; // redirect jika belum login
  }

  return <>{children}</>;
}


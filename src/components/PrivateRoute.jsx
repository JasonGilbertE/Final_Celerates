import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, admin }) => {
  const role = localStorage.getItem("role"); // Ambil role dari localStorage

  // Jika role tidak sesuai, arahkan ke halaman login
  if (admin && role !== "admin") {
    return <Navigate to="/admin/login" />;
  }

  if (!admin && role !== "user") {
    return <Navigate to="/login" />;
  }

  // Jika sesuai, render children
  return children;
};

export default PrivateRoute;

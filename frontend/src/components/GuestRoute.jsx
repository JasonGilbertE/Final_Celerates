import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const role = localStorage.getItem("role"); // Cek apakah ada role di localStorage

  // Jika ada role (pengguna sudah login), arahkan ke halaman yang sesuai
  if (role === "user") {
    return <Navigate to="/home" replace />; // Ganti "/home" dengan halaman yang sesuai
  } else if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />; // Ganti "/admin/dashboard" dengan halaman yang sesuai
  }

  // Jika belum login (guest), render anak komponennya (login/register)
  return children;
};

export default GuestRoute;

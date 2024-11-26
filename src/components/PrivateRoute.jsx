import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, admin }) => {
  const role = localStorage.getItem("role"); 

  if (admin && role !== "admin") {
    return <Navigate to="/admin/login" />;
  }

  if (!admin && role !== "user") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

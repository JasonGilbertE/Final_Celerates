import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rating from "./pages/Rating";
import ForgotPassword from "./pages/ForgotPassword";
import HomeGuest from "./pages/HomeGuest";
import VerificationCode from "./pages/VerificationCode";
import NewPassword from "./pages/NewPassword";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import AdminDashboard from "./Admin/pages/AdminDashboard"; // Import Dashboard Admin

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Halaman Guest / Landing Page */}
        <Route path="/" element={<HomeGuest />} />

        {/* Halaman Login (User) */}
        <Route path="/login" element={<Login />} />

        {/* Halaman Register */}
        <Route path="/register" element={<Register />} />

        {/* Halaman Forgot Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Halaman Verification Code */}
        <Route path="/verification-code" element={<VerificationCode />} />

        {/* Halaman New Password */}
        <Route path="/new-password" element={<NewPassword />} />

        {/* Halaman Home (User) */}
        <Route
          path="/home"
          element={
            <PrivateRoute admin={false}>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Halaman Rating */}
        <Route
          path="/all-reviews"
          element={
            <PrivateRoute admin={false}>
              <Rating />
            </PrivateRoute>
          }
        />

        {/* Halaman Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute admin={true}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

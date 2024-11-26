import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import halaman utama
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rating from "./pages/Rating";
import ForgotPassword from "./pages/ForgotPassword";
import HomeGuest from "./pages/HomeGuest";
import VerificationCode from "./pages/VerificationCode";
import NewPassword from "./pages/NewPassword";

// Import admin pages
import AdminDashboard from "./Admin/pages/AdminDashboard";
import RiwayatPesanan from "./Admin/pages/RiwayatPesanan";
import DoneProduk from "./Admin/pages/DoneProduk";
import CancelProduk from "./Admin/pages/CancelProduk";
import ReturnProduk from "./Admin/pages/ReturnProduk";
import ProsesProduk from "./Admin/pages/ProsesProduk";  

import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Halaman Guest / Landing Page */}
        <Route path="/" element={<HomeGuest />} />

        {/* Halaman Login */}
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
            </PrivateRoute> }/>

        {/* Halaman Rating */}
        <Route
          path="/all-reviews"
          element={
            <PrivateRoute admin={false}>
              <Rating />
            </PrivateRoute> }/>

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute admin={true}>
              <main>
                <AdminDashboard />
              </main>
            </PrivateRoute> }/>

        {/* Halaman Riwayat Pesanan */}
        <Route
          path="/admin/riwayat-pesanan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <RiwayatPesanan />
              </main>
            </PrivateRoute> }/>

        {/* Halaman Pesanan Selesai */}
        <Route
          path="/admin/done-pesanan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <DoneProduk />
              </main>
            </PrivateRoute> }/>

        {/* Halaman Pembatalan Produk */}
        <Route
          path="/admin/batal-pesanan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <CancelProduk />
              </main>
            </PrivateRoute> }/>

        {/* Halaman Pengembalian Produk */}
        <Route
          path="/admin/return-pesanan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <ReturnProduk />
              </main>
            </PrivateRoute> }/>

        {/* Halaman Pesanan dalam Proses */}
        <Route
          path="/admin/proses-pesanan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <ProsesProduk />
              </main>
            </PrivateRoute> }/>
      </Routes>
    </Router>
  );
};

export default App;

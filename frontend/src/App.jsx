// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rating from "./pages/Rating";
import ForgotPassword from "./pages/ForgotPassword";
import HomeGuest from "./pages/HomeGuest";
import VerificationCode from "./pages/VerificationCode";
import NewPassword from "./pages/NewPassword";
import Profile from "./pages/Profile";
import Loyalitas from "./pages/loyalitas";
import Keranjang from "./pages/Keranjang";
import Pengiriman from "./pages/Pengiriman";
import Pembayaran from "./pages/Pembayaran";
import DaftarTransaksi from "./pages/DaftarTransaksi";
import Terpopular from "./pages/Terpopular";
import SearchPages from "./pages/SearchPages";
import Kerajinan from "./pages/Kerajinan";
import Makanan from "./pages/Makanan";
import Pakaian from "./pages/Pakaian";
import Terbaru from "./pages/Terbaru";
import ProductDetail from "./pages/ProductDetail";
import DetailTransaksi from "./Admin/pages/DetailTransaksi";

import AdminDashboard from "./Admin/pages/AdminDashboard";
import RiwayatPesanan from "./Admin/pages/RiwayatPesanan";
import DoneProduk from "./Admin/pages/DoneProduk";
import CancelProduk from "./Admin/pages/CancelProduk";
import ReturnProduk from "./Admin/pages/ReturnProduk";
import ProsesProduk from "./Admin/pages/ProsesProduk";
import UlasanAdmin from "./Admin/pages/UlasanAdmin";
import TambahProduk from "./Admin/pages/TambahProduk";
import EditProduk from "./Admin/pages/EditProduk";
import AdminFlashSale from "./Admin/pages/AdminFlashSale";
import SemuaProduk from "./Admin/pages/SemuaProduk";

import AdminPakaian from "./Admin/pages/AdminPakaian";
import AdminMakanan from "./Admin/pages/AdminMakanan";
import AdminKerajinan from "./Admin/pages/AdminKerajinan";
import DetailPembeli from "./Admin/pages/DetailPembeli";

import AKerajinanDetail from "./Admin/pages/AKerajinanDetail";
import ADetailPakaian from "./Admin/pages/APakaianDetail";
import AProductDetail from "./Admin/pages/AProductDetail";

import PrivateRoute from "./components/PrivateRoute";
import GuestRoute from "./components/GuestRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeGuest />} />
        <Route path="/login" element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        } />
        <Route path="/register" element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        } />
        
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verification-code" element={<VerificationCode />} />
        <Route path="/new-password" element={<NewPassword />} />

        <Route path="/profile" element={
          <PrivateRoute admin={false}>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/loyalitas" element={<Loyalitas />} />
        <Route path="/keranjang" element={
          <PrivateRoute admin={false}>
            <Keranjang />
          </PrivateRoute>
        } />
        <Route path="/pengiriman" element={
          <PrivateRoute admin={false}>
            <Pengiriman />
          </PrivateRoute>
        } />
        <Route path="/pembayaran" element={
          <PrivateRoute admin={false}>
            <Pembayaran />
          </PrivateRoute>
        } />
        <Route path="/daftar-transaksi" element={
          <PrivateRoute admin={false}>
            <DaftarTransaksi />
          </PrivateRoute>
        } />
        <Route path="/terpopular" element={<Terpopular />} />
        <Route path="/search" element={<SearchPages />} />
        <Route path="/kerajinan" element={<Kerajinan />} />
        <Route path="/makanan" element={<Makanan />} />
        <Route path="/pakaian" element={<Pakaian />} />
        <Route path="/terbaru" element={<Terbaru />} />
        <Route path="/productdetail/:id" element={
          <PrivateRoute admin={false}>
            <ProductDetail />
          </PrivateRoute>
        } />
        <Route path="/rating" element={<Rating />} />

        <Route
          path="/home"
          element={
            <PrivateRoute admin={false}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-reviews"
          element={
            <PrivateRoute admin={false}>
              <Rating />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute admin={true}>
              <main>
                <AdminDashboard />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/riwayat-pesanan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <RiwayatPesanan />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/detail-transaksi/:transactionId"
          element={
            <PrivateRoute admin={true}>
              <main>
                <DetailTransaksi />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/done-pesanan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <DoneProduk />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/batal-pesanan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <CancelProduk />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/return-pesanan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <ReturnProduk />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/proses-pesanan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <ProsesProduk />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/ulasan-pelanggan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <UlasanAdmin />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/tambah-produk"
          element={
            <PrivateRoute admin={true}>
              <main>
                <TambahProduk />
              </main>
            </PrivateRoute>
          }
        />
        {/* edit produk */}
        <Route
          path="/admin/edit-produk/:id"
          element={
            <PrivateRoute admin={true}>
              <main>
                <EditProduk />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/pakaian"
          element={
            <PrivateRoute admin={true}>
              <main>
                <AdminPakaian />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/makanan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <AdminMakanan />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/kerajinan"
          element={
            <PrivateRoute admin={true}>
              <main>
                <AdminKerajinan />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/semua-produk"
          element={
            <PrivateRoute admin={true}>
              <main>
                <SemuaProduk />
              </main>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/flash-sale"
          element={
            <PrivateRoute admin={true}>
              <main>
                <AdminFlashSale />
              </main>
            </PrivateRoute>
          }
        />
        <Route path="/admin/kerajinan/:id" element={
          <PrivateRoute admin={true}>
            <AKerajinanDetail />
          </PrivateRoute>
        } />
        <Route path="/produk/:id" element={
          <PrivateRoute admin={true}>
            <AProductDetail />
          </PrivateRoute>
        } />
        <Route path="/produk/:id/edit" element={
          <PrivateRoute admin={true}>
            <EditProduk />
          </PrivateRoute>
        } />
        <Route
          path="/admin/pakaian/:id"
          element={
            <PrivateRoute admin={true}>
              <main>
                <ADetailPakaian />
              </main>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

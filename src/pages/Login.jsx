// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi programatik
import Footer from "../components/Footer";
import { Link } from 'react-router-dom'; // Pastikan Link diimpor untuk "Daftar"

const Login = () => {
  const [email, setEmail] = useState("");  // State untuk email
  const [password, setPassword] = useState(""); // State untuk password
  const navigate = useNavigate();  // Hook useNavigate

  const handleLogin = (event) => {
    event.preventDefault();

    // Cek email dan password (tambahkan logika autentikasi di sini)
    if (email === "user@example.com" && password === "password123") {
      // Login berhasil, arahkan ke halaman Home
      console.log("Login successful");
      navigate("/home"); // Arahkan ke halaman Home setelah login berhasil
    } else {
      alert("Invalid credentials"); // Menampilkan alert jika login gagal
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#C62E2E] text-white p-4">
        <div className="text-lg font-bold">
          <p>CENTRAL</p>
          <p className="ml-5 font-ribeye">JAVA</p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow flex justify-center items-center py-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="bg-red-100 p-10 rounded-lg w-[350px] text-center">
            <h2 className="text-xl font-semibold mb-4">Selamat Datang Kembali!</h2>
            <p className="mb-6"> Belum punya akun?{" "}
              <Link to="/register" className="font-bold italic text-red-600 hover:underline">Daftar</Link>
            </p>

            {/* Form login */}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Masukkan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border-red-600 border rounded-[15px] mb-4"
                required
              />
              <input
                type="password"
                placeholder="Masukkan sandi anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border-red-600 border rounded-[15px] mb-4"
                required
              />
              <a href="pwnew.html" className="block text-right text-sm text-black hover:underline"> Lupa Kata Sandi? </a>

              {/* Tombol Masuk */}
              <button
                type="submit" // Tombol submit untuk form login
                className="block text-center bg-[#C62E2E] text-white py-2 rounded font-bold hover:bg-red-700 mt-4 mx-auto" // mx-auto untuk meletakkan tombol di tengah
              >
                Masuk
              </button>
            </form>

            <div className="mt-6 text-sm">atau masuk dengan</div>
            <div className="flex items-center mt-6">
              <span className="flex-grow h-[1px] bg-black"></span>
              <a href="googlelogin.html" className="mx-4" aria-label="Login with Google">
                <img src="/assets/images/google-icon.png" alt="Google" className="w-8 h-8"/>
              </a>
              <span className="flex-grow h-[1px] bg-black"></span>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="text-center">
            <img src="/assets/images/fotologin.png" alt="Foto Login" className="w-[300px] mb-4"/>
            <h2 className="text-black mt-4 font-semibold">Masuk dan Mulai Belanja!</h2>
            <p className="text-gray-600">Kami menghadirkan beragam produk unggulan</p>
            <p className="text-gray-600">dari Jawa Tengah.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;

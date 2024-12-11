import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import Footer from "../components/Footer";
import axios from "axios";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Kata sandi tidak cocok. Silakan coba lagi.");
      return;
    }

    // cek email reset di localStorage
    if (!localStorage.getItem("email_reset")) {
      navigate("/forgot-password"); // Arahkan ke halaman lupa kata sandi jika tidak ada email_reset
    }

    const email = localStorage.getItem("email_reset");

    setIsLoading(true);
    setError(null);

    try {
      // Mengirim permintaan untuk reset password
      const response = await axios.patch("http://localhost:3000/api/users/reset-password", {
        otp: "12345", // Gantilah dengan OTP yang valid
        email: email,
        new_password: newPassword,
      });

      if (response.data.message === "Password updated") {
        alert("Kata Sandi Telah Diubah");
        navigate("/login");
      } else {
        setError("Gagal mengubah kata sandi. Coba lagi nanti.");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat mengubah kata sandi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#C62E2E] text-white p-4">
        <div className="text-lg font-bold">
          <p>CENTRAL</p>
          <p className="ml-3 font-ribeye">JAVA</p>
        </div>
      </header>

      <main className="flex-grow flex justify-center items-center py-10">
        <div className="bg-red-100 p-8 rounded-lg w-[600px] shadow-lg relative">
          <button
            onClick={() => navigate("/verification-code")}
            className="absolute top-4 left-4 text-[#C62E2E] hover:text-red-700"
          >
            <IoArrowBackSharp size={24} />
          </button>

          <h2 className="text-xl font-semibold mb-4">Masukkan Kata Sandi Baru</h2>
          <p className="text-gray-600 mb-6">
            Masukkan kata sandi baru Anda untuk mengatur ulang akun Anda.
          </p>
          <form onSubmit={handlePasswordChange}>
            <input
              type="password"
              placeholder="Masukkan kata sandi baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-red-600 rounded-[15px] mb-4"
              required
            />
            <input
              type="password"
              placeholder="Konfirmasi kata sandi baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-red-600 rounded-[15px] mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#C62E2E] text-white py-2 rounded font-bold hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? "Mengubah..." : "Ubah Kata Sandi"}
            </button>
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewPassword;

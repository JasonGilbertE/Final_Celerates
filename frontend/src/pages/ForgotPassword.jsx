import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Mengirim permintaan untuk cek email
      const response = await axios.post("http://localhost:3000/api/users/cek-email", { email });

      if (response.data.message === "Email valid") {
        alert(`Link untuk reset kata sandi telah dikirim ke ${email}.`);

        // cek jika ada email_reset di localStorage
        if (localStorage.getItem("email_reset")) {
          localStorage.removeItem("email_reset");
        }

        localStorage.setItem("email_reset", email);
        navigate("/verification-code"); // Arahkan ke halaman verifikasi kode
      } else {
        setError("Email tidak valid atau tidak terdaftar.");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat memeriksa email. Silakan coba lagi.");
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
        <div className="bg-red-100 p-8 rounded-lg w-[851px] shadow-lg relative">
          <div className="max-w-[600px] mx-auto">
            <button
              onClick={() => navigate("/login")}
              className="absolute top-4 left-4 text-[#C62E2E] hover:text-red-700"
            >
              <IoArrowBackSharp size={24} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Atur ulang kata sandi Anda</h2>
            <p className="text-black-600 mb-6">
              Masukkan email Anda untuk mengatur ulang kata sandi dan kembali berbelanja dengan mudah.
            </p>
            <form onSubmit={handleResetPassword}>
              <input
                type="email"
                placeholder="Masukkan alamat email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-red-600 rounded-[15px] mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#C62E2E] text-white py-2 rounded font-bold hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? "Mengirim..." : "Lanjut"}
              </button>
              {error && <p className="text-red-600 mt-4">{error}</p>}
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;

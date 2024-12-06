import React from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi"; 

const Register = () => {
  const navigate = useNavigate(); 

  const handleRegister = (event) => {
    event.preventDefault(); 
    alert("Akun berhasil dibuat!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <header className="bg-[#C62E2E] text-white p-4 flex flex-col md:flex-row md:items-left md:justify-between">
        <div className="text-lg font-bold text-center md:text-left">
          <p>CENTRAL</p>
          <p className="font-ribeye text-center">JAVA</p>
        </div>
      </header>

      <div className="flex flex-col md:flex-row justify-center mt-11 items-center flex-1 px-4 space-y-6 md:space-y-0">
        <div className="bg-red-100 p-8 rounded-lg shadow-lg w-full max-w-sm md:mr-12 relative">
          <button
            onClick={() => navigate("/login")} 
            className="absolute top-4 left-4 text-xl text-[#C62E2E]"
          >
            <HiArrowLeft />
          </button>
          
          <h2 className="text-black text-center text-lg mb-4 font-semibold">
            Buat Akun Barumu yuk!
          </h2>
          <input
            placeholder="Email/nomor ponsel"
            type="email"
            className="w-full p-2 mb-2 border border-red-600 rounded-[15px]"
          />
          <input
            placeholder="Masukkan kata sandi baru"
            type="password"
            className="w-full p-2 mb-2 border border-red-600 rounded-[15px]"
          />
          <input
            placeholder="Masukkan kata sandi"
            type="password"
            className="w-full p-2 mb-4 border border-red-600 rounded-[15px]"
          />

          <div className="flex justify-center">
            <button
              onClick={handleRegister}
              className="w-full bg-[#C62E2E] text-white py-2 rounded font-bold hover:bg-red-800"
            >
              Daftar
            </button>
          </div>

          <div className="text-center my-4">atau masuk dengan</div>
          <div className="flex items-center mt-4 justify-center">
            <span className="flex-grow h-[1px] bg-black" />
            <a href="googlelogin.html" className="mx-4" aria-label="Login with Google">
              <img src="/assets/images/google-icon.png" alt="Google" className="w-8 h-8" />
            </a>
            <span className="flex-grow h-[1px] bg-black" />
          </div>
        </div>

        <div className="text-center">
          <img
            src="/assets/images/fotologin.png"
            alt="Foto Login"
            className="w-[300px] mb-4 mx-auto"
          />
          <h2 className="text-black mt-4 font-semibold">Masuk dan Mulai Belanja!</h2>
          <p className="text-gray-600">Kami menghadirkan beragam produk unggulan</p>
          <p className="text-gray-600 mb-8">dari Jawa Tengah.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;

import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Header (Sama dengan Login) */}
      <header className="bg-[#C62E2E] text-white p-4">
        <div className="text-lg font-bold">
          <p>CENTRAL</p>
          <p className="ml-5 font-ribeye">JAVA</p>
        </div>
      </header>

      {/* Container */}
      <div className="flex justify-center items-center flex-1 px-4">
        {/* Form Container */}
        <div className="bg-red-100 p-8 rounded-lg shadow-lg mr-12 w-80">
          <h2 className="text-black text-center text-lg mb-4 font-semibold"> Buat Akun Barumu yuk! </h2>
          <input placeholder="Email/nomor ponsel" type="email" className="w-full p-2 mb-2 border border-red-600 rounded-[15px]"/>
          <input placeholder="Masukkan kata sandi baru" type="password" className="w-full p-2 mb-2 border border-red-600 rounded-[15px]"/>
          <input placeholder="Masukkan kata sandi" type="password" className="w-full p-2 mb-4 border border-red-600 rounded-[15px]"/>
          <Link to="/"className="block text-center bg-[#C62E2E] text-white py-2 rounded font-bold hover:bg-red-800 mt-7"> Daftar </Link>

          <div className="text-center my-4">atau masuk dengan</div>
          <div className="flex items-center mt-4 justify-center">
            <span className="flex-grow h-[1px] bg-black" />
            <a href="googlelogin.html" className="mx-4" aria-label="Login with Google">
              <img src="/assets/images/google-icon.png" alt="Google" className="w-8 h-8" />
            </a>
            <span className="flex-grow h-[1px] bg-black" />
          </div>
        </div>

        {/* Welcome Section */}
        <div className="text-center">
          <img src="/assets/images/fotologin.png" alt="Foto Login" className="w-[300px] mb-4"
          />
          <h2 className="text-black mt-4 font-semibold">Masuk dan Mulai Belanja!</h2>
          <p className="text-gray-600">Kami menghadirkan beragam produk unggulan</p>
          <p className="text-gray-600">dari Jawa Tengah.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;

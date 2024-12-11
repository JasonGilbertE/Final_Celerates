import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Registrasi gagal"}`);
        return;
      }

      alert("Akun berhasil dibuat!");
      navigate("/login");
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
    }
  };

  const handleGoogleLogin = async (response) => {
    const { tokenId } = response;
    try {
      const googleLoginResponse = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: tokenId }),
      });

      const data = await googleLoginResponse.json();
      if (googleLoginResponse.ok) {
        const { token, user } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", user.is_admin ? "admin" : "user");

        // Navigate based on user role
        if (user.is_admin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        alert(data.message || "Login dengan Google gagal");
      }
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
    }
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
          {/* name */}
          <input
            placeholder="Nama Lengkap"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 border border-red-600 rounded-[15px]"
          />
          <input
            placeholder="Email/nomor ponsel"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border border-red-600 rounded-[15px]"
          />
          <input
            placeholder="Masukkan kata sandi baru"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 border border-red-600 rounded-[15px]"
          />
          <input
            placeholder="Masukkan kata sandi"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* <div className="text-center my-4">atau masuk dengan</div>
          <div className="flex items-center mt-4 justify-center">
            <span className="flex-grow h-[1px] bg-black" />
            <a
              href="javascript:void(0)"
              onClick={() => window.google.accounts.id.prompt()}
              className="mx-4"
              aria-label="Login with Google"
            >
              <img src="/assets/images/google-icon.png" alt="Google" className="w-8 h-8" />
            </a>
            <span className="flex-grow h-[1px] bg-black" />
          </div> */}
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

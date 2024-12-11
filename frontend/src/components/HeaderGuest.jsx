import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import products from "../services/ProductData"; // Import data produk

const HeaderGuest = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan kata kunci pencarian
  const navigate = useNavigate();

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fungsi untuk mengirimkan pencarian
  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== "") {
      // Filter produk berdasarkan kata kunci pada properti "title"
      const filteredData = products.filter((product) => product.title.toLowerCase().includes(searchTerm.trim().toLowerCase()));
      // Navigasi ke halaman hasil pencarian dengan data yang difilter
      navigate("/search", { state: { results: filteredData, query: searchTerm.trim() } });
    }
  };

  return (
    <header className="bg-[#C62E2E] text-white p-4 flex justify-between items-center fixed top-0 w-full z-10 border-b-2 border-gray-300">
      {/* Logo */}
      <div className="logo text-xl font-bold font-ribeye flex-shrink-0 pl-5 flex flex-col justify-center items-center">
        <span>CENTRAL</span>
        <span>JAVA</span>
      </div>

      {/* Navigasi */}
      <nav className="nav flex space-x-4 items-center ml-20">
        <Link to="/home" className="">
          Home
        </Link>
        <CategoryDropdown />
      </nav>

      {/* Pencarian */}
      <div className="search-bar flex-grow flex items-center bg-white rounded-[15px] pl-3 pr-2 py-1 mx-auto w-full max-w-xl">
        {/* Ikon Pencarian */}
        <i className="fas fa-search text-gray-600 cursor-pointer text-2xl" onClick={handleSearchSubmit}></i>
        {/* Input Pencarian */}
        <input
          type="text"
          placeholder="Cari Produk..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()} // Submit saat tekan Enter
          className="search-input w-full px-2 py-1 rounded-[15px] focus:outline-none text-black"
        />
      </div>
      
      <nav className="flex space-x-4">
        <Link to="/login" className="bg-red-300 text-black px-4 py-2 rounded-md hover:bg-red-400 transition">
          Masuk
        </Link>
        <Link to="/register" className="bg-red-300 text-black px-4 py-2 rounded-md hover:bg-red-400 transition">
          Daftar
        </Link>
      </nav>
    </header>
  );
};

export default HeaderGuest;




import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";

const HeaderGuest = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== "") {
      console.log("Searching for:", searchTerm);
    }
  };

  return (
    <header className="bg-[#C62E2E] text-white p-4 flex justify-between items-center fixed top-0 w-full z-10 border-b-2 border-gray-300">
      <div className="text-xl font-bold font-ribeye text-center">
        <span>CENTRAL</span>
        <br />
        <span>JAVA</span>
      </div>

      <nav className="flex items-center space-x-6">
        <Link to="/" className="hover:text-gray-200 transition">
          Beranda
        </Link>
        <CategoryDropdown /> 
      </nav>

      <div className="flex items-center bg-white rounded-full px-3 py-1 w-full max-w-xl mx-4">
        <button
          onClick={handleSearchSubmit}
          className="text-gray-600 text-2xl focus:outline-none"
        >
          <i className="fas fa-search"></i>
        </button>
        <input
          type="text"
          placeholder="Cari Produk..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-2 py-1 rounded-r-full focus:outline-none text-black"
        />
      </div>

      <nav className="flex space-x-4">
        <Link
          to="/login"
          className="bg-red-300 text-black px-4 py-2 rounded-md hover:bg-red-400 transition">Masuk</Link>
        <Link
          to="/register"
          className="bg-red-300 text-black px-4 py-2 rounded-md hover:bg-red-400 transition" >Daftar</Link>
      </nav>
    </header>
  );
};

export default HeaderGuest;

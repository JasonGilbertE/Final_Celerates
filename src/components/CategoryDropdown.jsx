import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown saat tombol diklik
  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Tutup dropdown saat klik di luar area dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button className="dropbtn bg-[#C62E2E] text-white p-2 rounded-md" onClick={toggleDropdown}>
        Kategori <i className="fas fa-chevron-down ml-1"></i>
      </button>
      {isOpen && (
        <div className="dropdown-content absolute bg-[#F7CDCF] rounded-lg shadow-md mt-1 w-40 text-left">
          {" "}
          {/* Mengubah warna background dan posisi teks ke kiri */}
          <Link to="/pakaian" className="block p-2 text-black">
            Pakaian
          </Link>{" "}
          {/* Mengubah warna teks */}
          <Link to="/makanan" className="block p-2 text-black">
            Makanan
          </Link>{" "}
          {/* Mengubah warna teks */}
          <Link to="/kerajinan" className="block p-2 text-black">
            Kerajinan
          </Link>{" "}
          {/* Mengubah warna teks */}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;

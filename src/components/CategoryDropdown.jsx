import React, { useState, useRef, useEffect } from "react";

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

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
      <button
        className="dropbtn bg-[#C62E2E] text-white p-2 rounded-md"
        onClick={toggleDropdown}
      >
        Kategori <i className="fas fa-chevron-down ml-1"></i>
      </button>
      {isOpen && (
        <div className="dropdown-content absolute bg-[#F7CDCF] rounded-lg shadow-md mt-1 w-40 text-left">
          <a href="pakaian.html" className="block p-2 text-black">Pakaian</a> 
          <a href="makanan.html" className="block p-2 text-black">Makanan</a>
          <a href="kerajinan.html" className="block p-2 text-black">Kerajinan</a> 
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;

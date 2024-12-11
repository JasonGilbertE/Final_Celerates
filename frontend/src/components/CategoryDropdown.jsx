import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <button className="dropbtn bg-[#C62E2E] text-white p-2 rounded-md" onClick={toggleDropdown}>
        Kategori <i className="fas fa-chevron-down"></i>
      </button>
      {isOpen && (
        <div className="dropdown-content absolute bg-[#F7CDCF] rounded-lg shadow-md mt-1 w-40 text-left">
          {" "}
          <Link to="/pakaian" className="block p-2 text-black">
            Pakaian
          </Link>{" "}
          <Link to="/makanan" className="block p-2 text-black">
            Makanan
          </Link>{" "}
          <Link to="/kerajinan" className="block p-2 text-black">
            Kerajinan
          </Link>{" "}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;

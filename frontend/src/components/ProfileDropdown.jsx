import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);
  const hasToken = localStorage.getItem("token") ? true : false;

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !profileIconRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button ref={profileIconRef} className="profile-icon text-white text-3xl p-2" onClick={toggleDropdown}>
        <i className={`fas fa-user-circle ${isOpen ? "text-white" : "text-white"}`}></i>
      </button>
      {(isOpen && hasToken) && (
        <div className="profil-dropdown-content absolute bg-[#F7CDCF] rounded-lg shadow-md mt-1 w-40 text-left right-1">
          {" "}
          <Link to="/profile" className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100">
            Pengaturan Akun
          </Link>
          <Link to="/loyalitas" className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100">
            Loyalitas
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
          >
            Keluar
          </button>
        </div>
      )}
      {(isOpen && !hasToken) && (
        <div className="profil-dropdown-content absolute bg-[#F7CDCF] rounded-lg shadow-md mt-1 w-40 text-left right-1">
          <Link to="/login" className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100">
            Masuk
          </Link>
          <Link to="/register" className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100">
            Daftar
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

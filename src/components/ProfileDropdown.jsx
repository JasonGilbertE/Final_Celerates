import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);
  const navigate = useNavigate(); 

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !profileIconRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    navigate("/login");
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
        ref={profileIconRef}
        className="profile-icon text-white text-3xl p-2"
        onClick={toggleDropdown}>
        <i className={`fas fa-user-circle ${isOpen ? "text-white" : "text-white"}`}></i>
      </button>
      {isOpen && (
        <div className="profil-dropdown-content absolute bg-[#F7CDCF] rounded-lg shadow-md mt-1 w-40 text-left right-1">
          <a href="profil.html" className="block p-2 text-black">
            Pengaturan Akun
          </a>
          <a href="Loyalitass.html" className="block p-2 text-black">
            Loyalitas
          </a>
          <button
            onClick={handleLogout}
            className="block w-full text-left p-2 text-black hover:bg-gray-200">
            Keluar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FiSearch } from 'react-icons/fi'; 
import { FaCaretDown } from 'react-icons/fa'; 

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const navigate = useNavigate(); 
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    navigate('/login'); 
  };

  const handleLogoClick = () => {
    navigate('/admin/dashboard'); 
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header className="bg-[#C62E2E] text-white p-4 flex justify-between items-center fixed top-0 w-full z-10 border-b-2 border-gray-300">
      <div
        className="logo text-xl font-bold font-ribeye flex-shrink-0 pl-5 flex flex-col justify-center items-center cursor-pointer"
        onClick={handleLogoClick} 
      >
        <span>CENTRAL</span>
        <span>JAVA</span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative w-80"> 
          <input
            type="text"
            placeholder="Cari Produk..."
            className="pl-10 pr-4 py-2 rounded-[15px] focus:outline-none text-black w-full border border-gray-300"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 focus:outline-none"
          >
            ADMIN <FaCaretDown className="ml-2" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg w-40 z-10">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

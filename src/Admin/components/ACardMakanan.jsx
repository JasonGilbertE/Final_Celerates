import React, { useState, useRef, useEffect } from 'react';

const ACardMakanan = ({ product, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative card w-full bg-white border-4 border-[#C62E2E] rounded-lg shadow-md mb-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        </div>

        <span className="font-semibold text-gray-700">Rp {product.price}</span>

        <div className="absolute top-2 right-4">
          <button
            ref={buttonRef}
            className="text-white pb-3 text-xl bg-[#C62E2E] rounded-lg w-8 h-8 flex items-center justify-center"
            onClick={toggleDropdown}
          >
            ...
          </button>

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-32 bg-[#C62E2E] rounded shadow-lg z-10"
            >
              <ul className="text-sm text-white">
                <li
                  className="px-4 py-2  cursor-pointer"
                  onClick={() => onDelete(product.id)} 
                >
                  Hapus
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ACardMakanan;

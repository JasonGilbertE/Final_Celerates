import React, { useState, useRef, useEffect } from "react";

const ACardMakanan = ({ product, onDelete, onEdit }) => {
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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative border-4 border-[#C62E2E] rounded-lg overflow-hidden shadow-md bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover" />

      <div className="p-4 text-left">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-[#C62E2E] font-bold">
          Rp. {product.price ? product.price.toLocaleString() : "Harga tidak tersedia"}
        </p>
      </div>

      <div className="absolute top-4 right-4">
        <button
          ref={buttonRef}
          className="text-white pb-3 text-xl bg-[#C62E2E] rounded-lg w-8 h-8 flex items-center justify-center"
          onClick={toggleDropdown} >
          ...
        </button>

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 bg-[#C62E2E] border shadow-lg rounded-lg z-10" >
            <button
              className="block w-full px-4 py-2 text-sm text-white text-left"
              onClick={() => onDelete(product.id)} >
              Hapus
            </button>
            <button
              className="block w-full px-4 py-2 text-sm text-white text-left"
              onClick={() => onEdit(product.id)}  >
              Ubah
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ACardMakanan;

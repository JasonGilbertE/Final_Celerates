// src/components/PopularProductCard.jsx
import React from "react";

const PopularProductCard = ({ image, title, price }) => {
  return (
    <div className="popular-product-card bg-white border-4 border-red-600 rounded-lg shadow-lg p-4 w-full max-w-xs">
      {/* Gambar Produk */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      {/* Nama Produk */}
      <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
      {/* Harga Produk */}
      <p className="text-xl text-red-600 font-bold mt-2">{price}</p>
      {/* Tombol Beli */}
      <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full">
        Beli Sekarang
      </button>
    </div>
  );
};

export default PopularProductCard;

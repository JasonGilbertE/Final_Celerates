// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ image, title, price, discountPrice, isFlashSale }) => {
  return (
    <div
      className={`bg-white border-4 ${isFlashSale ? "border-red-600" : "border-gray-300"} rounded-lg shadow-lg p-4 text-center`}
    >
      {/* Gambar Produk */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      {/* Nama Produk */}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="price mt-2">
        {/* Menampilkan harga diskon jika ada */}
        {discountPrice && (
          <span className="text-red-600 font-bold text-lg line-through mr-2">
            {discountPrice}
          </span>
        )}
        <span className="text-xl text-green-600 font-bold">{price}</span>
      </div>
      {/* Tombol untuk menambah ke keranjang */}
      <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md w-full">
        {isFlashSale ? "Beli Sekarang" : "Tambah ke Keranjang"}
      </button>
    </div>
  );
};

export default ProductCard;

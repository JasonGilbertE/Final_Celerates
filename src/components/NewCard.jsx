import React, { useState } from "react";
import productData from "../services/NewData";

function NewCard() {
  const [activeTab, setActiveTab] = useState("popular");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="new-products px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-xl mt-10">
      <div className="newproduct-header flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Produk Terbaru</h2>
        <a href="#" className="see-allss text-sm font-bold text-black hover:text-red-600 ml-auto">
          Lihat Semua &gt;
        </a>
      </div>

      <div className="category-tabs flex justify-center text-base sm:text-lg mb-5">
        <ul className="tab-menu flex justify-between w-full max-w-4xl">
          <li
            onClick={() => handleTabClick("popular")}
            className={`tab-item text-center cursor-pointer ${
              activeTab === "popular" ? "text-black border-b-4 border-black" : "text-gray-400"
            }`}
          >
            Popular
          </li>
          <li
            onClick={() => handleTabClick("pakaian")}
            className={`tab-item text-center cursor-pointer ${
              activeTab === "pakaian" ? "text-black border-b-4 border-black" : "text-gray-400"
            }`}
          >
            Pakaian
          </li>
          <li
            onClick={() => handleTabClick("makanan")}
            className={`tab-item text-center cursor-pointer ${
              activeTab === "makanan" ? "text-black border-b-4 border-black" : "text-gray-400"
            }`}
          >
            Makanan
          </li>
          <li
            onClick={() => handleTabClick("kerajinan")}
            className={`tab-item text-center cursor-pointer ${
              activeTab === "kerajinan" ? "text-black border-b-4 border-black" : "text-gray-400"
            }`}
          >
            Kerajinan
          </li>
        </ul>
      </div>

      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productData.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white border-4 border-[#C62E2E] rounded-lg shadow-lg overflow-hidden relative"
          >
            <span className="label absolute top-2 left-2 bg-[#C62E2E] text-white text-xs py-1 px-2 rounded-lg">
              TERBARU
            </span>
            <img
              src={product.image}
              alt={product.description}
              className="w-full h-64 object-cover"
            />
            <div className="product-info p-4 flex flex-col justify-between h-36">
              <div>
                <div className="rating flex items-center gap-1">
                  {[...Array(product.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                  <span className="text-sm text-gray-700">({product.rating})</span>
                </div>
                <h6 className="text-lg font-semibold text-gray-800 mt-2">{product.name}</h6>
              </div>
              <div className="price-cart-row text-left mt-4">
                <p className="pricez text-[#C62E2E] font-bold text-lg">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewCard;

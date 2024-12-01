import React, { useState } from "react";
import productData from "../services/NewData";

function NewCard() {
  const [activeTab, setActiveTab] = useState("popular");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="new-products px-6 py-10 bg-white rounded-xl mt-10">
      <div className="newproduct-header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Produk Terbaru</h2>
        <a href="#" className="see-allss text-sm font-bold text-black hover:text-red-600 ml-auto">
          Lihat Semua &gt;
        </a>
      </div>
      <div className="category-tabs flex justify-center text-xl mb-5">
        <ul className="tab-menu flex gap-72">
          <li onClick={() => handleTabClick("popular")} className={`tab-item text-center cursor-pointer ${activeTab === "popular" ? "text-black border-b-2 border-black" : "text-gray-400"}`}>
            Popular
          </li>
          <li onClick={() => handleTabClick("pakaian")} className={`tab-item text-center cursor-pointer ${activeTab === "pakaian" ? "text-black border-b-2 border-black" : "text-gray-400"}`}>
            Pakaian
          </li>
          <li onClick={() => handleTabClick("makanan")} className={`tab-item text-center cursor-pointer ${activeTab === "makanan" ? "text-black border-b-2 border-black" : "text-gray-400"}`}>
            Makanan
          </li>
          <li onClick={() => handleTabClick("kerajinan")} className={`tab-item text-center cursor-pointer ${activeTab === "kerajinan" ? "text-black border-b-2 border-black" : "text-gray-400"}`}>
            Kerajinan
          </li>
        </ul>
      </div>
      <div className="products-grid flex justify-center grid xl:grid-cols-4 gap-8">
        {productData.map((product) => (
          <div key={product.id} className="product-card bg-white border-4 border-red-600 rounded-lg shadow-lg overflow-hidden relative w-[300px] h-[450px]">
            <span className="label absolute top-2 left-2 bg-red-600 text-white text-xs py-1 px-2 rounded-lg">TERBARU</span>
            <img src={product.image} alt={product.description} className="w-[301px] h-[270px] object-cover" />
            <div className="product-info p-4 mt-4 flex flex-col justify-between h-[130px]">
              <div>
                <div className="rating flex items-center gap-1">
                  {[...Array(product.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                  <span className="text-sm text-gray-700">({product.rating})</span>
                </div>
                <h6 className="text-lg font-semibold text-gray-800 mt-5">{product.name}</h6>
              </div>
              <div className="price-cart-row text-left mt-5">
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

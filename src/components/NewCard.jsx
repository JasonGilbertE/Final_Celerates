import React, { useState } from "react";
import { Link } from "react-router-dom";
import productData from "../services/NewData";

function NewCard() {
  const [activeTab, setActiveTab] = useState("popular");

  // Filter data berdasarkan tab aktif
  const filteredProducts = productData.filter((product) => {
    if (activeTab === "popular") return product.isPopular; // Filter untuk tab "Populer"
    if (activeTab === "pakaian") return product.category === "pakaian"; // Filter untuk tab "Pakaian"
    if (activeTab === "makanan") return product.category === "makanan"; // Filter untuk tab "Makanan"
    if (activeTab === "kerajinan") return product.category === "kerajinan"; // Filter untuk tab "Kerajinan"
    return product;
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="new-products px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-xl mt-10">
      <div className="newproduct-header flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Produk Terbaru</h2>
        <Link to="/terbaru" className="see-allss text-sm font-bold text-black hover:text-red-600 ml-auto">
          Lihat Semua &gt;
        </Link>
      </div>

      {/* Tab Menu */}
      <div className="category-tabs flex justify-center text-base sm:text-lg mb-5">
        <ul className="tab-menu flex justify-between w-full max-w-4xl">
          <li onClick={() => handleTabClick("popular")} className={`tab-item text-center cursor-pointer ${activeTab === "popular" ? "text-black border-b-4 border-black" : "text-gray-400"}`}>
            Populer
          </li>
          <li onClick={() => handleTabClick("pakaian")} className={`tab-item text-center cursor-pointer ${activeTab === "pakaian" ? "text-black border-b-4 border-black" : "text-gray-400"}`}>
            Pakaian
          </li>
          <li onClick={() => handleTabClick("makanan")} className={`tab-item text-center cursor-pointer ${activeTab === "makanan" ? "text-black border-b-4 border-black" : "text-gray-400"}`}>
            Makanan
          </li>
          <li onClick={() => handleTabClick("kerajinan")} className={`tab-item text-center cursor-pointer ${activeTab === "kerajinan" ? "text-black border-b-4 border-black" : "text-gray-400"}`}>
            Kerajinan
          </li>
        </ul>
      </div>

      {/* Produk Grid */}
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link to={"/productdetail/${product.id}/"} className="block">
            <div key={product.id} className="product-card bg-white border-4 border-[#C62E2E] rounded-lg shadow-lg overflow-hidden relative w-[300px] h-[450px]">
              <span className="label absolute top-2 left-2 bg-[#C62E2E] text-white text-xs py-1 px-2 rounded-lg">TERBARU</span>
              <img src={product.img} alt={product.alt} className="w-full h-64 object-cover" />
              <div className="product-info p-4 flex flex-col justify-between h-36">
                <div>
                  <div className="rating flex items-center gap-1">
                    {[...Array(product.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-yellow-400"></i>
                    ))}
                    <span className="text-sm text-gray-700">({product.rating})</span>
                  </div>
                  <h6 className="text-lg font-semibold text-gray-800 mt-2">{product.title}</h6>
                </div>
                <div className="price-cart-row text-left mt-4">
                  <p className="pricez text-[#C62E2E] font-bold text-lg">{product.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default NewCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import popularData from "../services/PopularData";

function PopularCard() {
  const [activeTab, setActiveTab] = useState("all"); // State untuk tab aktif

  // Filter produk berdasarkan tab aktif
  const filteredProducts = popularData.filter((product) => {
    if (activeTab === "all") return true; // Tampilkan semua produk
    return product.category === activeTab; // Filter berdasarkan kategori
  });

  return (
    <section className="popular-section px-6 py-10 bg-white rounded-xl mt-10">
      <div className="popular-header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Produk Terpopuler</h2>
        <Link to="/pakaian" className="see-all text-sm font-bold text-[#000000] hover:text-red-800" onClick={() => setActiveTab("all")}>
          Lihat Semua &gt;
        </Link>
      </div>

      <div className="popular-content flex gap-8">
        {/* Sidebar sebagai Tab Navigation */}
        <aside className="w-1/4 pr-4">
          <div className="flex flex-col space-y-2 mb-4">
            <h3 className="bg-red-200 py-2 px-4 font-bold">Kategori</h3>
            <button className={`bg-red-200 py-2 px-4 rounded hover:bg-gray-200 w-full text-left ${activeTab === "pakaian" ? "bg-red-700 text-white" : ""}`} onClick={() => setActiveTab("pakaian")}>
              Pakaian
            </button>
            <button className={`bg-red-200 py-2 px-4 rounded hover:bg-gray-200 w-full text-left ${activeTab === "makanan" ? "bg-red-700 text-white" : ""}`} onClick={() => setActiveTab("makanan")}>
              Makanan
            </button>
            <button className={`bg-red-200 py-2 px-4 rounded hover:bg-gray-200 w-full text-left ${activeTab === "kerajinan" ? "bg-red-700 text-white" : ""}`} onClick={() => setActiveTab("kerajinan")}>
              Keranjinan
            </button>
          </div>
          <div className="bg-red-700 text-white p-4 rounded flex items-center justify-center">
            <img src="public/assets/images/banner5.png" alt="Promotional" className="mb-4 rounded" />
          </div>
        </aside>

        {/* Grid Produk */}
        <div className="products-populer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          {filteredProducts.map((product) => (
            <Link to={"/productdetail/{product.id}/"} className="block">
              <div key={product.id} className="card-populer bg-white border-4 border-[#C62E2E] rounded-lg shadow-lg overflow-hidden relative" style={{ width: "300px", height: "450px" }}>
                {product.isPopular && <span className="label absolute top-2 left-2 bg-[#C62E2E] text-white text-xs py-1 px-2 rounded-lg">TERPOPULER</span>}
                <img src={product.img} alt={product.alt} className="w-full h-[270px] object-cover rounded-t-lg" />
                <div className="card-body p-4 flex flex-col justify-between h-[180px]">
                  <div>
                    <div className="rating flex items-center gap-1 text-yellow-400">
                      {[...Array(product.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                      <span className="text-sm text-gray-700 ml-2">({product.rating})</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-800 mt-2">{product.title}</h3>
                  </div>
                  <div className="price-cart-row text-left mb-8">
                    <p className="pricez text-[#C62E2E] font-bold text-lg">{product.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCard;

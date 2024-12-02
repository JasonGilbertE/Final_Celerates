import React from "react";
import popularData from "../services/PopularData";

function PopularCard() {
  return (
    <section className="popular-section px-6 py-10 bg-white rounded-xl mt-10">
      <div className="popular-header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Produk Terpopuler</h2>
        <a href="#" className="see-all text-sm font-bold text-[#000000] hover:text-red-800">
          Lihat Semua &gt;
        </a>
      </div>
      <div className="popular-content flex gap-8">
        <div className="sidebar w-64 flex flex-col items-center">
          <div className="category-sidebar w-full">
            <button className="category-button active text-[#F53E32] text-left font-bold bg-red-100 p-2 rounded-md mb-2 w-full">Kategori</button>
            <button className="category-button p-2 rounded-md text-left mb-2 w-full font-bold text-black bg-red-100">Pakaian</button>
            <button className="category-button p-2 rounded-md text-left mb-2 w-full font-bold text-black bg-red-100">Makanan</button>
            <button className="category-button p-2 rounded-md text-left mb-2 w-full font-bold text-black bg-red-100">Kerajinan</button>
          </div>
          <img src="public/assets/images/banner0.png" alt="Banner Promo" className="banner-img w-full rounded-lg mt-8" style={{ height: "820px" }} />
        </div>

        <div className="products-populer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow">
          {popularData.map((product) => (
            <div key={product.id} className="card-populer bg-white border-4 border-red-600 rounded-lg shadow-lg overflow-hidden relative">
              <span className="label absolute top-2 left-2 bg-red-600 text-white text-xs py-1 px-2 rounded-lg">TERBARU</span>
              <img src={product.image} alt={product.description} className="w-full h-48 object-cover rounded-t-lg" style={{ height: "270px" }} />

              <div className="card-body p-4 flex flex-col justify-between h-56">
                <div className="rating flex items-center mt-7 text-yellow-400 mb-9">
                  {"⭐".repeat(product.rating)}
                  <span className="text-sm text-gray-700 ml-2">({product.rating})</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <div className="price-carts flex justify-between items-center mt-auto">
                  <span className="harga text-red-600 font-bold text-lg">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCard;

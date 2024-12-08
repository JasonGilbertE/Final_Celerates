import React, { useEffect, useState } from "react";
import productData from "../services/ProductData";
import Card from "../components/KategoriCard";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import Header from "../components/Header";
import Footer from "../components/Footer";

const Kerajinan = () => {
  const [filter, setFilter] = useState(""); // state untuk filter
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // untuk mengontrol dropdown
  const [activeCategory, setActiveCategory] = useState("kerajinan"); // state untuk kategori aktif

  // Filter data berdasarkan kategori aktif
  const filteredData = productData.filter((item) => item.category.toLowerCase() === activeCategory.toLowerCase());

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleFilterChange = (value) => {
    setFilter(value);
    setIsDropdownOpen(false); // tutup dropdown setelah pilihan dipilih
  };

  const sortedProductData = [...filteredData].sort((a, b) => {
    switch (filter) {
      case "terbaru":
        return productData.indexOf(a) - productData.indexOf(b);
      case "termahal":
        return parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, ""));
      case "termurah":
        return parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, ""));
      default:
        return 0;
    }
  });

  useEffect(() => {
    setActiveCategory("kerajinan"); // Sinkronkan kategori aktif dengan rute
  }, []);

  return (
    <main className="mt-8">
      <Header />
      <div className="flex justify-between items-center mt-20 p-6 relative">
        <h1 className="text-xl font-bold flex items-center">
          <i className="fas fa-gem mr-2"></i> Kerajinan
        </h1>
        <button className="bg-red-200 btn-red-pale text-black px-4 py-2 rounded-full flex items-center" onClick={toggleDropdown}>
          {filter ? filter : "Terbaru"}
          <i className="fas fa-bars ml-3"></i>
        </button>
        {isDropdownOpen && (
          <div className="absolute top-10 right-0 bg-red-200 border border-gray-300 shadow-md mt-2 w-40 z-10">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleFilterChange("terbaru")}>
              Terbaru
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleFilterChange("termurah")}>
              Termurah
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleFilterChange("termahal")}>
              Termahal
            </button>
          </div>
        )}
      </div>

      <hr className="mb-4" />

      <div className="flex p-8">
        <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <section className="w-3/4 ml-8">
          <div className="grid grid-cols-3 gap-4">
            {sortedProductData.map((product, index) => (
              <Card key={index} {...product} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Kerajinan;

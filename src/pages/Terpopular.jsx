import React, { useState } from "react";
import productData from "../services/ProductData";
import Card from "../components/KategoriCard"; // Komponen untuk menampilkan kartu produk
import Header from "../components/Header";
import Footer from "../components/Footer"; // Komponen untuk menampilkan footer

const Terpopular = () => {
  const [filter, setFilter] = useState("terbaru"); // Default filter: terbaru
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Untuk mengontrol dropdown

  // Fungsi toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fungsi untuk mengatur filter
  const handleFilterChange = (value) => {
    setFilter(value);
    setIsDropdownOpen(false); // Tutup dropdown setelah pilihan dipilih
  };

  // Urutkan data berdasarkan filter
  const sortedProductData = [...productData].sort((a, b) => {
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

  return (
    <main className="p-8">
      <Header />
      {/* Subheader */}
      <div className="flex justify-between items-center mt-16 mb-4 relative">
        <h1 className="text-xl font-bold flex items-center">
          <i className="fas fa-gem mr-2"></i> Terpopuler
        </h1>
        <button className="bg-red-200 btn-red-pale text-black px-4 py-2 rounded-full flex items-center" onClick={toggleDropdown}>
          {filter === "terbaru" ? "Terbaru" : filter === "termurah" ? "Termurah" : "Termahal"}
          <i className="fas fa-bars ml-3"></i>
        </button>
        {isDropdownOpen && (
          <div className="absolute top-10 right-0 bg-white border border-gray-300 shadow-md mt-2 w-40 z-10">
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

      {/* Grid Produk */}
      <section>
        <div className="grid grid-cols-4 gap-4">
          {sortedProductData.map((product, index) => (
            <Card key={index} {...product} />
          ))}
        </div>
        <Footer />
      </section>
    </main>
  );
};

export default Terpopular;

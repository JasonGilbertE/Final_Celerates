import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/KategoriCard";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Kerajinan = () => {
  const [filter, setFilter] = useState(""); // State untuk filter
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Kontrol dropdown
  const [products, setProducts] = useState([]); // Produk dari API
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const activeCategory = "kerajinan"; // Kategori tetap makanan

  // Fungsi untuk mengambil data dari API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:3000/api/items?categoryId=3&take=30&filterBy=popular`;
      const response = await fetch(url);
      const data = await response.json();
      // jika data kosong, set error tidak ada data
      if (!data.length) {
        setError("Tidak ada data");
      }
      setProducts(data);
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => new Intl.NumberFormat().format(price);

  // Fungsi untuk menangani perubahan filter
  const handleFilterChange = (value) => {
    setFilter(value);
    setIsDropdownOpen(false);
  };

  // Mengambil data produk saat komponen dimuat
  useEffect(() => {
    fetchProducts();
  }, []);

  // Mengurutkan data berdasarkan filter
  const sortedProducts = products.length
    ? [...products].sort((a, b) => {
        switch (filter) {
          case "terbaru":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "termahal":
            return b.price - a.price;
          case "termurah":
            return a.price - b.price;
          default:
            return 0;
        }
      })
    : [];

  return (
    <main className="mt-10">
      <Header />
      <div className="flex justify-between items-center mt-20 p-6 relative">
        <h1 className="text-xl font-bold flex items-center">
          <i className="fas fa-gem mr-2"></i> Kerajinan
        </h1>
        <button
          className="bg-red-200 btn-red-pale text-black px-4 py-2 rounded-full flex items-center"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {filter ? filter : "Terbaru"}
          <i className="fas fa-bars ml-3"></i>
        </button>
        {isDropdownOpen && (
          <div className="absolute top-10 right-0 bg-red-200 border border-gray-300 shadow-md mt-2 w-40 z-10">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => handleFilterChange("terbaru")}
            >
              Terbaru
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => handleFilterChange("termurah")}
            >
              Termurah
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => handleFilterChange("termahal")}
            >
              Termahal
            </button>
          </div>
        )}
      </div>
      <hr className="mb-4" />
      <div className="flex p-8">
        <Sidebar activeCategory={activeCategory} />
        <section className="w-3/4 ml-8">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  img={"http://localhost:3000/" +  product.images[0].url}
                  alt={product.name}
                  title={product.name}
                  price={"Rp. " + formatPrice(product.price)}
                  rating={product.rating}
                />
              ))}
            </div>
          )}
        </section>
      </div>
      {loading && <p className="text-center">Loading...</p>}
      <Footer />
    </main>
  );
};

export default Kerajinan;

import React, { useState, useEffect } from "react";
import Card from "../components/KategoriCard"; // Komponen untuk menampilkan kartu produk
import Header from "../components/Header";
import Footer from "../components/Footer"; // Komponen untuk menampilkan footer

const Terpopular = () => {
  const [products, setProducts] = useState([]); // Data produk dari API
  const [filter, setFilter] = useState("terbaru"); // Default filter: terbaru
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Untuk mengontrol dropdown
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  
  const formatPrice = (price) => new Intl.NumberFormat().format(price);

  // Fungsi untuk mengambil data dari API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/items?take=100&filterBy=date_desc"); // Endpoint untuk produk populer
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Gagal memuat data produk.");
    } finally {
      setLoading(false);
    }
  };

  // Mengambil data saat komponen dimuat
  useEffect(() => {
    fetchProducts();
  }, []);

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
  const sortedProductData = products.length
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

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mt-24 text-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <main className="mt-10">
      <Header />
      {/* Subheader */}
      <div className="flex justify-between items-center mt-20 p-6 relative">
        <h1 className="text-xl font-bold flex items-center">
          <i className="fas fa-gem mr-2"></i> Terpopuler
        </h1>
        <button className="bg-red-200 btn-red-pale text-black px-4 py-2 rounded-full flex items-center" onClick={toggleDropdown}>
          {filter === "terbaru" ? "Terbaru" : filter === "termurah" ? "Termurah" : "Termahal"}
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
      {/* Grid Produk */}
      <section className="px-8 min-h-screen">
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : sortedProductData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-4 gap-8 mb-10 ml-8">
            {sortedProductData.map((product, index) => (
              <Card
                key={index}
                id={product.id}
                img={"http://localhost:3000/" + product.images[0].url}
                alt={product.name}
                title={product.name}
                price={"Rp. " + formatPrice(product.price)}
                rating={product.rating} // Placeholder untuk rating
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Tidak ada produk yang tersedia.</p>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default Terpopular;

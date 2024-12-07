import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/KategoriCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SearchPages = () => {
  const location = useLocation();
  const { results = [], query = "" } = location.state || { results: [], query: "" };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-24">
        <h1 className="text-2xl font-bold mb-4 p-4">Hasil Pencarian untuk "{query}"</h1>
        {results.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ml-10 mr-10 mt-15 mb-15">
              {results.map((product) => (
                <Card key={product.id} id={product.id} img={product.img} alt={product.alt} title={product.title} price={product.price} rating={product.rating} isNew={product.isNew} />
              ))}
            </div>
            <p className="text-center text-gray-500 mt-10 mb-10">Semoga Anda menemukan produk yang dicari!</p>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10 mb-10">
            Tidak ada produk yang ditemukan. <br />
            Mungkin coba gunakan kata kunci yang berbeda?
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchPages;

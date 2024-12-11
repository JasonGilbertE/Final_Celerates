import React from "react";
import { useLocation } from "react-router-dom";
import Card from "./KategoriCard";
import Header from "./Header";
import Footer from "./Footer";

const SearchResults = () => {
  const location = useLocation();
  const { results = [], query = "" } = location.state || {};

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 mt-20 mb-20">
        <h1 className="text-2xl font-bold mb-4">Hasil Pencarian untuk "{query}"</h1>
        {results.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7x2 mx-auto px-4">
              {results.map((product) => (
                <Card key={product.id} id={product.id} img={product.img} alt={product.alt} title={product.title} price={product.price} rating={product.rating} isNew={product.isNew} />
              ))}
            </div>
            <p className="text-center text-gray-500 mt-6">Semoga Anda menemukan produk yang dicari!</p>
          </div>
        ) : (
          <p className="text-gray-500">Maaf, kami belum menemukan apa yang Anda cari. Mungkin coba gunakan kata kunci yang berbeda?</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;

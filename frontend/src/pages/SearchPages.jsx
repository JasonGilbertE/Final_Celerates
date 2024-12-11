import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/KategoriCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SearchPages = () => {
  const location = useLocation();
  const { query = "" } = location.state || { query: "" };

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/items?search=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError("Something went wrong while fetching the results.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

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

  const isNew = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diff = now - created;
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays <= 10;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-24">
        <h1 className="text-2xl font-bold mb-4 p-4">Hasil Pencarian untuk "{query}"</h1>
        {error && <p className="text-red-500 text-center mt-10 mb-10">{error}</p>}
        {results.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ml-10 mr-10 mt-15 mb-15">
              {results.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  img={"http://localhost:3000/" + product.images[0]?.url}
                  alt={product.name}
                  title={product.name}
                  price={product.price}
                  rating={4.5} // Assuming count_sold as a placeholder for rating
                  isNew={isNew(product.createdAt)}
                />
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

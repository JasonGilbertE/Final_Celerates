import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import Sidebar from '../components/Sidebar';

const AMakananDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/items/${id}`);
        if (!response.ok) {
          throw new Error('Produk tidak ditemukan');
        }
        const data = await response.json();
        setProduct(data); // Assuming the API returns the product object directly
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-grow mt-20 bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-red-600">Loading...</h2>
          </div>
        </main>
        <AdminFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-grow mt-20 bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-red-600">
              {error}
            </h2>
          </div>
        </main>
        <AdminFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />

      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar />

          <div className="w-3/4 ml-8">
            <div className="mb-6">
              <button 
                onClick={() => window.history.back()}
                className="text-black font-bold">
                &larr; Kembali
              </button>
            </div>

            <div className="flex p-6 rounded-lg bg-white">
              <div className="w-1/3">
                <img
                  src={`http://localhost:3000/${product.images[0].url}`}
                  alt={product.name}
                  className="w-full h-auto object-cover mb-6"
                />
              </div>

              <div className="w-2/3 pl-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
                <p className="text-xl font-semibold text-[#C62E2E] mb-6">
                  Rp. {parseInt(product.price).toLocaleString()}
                </p>

                <div className="border-t pt-4">
                  <p><strong>Kategori:</strong> {product.category.name}</p>
                  <p><strong>Stok:</strong> {product.stock}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex border-b">
                <button
                  className={`px-6 py-2 font-bold ${
                    activeTab === 'description'
                      ? 'border-b-4 border-[#000000] text-[#C62E2E]'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  Deskripsi
                </button>
                <button
                  className={`px-6 py-2 font-bold ${
                    activeTab === 'information'
                      ? 'border-b-4 border-[#000000] text-[#C62E2E]'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setActiveTab('information')}
                >
                  Informasi
                </button>
              </div>

              <div className="p-4 bg-white border-4 border-[#ffffff] mt-2">
                {activeTab === 'description' && (
                  <div>
                    <h3 className="font-bold mb-2">Deskripsi</h3>
                    <p>{product.desc}</p>
                  </div>
                )}
                {activeTab === 'information' && (
                  <div>
                    <h3 className="font-bold mb-2">Informasi</h3>
                    <p><strong>Warna:</strong> {product.color}</p>
                    <p><strong>Ukuran:</strong> {product.size}</p>
                    <p><strong>Model:</strong> {product.model}</p>
                    <p><strong>Expired:</strong> {product.expiration_date}</p>
                    <p><strong>Stok:</strong> {product.stock}</p>
                    <p><strong>Terjual:</strong> {product.count_sold}</p>
                    <p><strong>Harga Asli:</strong> Rp. {parseInt(product.strikeout_price).toLocaleString()}</p>
                    <p><strong>Harga:</strong> Rp. {parseInt(product.price).toLocaleString()}</p>
                    <p><strong>Dibuat:</strong> {Date(product.createdAt)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default AMakananDetail;

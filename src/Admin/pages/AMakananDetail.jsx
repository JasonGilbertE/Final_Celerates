import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ADataMakanan } from '../services/ADataMakanan';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import Sidebar from '../components/Sidebar';

const AMakananDetail = () => {
  const { id } = useParams();
  const product = ADataMakanan.find((item) => item.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-grow mt-20 bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-red-600">
              Produk tidak ditemukan!
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
              <Link to="/admin/makanan" className="text-black font-bold">
                &larr; Kembali
              </Link>
            </div>

            <div className="flex p-6 rounded-lg bg-white">
              <div className="w-1/3">
                <img
                  src={product.image}
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
                  <p><strong>Kategori:</strong> {product.category}</p>
                  <p><strong>Berat:</strong> {product.weight} kg</p>
                  <p><strong>Rasa:</strong> {product.flavor}</p>
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
                    <p>{product.description}</p>
                  </div>
                )}
                {activeTab === 'information' && (
                  <div>
                    <h3 className="font-bold mt-4 mb-2">Berat</h3>
                    <p>{product.weight} kg</p>
                    <h3 className="font-bold mt-4 mb-2">Rasa</h3>
                    <p>{product.flavor}</p>
                    <h3 className="font-bold mt-4 mb-2">Stok</h3>
                    <p>{product.stock}</p>
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

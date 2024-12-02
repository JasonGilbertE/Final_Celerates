import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ADataPakaian } from '../services/ADataPakaian';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import Sidebar from '../components/Sidebar';

const APakaianDetail = () => {
  const { id } = useParams();
  const product = ADataPakaian.find((item) => item.id === parseInt(id));
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
              <Link to="/admin/pakaian" className="text-black font-bold">
                &larr; Kembali
              </Link>
            </div>

            <div className="flex p-6 rounded-lg bg-white">
              {/* Gambar Produk */}
              <div className="w-1/3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover mb-6"
                />
              </div>

              {/* Detail Produk */}
              <div className="w-2/3 pl-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
                <p className="text-xl font-semibold text-[#C62E2E] mb-6">
                  Rp. {parseInt(product.price).toLocaleString()}
                </p>

                <div className="border-t pt-4">
                  <p><strong>Kategori:</strong> {product.category}</p>
                  <p><strong>Bahan:</strong> {product.material}</p>
                  <p><strong>Warna:</strong> {product.color}</p>
                  <p><strong>Ukuran:</strong> {product.size.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Tabs Deskripsi dan Informasi */}
            <div className="mt-6">
              <div className="flex border-b">
                <button
                  className={`px-6 py-2 font-bold ${
                    activeTab === 'description'
                      ? 'border-b-4 border-[#C62E2E] text-[#C62E2E]'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  Deskripsi
                </button>
                <button
                  className={`px-6 py-2 font-bold ${
                    activeTab === 'information'
                      ? 'border-b-4 border-[#C62E2E] text-[#C62E2E]'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setActiveTab('information')}
                >
                  Informasi
                </button>
              </div>

              <div className="p-4 bg-white border-4 border-[#C62E2E] mt-2">
                {activeTab === 'description' && (
                  <div>
                    <h3 className="font-bold mb-2">Deskripsi</h3>
                    <p>{product.description}</p>
                  </div>
                )}
                {activeTab === 'information' && (
                  <div>
                    <h3 className="font-bold mt-4 mb-2">Stok</h3>
                    <p>{product.stock}</p>
                    <h3 className="font-bold mt-4 mb-2">Bahan</h3>
                    <p>{product.material}</p>
                    <h3 className="font-bold mt-4 mb-2">Warna</h3>
                    <p>{product.color}</p>
                    <h3 className="font-bold mt-4 mb-2">Ukuran</h3>
                    <p>{product.size.join(', ')}</p>
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

export default APakaianDetail;

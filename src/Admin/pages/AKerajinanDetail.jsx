import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ADataKerajinan } from '../services/ADataKerajinan';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import Sidebar from '../components/Sidebar';

const AKerajinanDetail = () => {
  const { id } = useParams();
  const product = ADataKerajinan.find((item) => item.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('deskripsi'); 

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
              <Link to="/admin/kerajinan" className="text-black font-bold">
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
                  Rp. {product.price.toLocaleString()}
                </p>

                <div className="border-t pt-4">
                  <p><strong>Kategori:</strong> Kerajinan</p>
                  <p><strong>Warna:</strong> {product.warnaTersedia}</p>
                  <p><strong>Ukuran:</strong> {product.ukuran}</p>
                  <p><strong>Model:</strong> {product.model}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('deskripsi')}
                  className={`px-6 py-2 font-bold ${
                    activeTab === 'deskripsi'
                      ? 'border-b-4 border-[#C62E2E] text-[#C62E2E]'
                      : 'text-gray-600'
                  }`}
                >
                  Deskripsi
                </button>
                <button
                  onClick={() => setActiveTab('informasi')}
                  className={`px-6 py-2 font-bold ${
                    activeTab === 'informasi'
                      ? 'border-b-4 border-[#C62E2E] text-[#C62E2E]'
                      : 'text-gray-600'
                  }`}
                >
                  Informasi
                </button>
              </div>

              <div className="p-4 bg-white border-4 border-[#C62E2E] mt-2">
                {activeTab === 'deskripsi' ? (
                  <div>
                    <h3 className="font-bold mb-2">Deskripsi Produk</h3>
                    <p>{product.description}</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold mb-2">Kategori</h3>
                    <p>Kerajinan</p>
                    <h3 className="font-bold mt-4 mb-2">Stok</h3>
                    <p>{product.stok}</p>
                    <h3 className="font-bold mt-4 mb-2">Ukuran Tersedia</h3>
                    <p>{product.ukuran}</p>
                    <h3 className="font-bold mt-4 mb-2">Model</h3>
                    <p>{product.model}</p>
                    <h3 className="font-bold mt-4 mb-2">Warna Tersedia</h3>
                    <p>{product.warnaTersedia}</p>
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

export default AKerajinanDetail;

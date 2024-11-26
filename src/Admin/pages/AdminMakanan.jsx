import React from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import Sidebar from '../components/Sidebar';
import { ADataMakanan } from '../services/ADataMakanan';
import ACardMakanan from '../components/ACardMakanan';
import { Link } from 'react-router-dom';

const AdminMakanan = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />

      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar />

          <div className="w-3/4 ml-8">
            <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
              <h2 className="text-2xl font-bold">
                Kategori Produk
              </h2>
              <Link
                to="/admin/tambah-produk"
                className="bg-[#C62E2E] text-white px-4 py-2 rounded-lg text-sm"
              >
                + Tambah Kategori
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ADataMakanan.map(item => (
                <ACardMakanan key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default AdminMakanan;

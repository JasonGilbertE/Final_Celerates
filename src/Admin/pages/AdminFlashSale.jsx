import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader'; 
import AdminFooter from '../components/AdminFooter'; 
import Sidebar from '../components/Sidebar'; 
import { Link } from 'react-router-dom';

const AdminFlashSale = () => {
  const [formData, setFormData] = useState({
    productName: '',
    originalPrice: '',
    flashSalePrice: '',
    startTime: '',
    endTime: '',
    image: null, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file, 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Flash Sale Data:', formData);

  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />

      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar />

          <div className="w-3/4 ml-8">
            <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
              <h2 className="text-2xl font-bold">Tambah Flash Sale</h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
              <div className="mb-4">
                <label htmlFor="productName" className="block text-gray-700">Nama Produk</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Masukkan Nama Produk"
                  required />
              </div>

              <div className="mb-4">
                <label htmlFor="originalPrice" className="block text-gray-700">Harga Asli</label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Masukkan Harga Asli"
                  required />
              </div>

              <div className="mb-4">
                <label htmlFor="flashSalePrice" className="block text-gray-700">Harga Flash Sale</label>
                <input
                  type="number"
                  id="flashSalePrice"
                  name="flashSalePrice"
                  value={formData.flashSalePrice}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Masukkan Harga Flash Sale"
                  required />
              </div>

              <div className="mb-4">
                <label htmlFor="startTime" className="block text-gray-700">Waktu Mulai</label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  required />
              </div>

              <div className="mb-4">
                <label htmlFor="endTime" className="block text-gray-700">Waktu Berakhir</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  required />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700">Gambar Produk</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  accept="image/*" />
              </div>

              <button
                type="submit"
                className="bg-[#C62E2E] text-white px-6 py-2 rounded-lg mt-4">
                Tambah Produk
              </button>
            </form>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default AdminFlashSale;

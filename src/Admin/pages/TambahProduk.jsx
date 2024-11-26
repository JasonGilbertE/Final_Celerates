import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Sidebar from "../components/Sidebar";

const TambahProduk = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />

      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar />

          <div className="w-3/4 ml-8">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2">
              Tambah Produk
            </h2>

            <form className="grid grid-cols-3 gap-x-4 gap-y-2">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Nama Produk</label>
                <input
                  type="text"
                  placeholder="masukkan nama produk"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"
                />
              </div>

              <div className="col-span-1 row-span-3">
                <label className="block text-sm font-medium mb-1">Gambar Produk</label>
                <div className="relative border-2 border-dashed border-[#C62E2E] rounded h-56 w-full flex items-center justify-center">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      className="h-full w-full object-cover rounded"/>
                  ) : (
                    <span className="text-gray-400 text-xl">🖼️ Upload Gambar</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  placeholder="masukkan deskripsi produk"
                  className="w-full border-2 border-[#C62E2E] rounded p-2 h-20"
                ></textarea>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <input
                  type="text"
                  placeholder="Pilih kategori"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"/>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Jumlah</label>
                <input
                  type="number"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"/>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tgl Kadaluarsa</label>
                <input
                  type="date"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"/>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Harga</label>
                <input
                  type="text"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"/>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Harga Diskon</label>
                <input
                  type="text"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"/>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Warna</label>
                <input
                  type="text"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"/>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ukuran</label>
                <input
                  type="text"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"/>
              </div>

              <div className="col-span-3">
                <label className="block text-sm font-medium mb-1">Model</label>
                <input
                  type="text"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"/>
              </div>

              <div className="col-span-3 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="border border-[#C62E2E] text-[#C62E2E] px-4 py-2 rounded">
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#C62E2E] text-white px-4 py-2 rounded">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default TambahProduk;

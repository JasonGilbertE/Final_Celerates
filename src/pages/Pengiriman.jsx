import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

const Pengiriman = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProducts = [], totalBelanja = 0 } = location.state || {}; // Data diterima dari Keranjang
  const [shippingOption, setShippingOption] = useState("");
  const [address, setAddress] = useState("Jl. Diponegoro no.99, Surabaya, Jawa Timur");

  // Fungsi untuk menangani perubahan metode pengiriman
  const handleShippingChange = (value) => {
    setShippingOption(value);
  };

  // Fungsi untuk navigasi ke halaman Pembayaran
  const handleNext = () => {
    if (!shippingOption) {
      alert("Pilih metode pengiriman terlebih dahulu!");
      return;
    }
    navigate("/pembayaran", {
      state: {
        selectedProducts,
        totalBelanja,
        shippingOption,
        address,
      },
    });
  };

  // Jika tidak ada data barang, tampilkan pesan error
  if (!selectedProducts.length) {
    return (
      <div>
        <main className="container mx-auto mt-8">
          <p>Data tidak tersedia. Silakan kembali ke halaman keranjang.</p>
          <button className="bg-red-600 text-white py-2 px-4 rounded mt-4" onClick={() => navigate("/keranjang")}>
            Kembali ke Keranjang
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-[#C62E2E] text-white p-4">
        <div className="text-lg font-bold">
          <p>CENTRAL</p>
          <p className="ml-3 font-ribeye">JAVA</p>
        </div>
      </header>
      <main className="container mx-auto mt-24">
        <h2 className="text-xl font-bold mb-4">
          <i className="fas fa-map-marker-alt"></i> Detail Pengiriman
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Alamat Pengiriman */}
          <div className="col-span-2">
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h3 className="font-bold mb-2">Alamat Pengiriman</h3>
              <p>{address}</p>
              <button className="bg-red-600 text-white px-4 py-2 mt-2 rounded" onClick={() => setAddress(prompt("Masukkan alamat baru:", address))}>
                Ubah Alamat
              </button>
            </div>
            {/* Daftar Barang */}
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              {selectedProducts.map((item) => (
                <div key={item.id} className="flex items-center mb-4">
                  <img alt={item.name} className="w-16 h-16 object-cover rounded mr-4" src={item.image} />
                  <div>
                    <h4 className="font-bold">{item.name}</h4>
                    <p>
                      Rp. {item.price.toLocaleString()} x{item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Metode Pengiriman */}
            <div className="bg-white p-4 rounded shadow-sm">
              <label className="block mb-2 font-bold" htmlFor="shipping">
                Pilih Pengiriman
              </label>
              <select className="w-full border border-gray-300 rounded p-2 mb-4" value={shippingOption} onChange={(e) => handleShippingChange(e.target.value)}>
                <option value="" disabled>
                  Pilih Pengiriman
                </option>
                <option value="paxel">Paxel - Rp. 20.000 Estimasi 2-3 hari</option>
                <option value="jnt">JNT - Rp. 20.000 Estimasi 2-3 hari</option>
              </select>
            </div>
          </div>
          {/* Ringkasan Belanja */}
          <div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-bold mb-2">Ringkasan belanja Anda</h3>
              <p>Total Belanja: Rp. {totalBelanja.toLocaleString()}</p>
              <p>Biaya Admin: Rp. 1.000</p>
              <p>
                Total yang harus dibayar: <span className="font-bold">Rp. {(totalBelanja + 1000).toLocaleString()}</span>
              </p>
              <button className={`w-full mt-4 ${shippingOption ? "bg-red-600 text-white" : "bg-red-300 text-gray-400 cursor-not-allowed"} py-2 rounded`} disabled={!shippingOption} onClick={handleNext}>
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pengiriman;

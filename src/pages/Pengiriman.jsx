import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderLogo from "../components/HeaderLogo";

const Pengiriman = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProducts = [], totalBelanja = 0 } = location.state || {};
  const [shippingOption, setShippingOption] = useState("");
  const [address, setAddress] = useState("Jl. Diponegoro no.99, Surabaya, Jawa Timur");

  const handleShippingChange = (value) => {
    setShippingOption(value);
  };

  const handleAddressChange = () => {
    const newAddress = prompt("Masukkan alamat baru:", address);
    if (newAddress && newAddress.trim() !== "") {
      setAddress(newAddress);
    } else {
      alert("Alamat tidak boleh kosong!");
    }
  };

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

  if (!selectedProducts.length) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="container mx-auto mt-8 flex-grow">
          <p>Data tidak tersedia. Silakan kembali ke halaman keranjang.</p>
          <button className="bg-red-600 text-white py-2 px-4 rounded mt-4" onClick={() => navigate("/keranjang")}>
            Kembali ke Keranjang
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const shippingCost = shippingOption ? 20000 : 0;
  const totalToPay = totalBelanja + shippingCost + 1000;

  return (
    <div className="flex flex-col min-h-screen bg-whte">
      <HeaderLogo />
      <main className="container mx-auto mt-24 flex-grow">
        <h2 className="text-xl font-bold mb-4">Detail Pengiriman</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="bg-white p-4 rounded shadow mb-4">
              <h3 className="font-bold mb-2">Alamat Pengiriman</h3>
              <p>{address}</p>
              <button className="bg-[#C62E2E] text-white px-4 py-2 mt-2 rounded" onClick={handleAddressChange}>
                Ubah Alamat
              </button>
            </div>
            <div className="bg-white p-4 rounded shadow mb-4 mt-8">
              <h3 className="font-bold mb-2">Daftar Barang</h3>
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
            <div className="bg-white p-4 rounded shadow mt-8 mb-24">
              <label className="block mb-2 font-bold" htmlFor="shipping">
                Pilih Metode Pengiriman
              </label>
              <select className="w-full border border-gray-300 rounded p-2 " value={shippingOption} onChange={(e) => handleShippingChange(e.target.value)}>
                <option value="" disabled>
                  Pilih Pengiriman
                </option>
                <option value="paxel">Paxel - Rp. 20.000 Estimasi 2-3 hari</option>
                <option value="jnt">JNT - Rp. 20.000 Estimasi 2-3 hari</option>
              </select>
            </div>
          </div>
          <div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold mb-2">Ringkasan Belanja Anda</h3>
              <p>Total Belanja: Rp. {totalBelanja.toLocaleString()}</p>
              <p>Biaya Pengiriman: Rp. {shippingCost.toLocaleString()}</p>
              <p>Biaya Admin: Rp. 1.000</p>
              <p>
                Total yang harus dibayar: <span className="font-bold">Rp. {totalToPay.toLocaleString()}</span>
              </p>
              <button className={`w-full mt-4 ${shippingOption ? "bg-[#C62E2E] text-white" : "bg-red-300 text-white cursor-not-allowed"} py-2 rounded`} disabled={!shippingOption} onClick={handleNext}>
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

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Footer from "../components/Footer";

const Pembayaran = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const [timer, setTimer] = useState(15 * 60);
  const { totalBelanja = 0, selectedProducts = [] } = location.state || {};

  // Format timer to mm:ss
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}m ${seconds}s`;
  };

  // Start countdown timer
  useEffect(() => {
    if (isPaymentStarted) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaymentStarted]);

  const handleStartPayment = () => {
    setIsPaymentStarted(true);
  };

  const handleCheckStatus = () => {
    // Simulate payment success
    const itemsProcessed = selectedProducts.map((item) => ({
      ...item,
      status: "Sedang diproses",
    }));
    navigate("/transaksi", { state: { itemsProcessed } });
  };

  const confirmBack = () => {
    setIsModalOpen(false);
    navigate("/keranjang");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="bg-[#C62E2E] text-white p-4">
        <div className="text-lg font-bold">
          <p>CENTRAL</p>
          <p className="ml-3 font-ribeye">JAVA</p>
        </div>
      </header>
      <main className="container mx-auto mt-8 flex-grow">
        <h2 className="text-xl font-semibold mt-20 mb-4">Detail Pembayaran</h2>
        <div className="flex justify-between">
          {/* Ringkasan Pembayaran */}
          <div className="w-1/2 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Ringkasan yang harus dibayarkan</h3>
            <div>
              <p>Total belanja Anda</p>
              <p className="text-right">Rp. {totalBelanja.toLocaleString()}</p>
            </div>
            <div>
              <p>Biaya Ongkos Kirim</p>
              <p className="text-right">Rp. 20.000</p>
            </div>
            <div>
              <p>Biaya Admin</p>
              <p className="text-right">Rp. 1.000</p>
            </div>
            <div className="border-t mt-2 pt-2">
              <p>Total yang harus dibayarkan</p>
              <p className="text-right">Rp. {(totalBelanja + 20000 + 1000).toLocaleString()}</p>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="w-1/2 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Metode Pembayaran</h3>
            {!isPaymentStarted && !isPaid && (
              <>
                <div className={`mb-4 p-4 border rounded ${isPaymentStarted ? "bg-red-200" : "bg-white"}`}>
                  <p>QRIS</p>
                  <p className="text-right font-bold">Rp. {(totalBelanja + 20000 + 1000).toLocaleString()}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <button className="w-1/2 bg-white border border-red-600 text-red-500 py-2 px-4 rounded" onClick={() => setIsModalOpen(true)}>
                    Kembali
                  </button>
                  <button className="w-1/2 bg-red-600 text-white py-2 rounded ml-2" onClick={handleStartPayment}>
                    Bayar Sekarang
                  </button>
                </div>
              </>
            )}

            {isPaymentStarted && !isPaid && (
              <>
                <h3 className="text-lg font-semibold mb-4 text-center">CENTRAL JAVA</h3>
                <div className="mb-4 p-4 bg-green-100 rounded text-center">
                  <p>Selesaikan Pembayaran dalam {formatTimer()}</p>
                </div>
                <div className="flex justify-center items-center mb-4">
                  <img alt="QRIS code for payment" className="w-200 h-200" src="/assets/images/K_QR.jpg" />
                </div>
                <div className="mb-2">
                  <p>Total pembayaran</p>
                  <p className="text-right">Rp. {(totalBelanja + 20000 + 1000).toLocaleString()}</p>
                </div>
                <button className="w-full bg-red-600 text-white py-2 rounded" onClick={handleCheckStatus}>
                  Cek Status Pembayaran
                </button>
              </>
            )}

            {isPaid && (
              <>
                <h3 className="text-lg font-semibold mb-4 text-center">CENTRAL JAVA</h3>
                <div className="mb-4 p-4 bg-green-100 rounded text-center">
                  <p>Pembayaran berhasil</p>
                </div>
                <div className="mb-4 text-center">
                  <p>Cek status pembayaran di halaman daftar transaksi sekarang</p>
                </div>
                <button className="w-full bg-red-600 text-white py-2 rounded" onClick={() => navigate("/transaksi")}>
                  Daftar Transaksi
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onConfirm={confirmBack} />}
      <Footer />
    </div>
  );
};

export default Pembayaran;

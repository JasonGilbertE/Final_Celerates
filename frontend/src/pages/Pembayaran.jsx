import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import HeaderLogo from "../components/HeaderLogo";
import axios from "axios"; // Add axios for making API requests

const Pembayaran = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const [timer, setTimer] = useState(15 * 60);
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [qrUrl, setQrUrl] = useState(""); // State to hold QR URL
  const [transactionId, setTransactionId] = useState(null); // State for storing transaction ID
  const [voucherId, setVoucherId] = useState(0); // State for storing voucher ID

  const { totalBelanja = 0, selectedProducts = [], address } = location.state || {};

  const biayaOngkosKirim = 20000;
  const biayaAdmin = 1000;
  const totalBeforeDiscount = totalBelanja + biayaOngkosKirim + biayaAdmin;

  const totalYangHarusDibayarkan = totalBeforeDiscount - discount;

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}m ${seconds}s`;
  };

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

  // cegah refresh
  useEffect(() => {
    if (!location.state) {
      navigate("/keranjang");
    }
  }, [location.state, navigate]);
  


  const handleStartPayment = async () => {
    try {
      const addresString = `${address.address}, ${address.address_name}, ${address.recipient}, ${address.phone_number}`;
      const requestData = {
        voucher_id: voucherId,
        address: addresString,
        total_amount: totalYangHarusDibayarkan.toString(),
        items: selectedProducts.map(item => ({
          items_id: item.id,
          qty: item.quantity,
          amount: item.price * item.quantity,
        })),
      };
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3000/api/transactions/", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === "success") {
        setQrUrl(response.data.data.qr_url);
        setTransactionId(response.data.data.transaction_id); // Save the transaction ID
        setIsPaymentStarted(true);
      } else {
        alert("Gagal membuat transaksi!");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Terjadi kesalahan, coba lagi.");
    }
  };

  const handleCheckStatus = async () => {
    if (transactionId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/transactions/check/${transactionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status === "success" && response.data.data.payment_status === "settlement") {
          setIsPaid(true);
          localStorage.removeItem("transactions");
          alert("Pembayaran berhasil!");
          navigate("/daftar-transaksi", { state: { isPaid: true } });
        } else {
          alert("Pembayaran belum berhasil, coba lagi nanti.");
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        alert("Terjadi kesalahan saat mengecek status pembayaran.");
      }
    }
  };

  const handleNavigateToTransactions = () => {
    navigate("/daftar-transaksi");
  };

  const handleBack = () => {
    setIsModalOpen(true);
  };

  const confirmBack = () => {
    setIsModalOpen(false);
    navigate("/keranjang");
  };

  const cancelBack = () => {
    setIsModalOpen(false);
  };

  // Updated applyVoucher function with API request
  const applyVoucher = async () => {
    try {
      // Panggil API untuk memverifikasi voucher
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/vouchers/check",
        { code: voucherCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.status === "success") {
        const voucherData = response.data.data;
  
        if (totalBelanja >= voucherData.min_expense) {
          let calculatedDiscount = 0;
  
          // Terapkan diskon sesuai tipe
          if (voucherData.disc_type === "persen") {
            calculatedDiscount = (totalBelanja * voucherData.disc) / 100;
          } else if (voucherData.disc_type === "nominal") {
            calculatedDiscount = voucherData.disc;
          } else if (voucherData.disc_type === "ongkir") {
            calculatedDiscount = Math.min(voucherData.disc, biayaOngkosKirim);
          }
  
          // Pastikan diskon tidak melebihi batas maksimum
          const finalDiscount = Math.min(calculatedDiscount, voucherData.disc);
          setDiscount(finalDiscount); // Perbarui state diskon
          setVoucherId(voucherData.id); // Simpan ID voucher
  
          alert("Voucher berhasil diterapkan!");
        } else {
          alert(
            `Voucher ini memerlukan minimal belanja Rp. ${voucherData.min_expense.toLocaleString()}`
          );
          setDiscount(0); // Reset diskon jika tidak memenuhi syarat
        }
      } else {
        alert("Voucher tidak valid atau gagal memverifikasi.");
        setDiscount(0); // Reset diskon jika tidak valid
      }
    } catch (error) {
      console.error("Error checking voucher:", error);
      alert(error.response?.data?.message || "Terjadi kesalahan saat memverifikasi voucher.");
      setDiscount(0); // Reset diskon jika terjadi kesalahan
    }
  };
  

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <HeaderLogo />
      <main className="container mx-auto mt-8 flex-grow">
        <h2 className="text-xl font-semibold mt-20 mb-8">Detail Pembayaran</h2>
        <div className="flex justify-between gap-8">
          <div className="w-1/2 p-6 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Ringkasan yang harus dibayarkan
            </h3>
            <div className="flex justify-between mb-2">
              <p>Total belanja Anda</p>
              <p>Rp. {totalBelanja.toLocaleString()}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Biaya Ongkos Kirim</p>
              <p>Rp. {biayaOngkosKirim.toLocaleString()}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Biaya Admin</p>
              <p>Rp. {biayaAdmin.toLocaleString()}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Potongan Voucher</p>
              <p>Rp. {discount.toLocaleString()}</p>
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
              <p>Total yang harus dibayarkan</p>
              <p>Rp. {totalYangHarusDibayarkan.toLocaleString()}</p>
            </div>
          </div>

          <div className="w-1/2 p-6 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Metode Pembayaran</h3>
            {!isPaymentStarted && !isPaid && (
              <>
                <p className="text-left text-gray-600">QRIS</p>
                <p className="text-left text-lg font-bold text-black mt-4">
                  Rp. {totalYangHarusDibayarkan.toLocaleString()}
                </p>
                <div className="flex mt-6 gap-4">
                  <button
                    onClick={handleBack}
                    className="flex-1 py-2 border border-[#C62E2E] text-[#C62E2E] rounded"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={handleStartPayment}
                    className="flex-1 py-2 bg-[#C62E2E] text-white rounded"
                  >
                    Bayar Sekarang
                  </button>
                </div>
              </>
            )}

            {isPaymentStarted && !isPaid && (
              <div className="text-center">
                <h3 className="text-lg font-semibold mt-4">CENTRAL JAVA</h3>
                <p className="text-sm text-green-600 bg-green-100 p-2 rounded mt-2">
                  Selesaikan pembayaran dalam {formatTimer()}
                </p>
                {qrUrl && <img src={qrUrl} alt="QR Code" className="w-48 h-48 mx-auto mt-4" />}
                <p className="text-lg font-semibold mt-4">Total Pembayaran</p>
                <p className="text-xl font-bold">Rp. {totalYangHarusDibayarkan.toLocaleString()}</p>
                <button
                  onClick={handleCheckStatus}
                  className="w-full mt-6 bg-[#C62E2E] text-white py-2 rounded"
                >
                  Cek Status Pembayaran
                </button>
              </div>
            )}

            {isPaid && (
              <div className="text-center">
                <p className="text-green-500 text-lg font-bold">
                  Pembayaran Berhasil!
                </p>
                <p className="text-gray-600 mt-2">
                  Cek status pesananmu di halaman daftar transaksi sekarang
                </p>
                <button
                  onClick={handleNavigateToTransactions}
                  className="mt-4 px-4 py-2 bg-[#C62E2E] text-white rounded"
                >
                  Daftar Transaksi
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-1/2 mt-6 p-6 border rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Masukkan Kode Voucher</h3>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded"
              placeholder="Masukkan kode voucher"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <button
              onClick={applyVoucher}
              className="px-4 py-2 bg-[#C62E2E] text-white rounded"
            >
              Terapkan
            </button>
          </div>
        </div>
      </main>

      {isModalOpen && <Modal onClose={cancelBack} onConfirm={confirmBack} />}

      <Footer />
    </div>
  );
};

export default Pembayaran;

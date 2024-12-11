import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarProfile from "../components/SidebarProfile";

const DaftarTransaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Status modal
  const location = useLocation();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/transactions/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status === "success") {
          const apiTransactions = response.data.data.map((transaction) => ({
            id: transaction.transactionId,
            name: transaction.items[0]?.name || "Item tidak diketahui",
            details: transaction.amountDetails.address,
            price: transaction.items[0]?.amount || 0,
            quantity: transaction.items[0]?.quantity || 0,
            image: "http://localhost:3000/" + transaction.items[0]?.images[0],
            status: transaction.status,
            paymentUrl: transaction.payment.url,
          }));
          setTransactions(apiTransactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handlePay = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCheckPaymentStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/transactions/check/${selectedTransaction.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const paymentStatus = response.data.data.payment_status;

      if (paymentStatus === "settlement") {
        alert("Pembayaran berhasil!");
        setTransactions((prev) =>
          prev.map((t) =>
            t.id === selectedTransaction.id ? { ...t, status: "on process" } : t
          )
        );
        setIsModalOpen(false);
      } else if (paymentStatus === "expire") {
        alert("Pembayaran kadaluarsa!");
        setTransactions((prev) =>
          prev.map((t) =>
            t.id === selectedTransaction.id ? { ...t, status: "expired" } : t
          )
        );
        setIsModalOpen(false);
      } else {
        alert("Pembayaran belum berhasil.");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };

  // Fungsi untuk mengupdate status transaksi
  const handleUpdateTransactionStatus = async (transactionId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/api/transactions/status-update/${transactionId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        alert(`Transaksi berhasil diperbarui menjadi ${status}`);
        setTransactions((prev) =>
          prev.map((t) =>
            t.id === transactionId ? { ...t, status } : t
          )
        );
      } else {
        alert("Gagal memperbarui status transaksi.");
      }
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  const handleCancelTransaction = () => {
    alert("Fungsi pembatalan belum diimplementasikan.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="bg-white mx-8 pt-28 flex items-center space-x-2 border-b">
        <i className="fas fa-user-circle text-2xl pb-5"></i>
        <span className="text-xl pb-5">Akun</span>
      </div>

      <main className="container mx-auto flex md:flex-row flex-1 p-8">
        <SidebarProfile />

        <section className="w-full md:w-3/4 md:ml-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Daftar Transaksi</h2>
              <select className="border rounded px-2 py-1">
                <option>Pemesanan</option>
                <option>Pembatalan</option>
              </select>
            </div>

            {transactions.length === 0 ? (
              <p className="text-gray-600 text-center">Tidak ada transaksi ditemukan.</p>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-col md:flex-row md:justify-between items-start md:items-center p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        alt={`${transaction.name}, ${transaction.details}`}
                        className="w-16 h-16 rounded-lg"
                        src={transaction.image}
                      />
                      <div>
                        <h3 className="font-bold">{transaction.name}</h3>
                        <p className="text-gray-600">{transaction.details}</p>
                        <p className="text-gray-600">
                          Rp. {transaction.price.toLocaleString()} x {transaction.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 flex space-x-2 items-start">
                      {transaction.status === "pending" ? (
                        <>
                          <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            onClick={() => handlePay(transaction)}
                          >
                            Bayar
                          </button>
                          <button
                            className="px-4 py-2 bg-red-600 text-white rounded-lg"
                            onClick={() => handleUpdateTransactionStatus(transaction.id, "batal")}
                          >
                            Batalkan
                          </button>
                        </>
                      ) : transaction.status === "on process" ? (
                        <>
                          <span className="px-3 py-1 rounded-lg border">{transaction.status}</span>
                          <button
                            className="px-4 py-2 bg-green-600 text-white rounded-lg"
                            onClick={() => handleUpdateTransactionStatus(transaction.id, "selesai")}
                          >
                            Diterima
                          </button>
                          <button
                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
                            onClick={() => handleUpdateTransactionStatus(transaction.id, "di kembalikan")}
                          >
                            Dikembalikan
                          </button>
                        </>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-lg ${
                            transaction.status === "selesai"
                              ? "bg-green-600 text-white"
                              : "bg-gray-700 text-white"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Bayar Transaksi</h2>
            <img
              src={selectedTransaction.paymentUrl}
              alt="QR Code"
              className="w-full h-auto mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                onClick={handleCheckPaymentStatus}
              >
                Cek Status Pembayaran
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarTransaksi;

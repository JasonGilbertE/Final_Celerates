import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const Transaksi = () => {
  const location = useLocation();
  const { itemsProcessed = [] } = location.state || {};

  // Data tambahan (contoh status selesai)
  const additionalTransactions = [
    {
      id: 3,
      name: "Dompet anyaman rotan handmade",
      details: "merah, hitam",
      price: 30000,
      quantity: 2,
      image: "/assets/images/K_DOMPETANYAM.jpeg",
      status: "Selesai",
    },
  ];

  const transactions = [...itemsProcessed, ...additionalTransactions]; // Gabungkan data

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#C62E2E] text-white p-4">
        <div className="text-lg font-bold">
          <p>CENTRAL</p>
          <p className="ml-3 font-ribeye">JAVA</p>
        </div>
      </header>
      {/* Sub Header */}
      <div className="container mx-auto mt-24 flex items-center space-x-2">
        <i className="fas fa-user-circle text-2xl"></i>
        <h1 className="text-xl font-bold">Akun</h1>
      </div>
      <hr className="container mx-auto mt-2" />

      {/* Main Content */}
      <main className="container mx-auto mt-4">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className="bg-red-700 text-white p-3 rounded-lg mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-white text-red-700 rounded-full w-8 h-8 flex items-center justify-center">D</div>
                <span>Dewi Aprilia</span>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg mb-4 border">
              <button className="w-full text-left">Akun</button>
            </div>
            <div className="bg-pink-200 p-3 rounded-lg mb-8">
              <button className="w-full text-left">Daftar Transaksi</button>
            </div>
          </aside>

          {/* Transaction List */}
          <section className="w-full md:w-3/4 md:ml-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Daftar Transaksi</h2>
                <select className="border rounded px-2 py-1">
                  <option>Pemesanan</option>
                  <option>Pembatalan</option>
                </select>
              </div>

              {/* Jika tidak ada transaksi */}
              {transactions.length === 0 ? (
                <p className="text-gray-600 text-center">Tidak ada transaksi ditemukan.</p>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex flex-col md:flex-row md:justify-between items-start md:items-center p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img alt={"${transaction.name}, ${transaction.details}"} className="w-16 h-16 rounded-lg" src={transaction.image} />
                        <div>
                          <h3 className="font-bold">{transaction.name}</h3>
                          <p className="text-gray-600">{transaction.details}</p>
                          <p className="text-gray-600">
                            Rp. {transaction.price.toLocaleString()} x {transaction.quantity}
                          </p>
                        </div>
                      </div>
                      <span className={`mt-2 md:mt-0 px-3 py-1 rounded-lg ${transaction.status === "Selesai" ? "bg-green-600 text-white" : "bg-red-700 text-white"}`}>{transaction.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Transaksi;

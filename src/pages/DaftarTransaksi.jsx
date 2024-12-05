import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarProfile from "../components/SidebarProfile";

const DaftarTransaksi = () => {
  const location = useLocation();
  const [transactions, setTransactions] = useState([]);
  const { itemsProcessed = [] } = location.state || {};

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

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const newTransactions = [...storedTransactions, ...itemsProcessed];

    const uniqueTransactions = Array.from(
      new Map(newTransactions.map((item) => [item.id, item])).values()
    );
    setTransactions(uniqueTransactions);

    localStorage.setItem("transactions", JSON.stringify(uniqueTransactions));
  }, [itemsProcessed]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="bg-white mx-8 pt-28 flex items-center space-x-2 border-b">
        <i className="fas fa-user-circle text-2xl pb-5"></i>
        <span className="text-xl pb-5">Akun</span>
      </div>


      <main className=" container mx-auto flex md:flex-row flex-1 p-8">
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
                    <span
                      className={`mt-2 md:mt-0 px-3 py-1 rounded-lg ${
                        transaction.status === "Selesai"
                          ? "bg-green-600 text-white"
                          : "bg-red-700 text-white"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DaftarTransaksi;

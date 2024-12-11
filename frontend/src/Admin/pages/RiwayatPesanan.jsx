import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Sidebar from "../components/Sidebar";
import TopCard from "../components/TopCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const RiwayatPesanan = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [statusCount, setStatusCount] = useState({});
  const [totalPenjualan, setTotalPenjualan] = useState(0);

  // Fungsi untuk mengambil data transaksi dari API
  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/transactions/admin", {
        params: {
          start_date: startDate ? startDate.toISOString().split('T')[0] : '',
          end_date: endDate ? endDate.toISOString().split('T')[0] : ''
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      if (response.data.status === "success") {
        setTransactions(response.data.data.transactions);
        setStatusCount(response.data.data.status_count);
        setTotalPenjualan(response.data.data.total);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Mengambil data ketika startDate atau endDate berubah
  useEffect(() => {
    fetchTransactions();
  }, [startDate, endDate]);

  // Menghitung total penjualan, pesanan yang diproses, selesai, dan dibatalkan
  const pesananProses = statusCount["on process"] || 0;
  const pesananSelesai = statusCount["selesai"] || 0;
  const pesananDibatalkan = statusCount["batal"] || 0;
  const pesananKembali = statusCount["di kembalikan"] || 0;

  const cardData = [
    { title: "Total Penjualan", value: `Rp ${totalPenjualan.toLocaleString()}` },
    { title: "Pesanan Dalam Proses", value: pesananProses },
    { title: "Pesanan Selesai", value: pesananSelesai },
    { title: "Pesanan Dibatalkan", value: pesananDibatalkan },
    { title: "Pesanan Dikembalikan", value: pesananKembali }
  ];

  const handleUserClick = (id) => {
    navigate(`/admin/detail-transaksi/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />

      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar />

          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold">Riwayat Pesanan</h2>
              </div>

              <div className="flex items-center space-x-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Pilih Tanggal Mulai"
                  dateFormat="dd/MM/yyyy"
                  className="px-4 py-2 border rounded-md"
                />
                <span>-</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText="Pilih Tanggal Akhir"
                  dateFormat="dd/MM/yyyy"
                  className="px-4 py-2 border rounded-md"
                />
                <button
                  onClick={fetchTransactions}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="border-b mb-4"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {cardData.map((card, index) => (
                <TopCard
                  key={index}
                  title={card.title}
                  value={card.value}
                />
              ))}
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b py-2 px-4 text-left">Produk</th>
                    <th className="border-b py-2 px-4 text-left">ID Pesanan</th>
                    <th className="border-b py-2 px-4 text-left">Tanggal</th>
                    <th className="border-b py-2 px-4 text-left">Nama User</th>
                    <th className="border-b py-2 px-4 text-left">Status</th>
                    <th className="border-b py-2 px-4 text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((data, index) => (
                    <tr key={index}>
                      <td className="border-b py-2 px-4">{data.item_name}</td>
                      <td
                        className="border-b py-2 px-4 text-blue-500 cursor-pointer"
                        onClick={() => handleUserClick(data.transactionId)} // Tambahkan link ke detail pembeli
                      >
                        {data.orderID}
                      </td>
                      <td className="border-b py-2 px-4">{new Date(data.date).toLocaleDateString()}</td>
                      <td className="border-b py-2 px-4">{data.nama_user}</td>
                      <td
                        className={`border-b py-2 px-4 ${
                          data.status === "proses"
                            ? "text-yellow-500"
                            : data.status === "dibatalkan"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {data.status}
                      </td>
                      <td className="border-b py-2 px-4 text-right">
                        Rp {data.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default RiwayatPesanan;

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

  const currentFullDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

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

          <div className="w-3/4">
            <div className="flex justify-end items-center mb-6">
              <h3 className="text-lg font-bold text-gray-700">Tanggal: {currentFullDate}</h3>
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
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default RiwayatPesanan;

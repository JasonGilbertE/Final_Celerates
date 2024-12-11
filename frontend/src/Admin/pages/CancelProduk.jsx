import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Sidebar from "../components/Sidebar";
import riwayatData from "../services/RiwayatData";
import TopCard from "../components/TopCard"; 
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

const CancelProduk = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filteredData = riwayatData.filter((data) => data.status === "Dibatalkan");

  const cardData = [
    {
      title: "Total Produk Dibatalkan",
      value: filteredData.length,
      date: new Date().toLocaleDateString(),
    },
    {
      title: "Total Pendapatan Dibatalkan",
      value: filteredData.reduce((acc, data) => acc + data.jumlah, 0).toLocaleString(),
      date: new Date().toLocaleDateString(),
    },
    {
      title: "Total Jumlah Produk Dibatalkan",
      value: filteredData.reduce((acc, data) => acc + 1, 0),
      date: new Date().toLocaleDateString(),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar />
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Cancel Produk</h2>
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
              </div>
            </div>

            <div className="border-b mb-4"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {cardData.map((card, index) => (
                <TopCard
                  key={index}
                  title={card.title}
                  value={card.value}
                  date={card.date}
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
                  {filteredData.map((data, index) => (
                    <tr key={index}>
                      <td className="border-b py-2 px-4">{data.produk}</td>
                      <td className="border-b py-2 px-4">{data.idPesanan}</td>
                      <td className="border-b py-2 px-4">{data.tanggal}</td>
                      <td className="border-b py-2 px-4">{data.namaUser}</td>
                      <td className="border-b py-2 px-4 text-red-500">{data.status}</td>
                      <td className="border-b py-2 px-4 text-right">Rp {data.jumlah.toLocaleString()}</td>
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

export default CancelProduk;

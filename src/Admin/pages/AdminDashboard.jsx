import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AdminHeader />

      {/* Content */}
      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          {/* Sidebar */}
          <div className="w-1/4 pt-14 pr-4">
            <div className="space-y-4">
              <div className="bg-[#F7CDCF] p-4 shadow">LIST PESANAN</div>
              <div className="bg-[#F7CDCF] p-4 shadow">PRODUK</div>
              <div className="bg-[#F7CDCF] p-4 shadow">KATEGORI PRODUK</div>
              <div className="bg-[#F7CDCF] p-4 shadow">ULASAN PELANGGAN</div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="w-3/4">
            {/* Tanggal dengan Range Picker */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Dasbor</h2>
              <div className="flex items-center space-x-2">
                <i className="fas fa-calendar-alt text-gray-500"></i>
                <DatePicker
                  selected={startDate}
                  onChange={(update) => setDateRange(update)}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  dateFormat="MMM dd, yyyy"
                  placeholderText="Pilih rentang tanggal"
                  className="border border-gray-300 rounded px-2 py-1 text-gray-600 text-sm"
                />
              </div>
            </div>

            <hr className="border-gray-300 mb-6" />

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#C62E2E] p-4 rounded-[16px] shadow">
                <h3 className="font-bold text-white text-lg">Total Penjualan</h3>
                <p className="text-white">Rp. 2,234,000</p>
                <p className="text-xs text-gray-300 text-right mt-2">Bulan Oktober 2024</p>
              </div>
              <div className="bg-[#C62E2E] p-4 rounded-[16px] shadow">
                <h3 className="font-bold text-white text-lg">Pesanan dalam proses</h3>
                <p className="text-white">7</p>
                <p className="text-xs text-gray-300 text-right mt-2">Bulan Oktober 2024</p>
              </div>
              <div className="bg-[#C62E2E] p-4 rounded-[16px] shadow">
                <h3 className="font-bold text-white text-lg">Pesanan selesai</h3>
                <p className="text-white">10</p>
                <p className="text-xs text-gray-300 text-right mt-2">Bulan Oktober 2024</p>
              </div>
              <div className="bg-[#C62E2E] p-4 rounded-[16px] shadow">
                <h3 className="font-bold text-white text-lg">Pengembalian</h3>
                <p className="text-white">2</p>
                <p className="text-xs text-gray-300 text-right mt-2">Bulan Oktober 2024</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
};

export default AdminDashboard;

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import Sidebar from '../components/Sidebar';
import TopCard from '../components/TopCard'; 

const AdminDashboard = () => {
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [startDate, endDate] = dateRange;

  const cardData = [
    { title: "Total Penjualan", value: "Rp. 2,234,000", date: "Bulan Oktober 2024" },
    { title: "Pesanan dalam proses", value: "7", date: "Bulan Oktober 2024" },
    { title: "Pesanan selesai", value: "10", date: "Bulan Oktober 2024" },
    { title: "Pengembalian", value: "2", date: "Bulan Oktober 2024" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />

      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar />

          <div className="w-3/4">
            <div className="flex justify-end items-center mb-6">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cardData.map((card, index) => (
                <TopCard
                  key={index}
                  title={card.title}
                  value={card.value}
                  date={card.date}
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

export default AdminDashboard;

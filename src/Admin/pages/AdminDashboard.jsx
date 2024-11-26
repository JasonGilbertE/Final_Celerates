import React from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import Sidebar from '../components/Sidebar';
import TopCard from '../components/TopCard';

const AdminDashboard = () => {
  const currentDate = new Date();

  const currentFullDate = currentDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentMonthYear = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  const cardData = [
    { title: "Total Penjualan", value: "Rp. 2,234,000", date: currentMonthYear },
    { title: "Pesanan dalam proses", value: "7", date: currentMonthYear },
    { title: "Pesanan selesai", value: "10", date: currentMonthYear },
    { title: "Pengembalian", value: "2", date: currentMonthYear }
  ];

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

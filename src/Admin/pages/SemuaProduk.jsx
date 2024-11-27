import React from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import Sidebar from '../components/Sidebar';
import ACardMakanan from '../components/ACardMakanan';
import ACardPakaian from '../components/ACardPakaian';
import ACardKerajinan from '../components/ACardKerajinan';
import { ADataMakanan } from '../services/ADataMakanan';
import { ADataPakaian } from '../services/ADataPakaian';
import { ADataKerajinan } from '../services/ADataKerajinan';

const SemuaProduk = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <AdminHeader />

      <main className='flex-grow mt-20 bg-gray-50 py-8'>
        <div className='container mx-auto px-4 flex'>
          <Sidebar />

          <div className='w-3/4 ml-8'>
            <h2 className='text-2xl font-bold border-b border-gray-300 pb-2 mb-6'>
              Semua Produk
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {ADataMakanan.map(item => (
                <ACardMakanan key={item.id} product={item} />
              ))}
              {ADataPakaian.map(item => (
                <ACardPakaian key={item.id} product={item} />
              ))}
              {ADataKerajinan.map(item => (
                <ACardKerajinan key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default SemuaProduk;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'font-bold text-[#C62E2E]' : 'text-black';

  return (
    <div className="w-1/4 pt-14 pr-4">
      <div className="space-y-4">
        <div className="bg-[#F7CDCF] p-4 shadow">
          <h3 className="font-bold text-black border-b border-[#C62E2E] pb-2">LIST PESANAN</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/admin/riwayat-pesanan" className={`${isActive('/admin/riwayat-pesanan')} hover:text-black`}>
                Riwayat Pesanan
              </Link>
            </li>
            <li>
              <Link to="/admin/proses-pesanan" className={`${isActive('/admin/proses-pesanan')} hover:text-black`}>
                Pesanan dalam proses
              </Link>
            </li>
            <li>
              <Link to="/admin/done-pesanan" className={`${isActive('/admin/done-pesanan')} hover:text-black`}>
                Pesanan selesai
              </Link>
            </li>
            <li>
              <Link to="/admin/batal-pesanan" className={`${isActive('/admin/batal-pesanan')} hover:text-black`}>
                Pembatalan produk
              </Link>
            </li>
            <li>
              <Link to="/admin/return-pesanan" className={`${isActive('/admin/return-pesanan')} hover:text-black`}>
                Pengembalian produk
              </Link>
            </li>
          </ul>
        </div>
        <div className="bg-[#F7CDCF] p-4 shadow">
          <h3 className="font-bold text-black border-b border-[#C62E2E] pb-2">PRODUK</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/admin/semua-produk" className={`${isActive('/admin/semua-produk')} hover:text-black`}>
                Semua produk
              </Link>
            </li>
            <li>
              <Link to="/admin/tambah-produk" className={`${isActive('/admin/tambah-produk')} hover:text-black`}>
                Tambah produk
              </Link>
            </li>
            <li>
              <Link to="/admin/flash-sale" className={`${isActive('/admin/flash-sale')} hover:text-black`}>
                Atur produk flash sale
              </Link>
            </li>
          </ul>
        </div>
        <div className="bg-[#F7CDCF] p-4 shadow">
          <h3 className="font-bold text-black border-b border-[#C62E2E] pb-2">KATEGORI PRODUK</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/admin/pakaian" className={`${isActive('/admin/pakaian')} hover:text-black`}>
                Pakaian
              </Link>
            </li>
            <li>
              <Link to="/admin/makanan" className={`${isActive('/admin/makanan')} hover:text-black`}>
                Makanan
              </Link>
            </li>
            <li>
              <Link to="/admin/kerajinan" className={`${isActive('/admin/kerajinan')} hover:text-black`}>
                Kerajinan
              </Link>
            </li>
          </ul>
        </div>
        <div className="bg-[#F7CDCF] p-4 shadow">
          <h3 className="font-bold text-black border-b border-[#C62E2E] pb-2">ULASAN PELANGGAN</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/admin/ulasan-pelanggan" className={`${isActive('/admin/ulasan-pelanggan')} hover:text-black`}>
                Penilaian Pelanggan
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

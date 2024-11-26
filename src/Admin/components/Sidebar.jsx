import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-1/4 pt-14 pr-4">
      <div className="space-y-4">
        <div className="bg-[#F7CDCF] p-4 shadow">
          <h3 className="font-bold text-black">LIST PESANAN</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                to="/admin/riwayat-pesanan"
                className="text-gray-700 hover:text-black"
              >
                Riwayat Pesanan
              </Link>
            </li>
            <li>
              <Link
                to="/admin/proses-pesanan"
                className="text-gray-700 hover:text-black"
              >
                Pesanan dalam proses
              </Link>
            </li>
            <li>
              <Link
                to="/admin/done-pesanan"
                className="text-gray-700 hover:text-black"
              >
                Pesanan selesai
              </Link>
            </li>
            <li>
              <Link
                to="/admin/batal-pesanan"
                className="text-gray-700 hover:text-black"
              >
                Pembatalan produk
              </Link>
            </li>
            <li>
              <Link
                to="/admin/return-pesanan"
                className="text-gray-700 hover:text-black"
              >
                Pengembalian produk
              </Link>
            </li>
          </ul>
        </div>
        <div className="bg-[#F7CDCF] p-4 shadow">
          <h3 className="font-bold text-black">PRODUK</h3>
          <ul className="mt-2 space-y-2">
            <li className="text-gray-700">Semua produk</li>
            <li className="text-gray-700">Tambah produk</li>
            <li className="text-gray-700">Atur produk flash sale</li>
          </ul>
        </div>
        <div className="bg-[#F7CDCF] p-4 shadow">
          <h3 className="font-bold text-black">KATEGORI PRODUK</h3>
          <ul className="mt-2 space-y-2">
            <li className="text-gray-700">Pakaian</li>
            <li className="text-gray-700">Makanan</li>
            <li className="text-gray-700">Kerajinan</li>
          </ul>
        </div>
        <div className="bg-[#F7CDCF] p-4 shadow">
          <h3 className="font-bold text-black">ULASAN PELANGGAN</h3>
          <ul className="mt-2 space-y-2">
            <li className="text-gray-700">Penilaian Pelanggan</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

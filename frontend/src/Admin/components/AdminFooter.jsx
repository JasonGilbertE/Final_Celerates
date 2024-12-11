import React from "react";
import { Link } from "react-router-dom";

const AdminFooter = () => {
  return (
    <footer className="footer bg-[#C62E2E] mt-16 text-white p-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="footer-logo">
          <h3 className="text-lg font-bold mb-2">Central Java</h3>
          <div className="social-icons flex gap-2">
            <a href="#" className="icon-circle bg-white text-black w-8 h-8 flex items-center justify-center rounded-full">
              <i className="fab fa-xing"></i>
            </a>
            <a href="#" className="icon-circle bg-white text-black w-8 h-8 flex items-center justify-center rounded-full">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="icon-circle bg-white text-black w-8 h-8 flex items-center justify-center rounded-full">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-menu">
          <h4 className="text-sm font-bold mb-2">List Pesanan</h4>
          <ul>
            <li>
              <a href="#" className="text-sm hover:underline">
                Riwayat Pesanan
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Pesanan Dalam Proses
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Pesanan selesai
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Pembatalan Produk
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Pengembalian Produk
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-category">
          <h4 className="text-sm font-bold mb-2">Produk</h4>
          <ul>
            <li>
              <a href="#" className="text-sm hover:underline">
                Semua Produk
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Tambah Produk
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-settings">
          <h4 className="text-sm font-bold mb-2">Kategori dan Ulasan</h4>
          <ul>
            <li>
              <a href="#" className="text-sm hover:underline">
                Kategori Produk
              </a>
            </li>
            <li>
              <Link to="" className="text-sm hover:underline">
                Ulasan Pelanggan
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom border-t border-white mt-4 pt-2 text-center text-sm">
        <p>&copy; Central Java</p>
      </div>
    </footer>
  );
};

export default AdminFooter;

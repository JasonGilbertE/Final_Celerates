import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
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
          <h4 className="text-sm font-bold mb-2">Menu Utama</h4>
          <ul>
            <li>
              <a href="#" className="text-sm hover:underline">
                Produk Terbaru
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Produk Terpopuler
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Ulasan Pelanggan
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-category">
          <h4 className="text-sm font-bold mb-2">Kategori</h4>
          <ul>
            <li>
              <a href="#" className="text-sm hover:underline">
                Pakaian
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Makanan
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Kerajinan
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-settings">
          <h4 className="text-sm font-bold mb-2">Pengaturan</h4>
          <ul>
            <li>
              <a href="#" className="text-sm hover:underline">
                Pengaturan Akun
              </a>
            </li>
            <li>
              <Link to="./loyalitas" className="text-sm hover:underline">
                Loyalitas Pelanggan
              </Link>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Pusat Bantuan
              </a>
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

export default Footer;

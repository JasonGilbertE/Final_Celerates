import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Loyalitas = () => {
  const [royalty, setRoyalty] = useState({ level: "begginer", percent: 0, jumlah_transaksi: 0 });
  const [vouchers, setVouchers] = useState([]);
  
  useEffect(() => {
    const fetchRoyalty = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/royalties/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoyalty(response.data);
      } catch (error) {
        console.error("Error fetching royalty data:", error);
        alert("Gagal memuat data loyalitas. Silakan coba lagi.");
      }
    };

    const fetchVouchers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/vouchers/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Tambahkan properti `claimed` secara lokal
        const vouchersWithClaimed = response.data.data.map((voucher) => ({
          ...voucher,
          claimed: false, // Default belum diklaim
        }));

        setVouchers(vouchersWithClaimed);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        alert("Gagal memuat voucher. Silakan coba lagi.");
      }
    };

    fetchRoyalty();
    fetchVouchers();
  }, []);

  const showCode = (voucherId) => {
    // Tandai voucher sebagai diklaim
    setVouchers((prevVouchers) =>
      prevVouchers.map((voucher) =>
        voucher.id === voucherId ? { ...voucher, claimed: true } : voucher
      )
    );
  };

  const copyToClipboard = (voucherCode) => {
    navigator.clipboard.writeText(voucherCode).then(() => {
      alert("Kode voucher berhasil disalin!");
    });
  };

  return (
    <div className="bg-white text-gray-800">
      <Header />

      <main className="container mx-auto pt-24 py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Loyalitas</h1>

        <div className="flex flex-col lg:flex-row lg:space-x-6 mb-8">
          <div className="bg-[#444D5B] p-6 rounded-lg text-white flex flex-col justify-between w-full lg:w-1/3 h-[200px]">
            <div className="flex items-center space-x-4">
              <i className="fas fa-medal text-3xl text-gray-300"></i>
              <div>
                <h2 className="text-lg font-bold">{royalty.level}</h2>
                <p className="text-sm">{royalty.jumlah_transaksi}x transaksi</p>
              </div>
            </div>
            <div className="border-t border-gray-400 my-4"></div>
            {royalty.level !== "platinum" && (
              <>
                <p className="text-sm">
                  Selesaikan transaksi untuk menjadi{" "}
                  {royalty.level === "begginer" ? "Silver" : royalty.level === "silver" ? "Gold" : "Platinum"}
                </p>
                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${royalty.percent}%` }}></div>
                </div>
                <p className="mt-2 text-sm">Progres kamu: {Math.round(royalty.percent)}%</p>
              </>
            )}
            {royalty.level === "platinum" && (
              <>
                <p className="text-sm">Selamat! Kamu telah mencapai level tertinggi: Platinum</p>
                <div className="w-full bg-red-500 rounded-full h-2 mt-2"></div>
              </>
            )}
          </div>

          <div className="flex-1 overflow-x-auto flex space-x-4 py-4 lg:py-0">
          {vouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="p-6 rounded-lg flex flex-col justify-between items-center text-center flex-shrink-0"
              style={{
                width: "300px",
                height: "200px",
                backgroundColor: "#F7CDCF",
              }}
            >
              <h2 className="text-lg font-bold">
                Klaim Voucher <p>{voucher.name}</p>
              </h2>
              <p className="text-sm">
                Minimal belanja Rp. {voucher.min_expense.toLocaleString("id-ID")}
              </p>
              {!voucher.claimed ? (
                // Jika belum diklaim, tampilkan tombol Klaim
                <button
                  className="text-sm px-4 py-2 rounded mt-2"
                  style={{
                    width: "200px",
                    backgroundColor: "#C62E2E",
                    color: "white",
                  }}
                  onClick={() => showCode(voucher.id)}
                  disabled={voucher.remaining <= 0}
                >
                  Klaim
                </button>
              ) : (
                // Jika sudah diklaim, tampilkan kode voucher dan tombol Salin Kode
                <>
                  <p className="text-sm font-bold mt-2">{voucher.code}</p>
                  <button
                    onClick={() => copyToClipboard(voucher.code)}
                    className="mt-2 text-sm text-black underline"
                  >
                    Salin Kode
                  </button>
                </>
              )}
            </div>
          ))}
          </div>
        </div>

        <div className="flex justify-center items-center mb-8">
          <a className="text-black hover:underline" href="/home">
            Belanja lagi sekarang →
          </a>
        </div>

        <div className="space-y-6">
          <img
            alt="Banner 1"
            className="w-full rounded-lg"
            height="400"
            src="/assets/images/bannerloyalitas.png"
            width="1200"
          />
          <img
            alt="Banner 2"
            className="w-full rounded-lg"
            height="400"
            src="/assets/images/banner.png"
            width="1200"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Loyalitas;

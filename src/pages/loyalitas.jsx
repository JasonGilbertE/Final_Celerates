import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Loyalitas = () => {
  const [buttons, setButtons] = useState([
    { id: 1, text: "KLAIM", isDisabled: false, buttonColor: "#C62E2E", color: "white", voucher: "", minPrice: 40000 },
    { id: 2, text: "KLAIM", isDisabled: false, buttonColor: "#C62E2E", color: "white", voucher: "", minPrice: 50000 },
    { id: 3, text: "KLAIM", isDisabled: false, buttonColor: "#C62E2E", color: "white", voucher: "", minPrice: 60000 },
    { id: 4, text: "KLAIM", isDisabled: false, buttonColor: "#C62E2E", color: "white", voucher: "", minPrice: 70000 },
    { id: 5, text: "KLAIM", isDisabled: false, buttonColor: "#C62E2E", color: "white", voucher: "", minPrice: 80000 },
    { id: 6, text: "KLAIM", isDisabled: false, buttonColor: "#C62E2E", color: "white", voucher: "", minPrice: 100000 }
  ]);

  const voucherList = {
    DISKON10: { discountPercentage: 10, maxDiscount: 10000 },
    HEMAT20: { discountPercentage: 20, maxDiscount: 20000 },
    BELANJA30: { discountPercentage: 15, maxDiscount: 15000 },
    POTONGAN50: { discountPercentage: 50, maxDiscount: 50000 },
    SALE25: { discountPercentage: 25, maxDiscount: 25000 },
    HAPPYSHOP: { discountPercentage: 30, maxDiscount: 30000 }
  };

  const showCode = (id) => {
    const voucherCodes = Object.keys(voucherList);
    const randomVoucher = voucherCodes[Math.floor(Math.random() * voucherCodes.length)];
    
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id
          ? {
              ...button,
              text: randomVoucher,
              isDisabled: true,
              buttonColor: "#FFFFFF",
              color: "black",
              voucher: randomVoucher
            }
          : button
      )
    );
  };

  const copyToClipboard = (voucher) => {
    navigator.clipboard.writeText(voucher).then(() => {
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
                <h2 className="text-lg font-bold">Silver</h2>
                <p className="text-sm">3x transaksi</p>
              </div>
            </div>
            <div className="border-t border-gray-400 my-4"></div>
            <p className="text-sm">Selesaikan 5x transaksi untuk menjadi Gold</p>
            <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "60%" }}></div>
            </div>
            <p className="mt-2 text-sm">Kamu telah menyelesaikan 3x transaksi</p>
          </div>

          <div className="flex-1 overflow-x-auto flex space-x-4 py-4 lg:py-0">
            {buttons.map((button) => (
              <div
                key={button.id}
                className="p-6 rounded-lg flex flex-col justify-between items-center text-center flex-shrink-0"
                style={{
                  width: "300px", 
                  height: "200px", 
                  backgroundColor: "#F7CDCF"
                }}
              >
                <h2 className="text-lg font-bold">
                  Klaim Voucher <p>Gratis Ongkir</p>
                </h2>
                <p className="text-sm">
                  minimal belanja Rp. {button.minPrice.toLocaleString("id-ID")}
                </p>
                <button
                  className="text-sm px-4 py-2 rounded mt-2"
                  style={{
                    width: "200px",
                    backgroundColor: button.buttonColor,
                    color: button.color
                  }}
                  onClick={() => showCode(button.id)}
                  disabled={button.isDisabled}
                >
                  {button.text}
                </button>

                {/* Salin kode jika voucher tersedia */}
                {button.voucher && (
                  <button
                    onClick={() => copyToClipboard(button.voucher)}
                    className="mt-2 text-sm text-black underline"
                  >
                    Salin Kode
                  </button>
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
import React from "react";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

const Loyalitas = () => {
  const showCode = (button) => {
    button.target.innerText = "BVSKJDSJ";
    button.target.disabled = true;
    button.target.classList.remove("bg-red-500");
    button.target.classList.add("bg-gray-500");
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Header Section */}
      <Header /> 

      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        <h1 className="text-2xl font-bold mb-4">Loyalitas</h1>
        <div className="flex space-x-4 mb-8">
          <div className="bg-[#444D5B] p-4 rounded-lg" style={{ width: "300px", height: "150px" }}>
            <div className="flex items-center space-x-4">
              <i className="fas fa-medal text-2xl text-gray-300"></i>
              <div>
                <h2 className="text-base font-bold text-white">Silver</h2>
                <p className="text-xs text-white">3x transaksi</p>
              </div>
            </div>
            <div className="border-t border-gray-400 my-2"></div>
            <p className="mt-2 text-xs text-white whitespace-nowrap overflow-hidden overflow-ellipsis">Selesaikan 5x transaksi untuk menjadi Gold</p>
            <div className="w-full bg-gray-300 rounded-full h-1.5 mt-2">
              <div className="bg-red-500 h-1.5 rounded-full" style={{ width: "60%" }}></div>
            </div>
            <p className="mt-2 text-xs text-white">Kamu telah menyelesaikan 3x transaksi</p>
          </div>
          <div className="flex overflow-x-auto space-x-4">
            {[{ minBelanja: "50.000" }, { minBelanja: "60.000" }, { minBelanja: "70.000" }].map((item, index) => (
              <div key={index} className="bg-pink-100 p-4 rounded-lg flex flex-col justify-center items-center text-center flex-shrink-0" style={{ width: "300px", height: "150px" }}>
                <h2 className="text-base font-bold">Klaim Voucher Gratis Ongkir</h2>
                <p className="text-xs">minimal belanja Rp. {item.minBelanja}</p>
                <button className="bg-red-500 text-white px-4 py-2 rounded mt-2 text-xs" style={{ width: "200px" }} onClick={showCode}>
                  KLAIM
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mb-8">
          <a className="text-black hover:underline" href="#">
            Belanja lagi sekarang →
          </a>
        </div>
        <div className="mb-8">
          <img alt="Banner 1" className="w-full rounded-lg" height="400" src="public/assets/img_loyalitas/banner1.png" width="1200" />
        </div>
        <div>
          <img alt="Banner 2" className="w-full rounded-lg" height="400" src="public/assets/img_loyalitas/banner2.jpg" width="1200" />
        </div>
      </main>

      {/* Footer Section */}
      <Footer /> 
    </div>
  );
};

export default Loyalitas;
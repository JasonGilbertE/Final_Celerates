import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const Loyalitas = () => {
  const showCode = (event) => {
    const button = event.target;

    button.innerText = "BVSKJDSJ";
    button.disabled = true;

    button.classList.remove("bg-[#C62E2E]", "text-white");
    button.classList.add("bg-white", "text-black");
    console.log("Voucher claimed!");
  };

  return (
    <div className="bg-white text-gray-800">
      <Header />

      <main className="container pt-28 mx-auto py-8">
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

          <div className="w-full lg:w-2/3 pl-10">
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
              loop={false}
              autoplay={{ delay: 3000 }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="mb-8"
            >
              {[{ minBelanja: "50.000" }, { minBelanja: "60.000" }, { minBelanja: "70.000" }, { minBelanja: "100.000" }, { minBelanja: "80.000" }, { minBelanja: "120.000" }].map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-[#F7CDCF] p-9 rounded-lg flex flex-col justify-center items-center text-center">
                    <h2 className="text-base font-bold">Klaim Voucher Gratis Ongkir</h2>
                    <p className="text-xs">minimal belanja Rp. {item.minBelanja}</p>
                    <button className="bg-[#C62E2E] text-white px-4 py-2 rounded mt-2 font-bold text-xs" style={{ width: "200px" }} onClick={showCode}>
                      KLAIM
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="flex justify-center items-center mb-8">
          <a className="text-black hover:underline" href="/home">
            Belanja lagi sekarang →
          </a>
        </div>

        <div className="mb-8">
          <img alt="Banner 1" className="w-full rounded-lg" height="400" src="/assets/images/bannerloyalitas.png" width="1200" />
        </div>

        <div>
          <img alt="Banner 2" className="w-full rounded-lg" height="400" src="/assets/images/banner.png" width="1200" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Loyalitas;

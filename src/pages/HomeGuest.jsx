import React from "react";
import Footer from "../components/Footer";
import DiscountCard from "../components/DiscountCard";
import NewCard from "../components/NewCard";
import PopularCard from "../components/PopularCard";
import CustomerReviewCard from "../components/CustomerReviewCard";
import BannerBwh from "../components/BannerBwh";
import HeaderGuest from "../components/HeaderGuest";

const HomeGuest = () => {
  return (
    <div>
      <HeaderGuest />

      <main className="">
        <section className="main-content flex items-center bg-[#C62E2E] pb-8 mt-8 relative">
          <div className="welcome-text max-w-1/2">
            <h1 className="text-3xl text-white ml-8 mb-4">
              SELAMAT DATANG DI <span className="font-bold">CENTRAL JAVA!</span>
            </h1>
            <p className="text-white ml-8 mb-4">
              Temukan keunikan produk khas Jawa Tengah, dari batik, kerajinan tangan, hingga makanan tradisional. 
              Setiap produk membawa keaslian budaya dan kualitas terbaik dari pengrajin lokal. 
              Dukung produk lokal, rasakan autentiknya Jawa Tengah!
            </p>
            <button className="shop-button bg-[#f4b5b5] text-black ml-8 py-2 px-4 rounded">
              Belanja Sekarang
            </button>
          </div>
          <div className="image-section ml-auto">
            <img
              src="/assets/images/newbg.png"
              alt="Borobudur and Traditional Attire"
              className="max-w-full mr-5 mt-7 rounded-md"
            />
          </div>

          <div className="banner bg-[#F7CDCF] text-center p-4 rounded-lg w-[95%] absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <p className="text-xl text-black font-semibold">
              Oleh - Oleh Produk Khas Jawa Tengah
            </p>
          </div>
        </section>

        <section className="discount-products mb-8">
          <DiscountCard />
        </section>

        <section className="new-products mt-8">
          <div className="grid grid-cols-1">
            <NewCard />
          </div>
        </section>

        <section className="popular-products mt-8">
          <PopularCard />
        </section>

        <BannerBwh />

        <CustomerReviewCard />
      </main>

      <Footer />
    </div>
  );
};

export default HomeGuest;

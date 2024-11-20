import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FlashSaleCard from "../components/FlashSaleCard";
import ProductCard from "../components/ProductCard";
import PopularProductCard from "../components/PopularProductCard";
import CustomerReviewCard from "../components/CustomerReviewCard";

const Home = () => {
  return (
    <div>
      {/* Header Section */}
      <Header />

      <main className="">
        {/* Welcome Section */}
        <section className="main-content flex items-center bg-[#C62E2E] pb-8 mt-8 ">
          <div className="welcome-text max-w-1/2">
            <h1 className="text-3xl text-white ml-5 mb-4">SELAMAT DATANG DI <p> CENTRAL JAVA!</p></h1>
            <p className="text-white ml-5 mb-4">
              Temukan keunikan produk khas Jawa Tengah, dari batik, kerajinan <p>tangan, hingga makanan tradisional. Setiap produk membawa keaslian </p>
            <p>budaya dan kualitas terbaik dari pengrajin lokal. Dukung produk lokal,</p> rasakan autentiknya Jawa Tengah!
            </p>
            <button className="shop-button bg-[#f4b5b5] text-black ml-5 py-2 px-4 rounded">Belanja Sekarang</button>
          </div>
          {/* Gambar di sisi kanan */}
          <div className="image-section ml-auto">
            <img src="/assets/images/newbg.png" alt="Borobudur and Traditional Attire" className="max-w-full mr-5 mt-7 rounded-md" />
          </div>
        </section>

        {/* Banner Section */}
        <div className="banner bg-[#F7CDCF] text-center p-4 mt-4 rounded-lg">
          <p className="text-xl text-black">Oleh - Oleh Produk Khas Jawa Tengah</p>
        </div>

        {/* Flash Sale Section */}
        <section className="flash-sale-section mb-8">
          <FlashSaleCard />
        </section>

        {/* Popular Products Section */}
        <section className="popular-products mt-8">
          <h2 className="text-2xl font-bold mb-4">Produk Populer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <PopularProductCard
              image="/assets/images/wayang.png"
              title="Wayang Kulit Purwa"
              price="Rp. 120.000"
            />
            <PopularProductCard
              image="/assets/images/taskuning.jpeg"
              title="Tas Belanja"
              price="Rp. 45.000"
            />
            {/* Tambahkan lebih banyak PopularProductCard di sini */}
          </div>
        </section>

        {/* New Products Section */}
        <section className="new-products mt-8">
          <h2 className="text-2xl font-bold mb-4">Produk Baru</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ProductCard
              image="/assets/images/wayang.png"
              title="Wayang Kulit Purwa"
              price="Rp. 120.000"
              discountPrice="Rp. 200.000"
              isFlashSale={true}
            />
            <ProductCard
              image="/assets/images/taskuning.jpeg"
              title="Tas Belanja"
              price="Rp. 45.000"
              discountPrice={null}
              isFlashSale={false}
            />
            {/* Tambahkan lebih banyak ProductCard di sini */}
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="customer-reviews mt-8">
          <h2 className="text-2xl font-bold mb-4">Ulasan Pelanggan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <CustomerReviewCard
              reviewer="Andi Prasetyo"
              rating={4.5}
              review="Produk bagus, pengiriman cepat! Akan membeli lagi."
            />
            <CustomerReviewCard
              reviewer="Siti Nurhaliza"
              rating={5}
              review="Layanan sangat memuaskan, produk sesuai deskripsi."
            />
            {/* Tambahkan lebih banyak CustomerReviewCard di sini */}
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;

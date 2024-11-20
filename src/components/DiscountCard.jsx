import React from "react";

// Data produk diskon
const discountProducts = [
  {
    image: "/assets/images/wayang.png",
    title: "Wayang Kulit Purwa",
    rating: 5,
    discountPrice: "Rp. 120.000",
    originalPrice: "Rp. 200.000",
  },
  {
    image: "/assets/images/keranjangputih.jpeg",
    title: "Keranjang Rotan",
    rating: 4,
    discountPrice: "Rp. 15.000",
    originalPrice: "Rp. 25.000",
  },
  {
    image: "/assets/images/taskuning.jpeg",
    title: "Tas Belanja",
    rating: 3,
    discountPrice: "Rp. 45.000",
    originalPrice: "Rp. 60.000",
  },
  {
    image: "/assets/images/jamdinding.png",
    title: "Jam Kelapa",
    rating: 5,
    discountPrice: "Rp. 35.000",
    originalPrice: "Rp. 50.000",
  },
];

const DiscountCard = () => {
  return (
    <section className="discount-products mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-5">
        {discountProducts.map((product, index) => (
          <div
            key={index}
            className="product-cardrek bg-[#f9f9f9] border-4 border-[#C62E2E] rounded-lg shadow-md w-[300px] h-[465px] flex flex-col"
            style={{ minWidth: '300px', minHeight: '465px' }} // Tetapkan ukuran tetap pada kartu
          >
            {/* Gambar Produk */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[270px] object-cover rounded-t-lg" // Menggunakan w-full untuk responsif
            />

            {/* Informasi Produk */}
            <div className="product-infos p-4 flex flex-col justify-between h-[195px]">
              {/* Rating */}
              <div className="rating-lama flex items-center mb-4 mt-5 text-sm"> {/* Menambahkan margin bawah pada rating untuk menurunkan posisi */}
                {[...Array(5)].map((_, starIndex) => (
                  <i
                    key={starIndex}
                    className={`fas fa-star ${
                      starIndex < product.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  ></i>
                ))}
                <span className="ml-2 text-gray-700">(3)</span>
              </div>

              {/* Judul Produk - Menyelaraskan di tengah */}
              <h3 className="text-base font-semibold text-gray-800 mt-4 text-left">
                {product.title}
              </h3>

              {/* Harga Diskon dan Asli (bersebelahan kiri-kanan) */}
              <div className="price flex justify-between mt-auto">
                <span className="discount-price text-lg font-bold text-[#C62E2E]">
                  {product.discountPrice}
                </span>
                <span className="original-price text-lg line-through text-gray-500">
                  {product.originalPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscountCard;

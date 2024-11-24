import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules"; 
import { Link } from "react-router-dom"; // Import Link untuk navigasi
import ReviewData from "../services/ReviewData";

const CustomerReviewCard = () => {
  return (
    <section className="customer-reviews pl-5 pr-8 mt-8">
      {/* Header dengan Judul dan Link */}
      <div className="popular-header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-left">Ulasan Pelanggan</h2>
        <Link
          to="/all-reviews" // Pastikan route ini sesuai dengan App.jsx
          className="see-all text-sm font-bold text-[#000000] hover:text-red-800"
        >
          Lihat Semua &gt;
        </Link>
      </div>

      {/* Swiper Slider untuk Review */}
      <Swiper
        modules={[Pagination]} 
        spaceBetween={20}
        slidesPerView={1} 
        loop={false}
        pagination={false} 
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-16"
      >
        {ReviewData.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="review-card bg-white p-4 shadow-md rounded-lg border-4 border-red-500 h-auto min-h-[250px] flex flex-col justify-between">
              <div>
                {/* Header Card Review */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <img
                      src={review.profileImage}
                      alt={`${review.reviewer} profile`}
                      className="w-12 h-12 rounded-full mr-4 border border-gray-300"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{review.reviewer}</h3>
                      <div className="text-yellow-500">
                        {"⭐".repeat(Math.floor(review.rating))}{" "}
                        {review.rating % 1 !== 0 ? "⭐" : ""}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-xl font-semibold">
                    {review.rating}
                  </p>
                </div>
                {/* Isi Review */}
                <p className="text-gray-600">{review.review}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomerReviewCard;

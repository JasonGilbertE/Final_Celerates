import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import DiscountData from "../services/DiscountData";

const DiscountCard = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [maxCards, setMaxCards] = useState(8); // Batas awal jumlah kartu

  useEffect(() => {
    const countdownDate = new Date().getTime() + 60 * 60 * 1000;

    const countdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = countdownDate - now;

      if (timeRemaining <= 0) {
        clearInterval(countdownTimer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  const increaseMaxCards = () => setMaxCards((prev) => prev + 4); // Tambah 4 kartu
  const decreaseMaxCards = () => setMaxCards((prev) => Math.max(prev - 4, 4)); // Kurangi 4 kartu

  return (
    <section className="discount-products mt-10">
      <div className="flash-sale-card text-left ml-5 mb-7 mt-20 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-black-600">Flash Sale</h2>

            <div className="countdown-container flex items-center space-x-2 ml-4">
              <span className="bg-[#F7CDCF] text-black font-bold px-4 py-2 rounded-md">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-xl">:</span>
              <span className="bg-[#F7CDCF] text-black font-bold px-4 py-2 rounded-md">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-xl">:</span>
              <span className="bg-[#F7CDCF] text-black font-bold px-4 py-2 rounded-md">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        loop={false}
        autoplay={{ delay: 2500 }}
      >
        {DiscountData.slice(0, maxCards).map((product, index) => (
          <SwiperSlide key={index}>
            <div
              className="product-cardrek bg-[#f9f9f9] border-4 border-[#C62E2E] rounded-lg shadow-md flex flex-col mx-auto"
              style={{ maxWidth: "300px", maxHeight: "465px" }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[270px] object-cover rounded-t-lg"
              />

              <div className="product-infos p-4 flex flex-col justify-between">
                <div className="rating-lama flex items-center mb-4 mt-5 text-base">
                  {[...Array(5)].map((_, starIndex) => (
                    <i
                      key={starIndex}
                      className={`fas fa-star ${
                        starIndex < product.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    ></i>
                  ))}
                  <span className="ml-2 text-gray-700">({product.rating})</span>
                </div>

                <h3 className="text-base font-semibold text-gray-800 mt-4 text-left">
                  {product.title}
                </h3>

                <div className="price flex justify-between mt-auto">
                  {timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
                    <>
                      <span className="discount-price text-lg font-bold text-[#C62E2E]">
                        {product.discountPrice}
                      </span>
                      <span className="original-price text-lg line-through text-gray-500">
                        {product.originalPrice}
                      </span>
                    </>
                  ) : (
                    <span className="original-price text-lg font-bold text-[#C62E2E]">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default DiscountCard;

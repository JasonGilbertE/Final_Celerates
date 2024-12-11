import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const DiscountCard = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [maxCards, setMaxCards] = useState(8); // Initial card limit
  const [flashSales, setFlashSales] = useState([]); // To store flash sale products
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch flash sale data from the API
  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/flashsales/active");
        const data = await response.json();
        setFlashSales(data); // Update flashSales state with the fetched data
      } catch (error) {
        console.error("Error fetching flash sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSales();
  }, []);

  // Countdown timer logic
  useEffect(() => {

    const countdownDate = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now

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

  const increaseMaxCards = () => setMaxCards((prev) => prev + 4); // Add 4 more cards
  const decreaseMaxCards = () => setMaxCards((prev) => Math.max(prev - 4, 4)); // Remove 4 cards

  const formatPrice = (price) => new Intl.NumberFormat().format(price);
  const countTimeleft = (end_time) => {
    const end = new Date(end_time).getTime();
    const now = new Date().getTime();
    const timeRemaining = end - now;

    if (timeRemaining <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    } else {
      const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      return { hours, minutes, seconds };
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!flashSales.length) {
    return;
  }
  return (
    <section className="discount-products mt-10">
      <div className="flash-sale-card text-left ml-5 mb-7 mt-20 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-black-600">Flash Sale</h2>
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
        {flashSales.slice(0, maxCards).map((sale) => (
          <SwiperSlide key={sale.id}>
            <Link to={`/productdetail/${sale.item_id}`} className="block">
              <div className="product-cardrek border-4 border-[#C62E2E] rounded-lg shadow-md flex flex-col mx-auto" style={{ maxWidth: "300px", maxHeight: "450px" }}>
                <img
                  src={`http://localhost:3000/${sale.item.images[0]?.url}`}
                  alt={sale.item.name}
                  className="w-full h-[270px] object-cover rounded-t-lg"
                />
                
                <div className="product-infos p-4 flex flex-col justify-between">
                  
                  {/* berakhir pada sale.end_time*/}
                  <div className="countdown flex items-center justify-between">
                    <span className="text-lg font-bold text-[#C62E2E]">Berakhir dalam</span>
                    <span className="text-lg font-bold bg-[#C62E2E] text-white">
                      {countTimeleft(sale.end_time).hours}:
                      {countTimeleft(sale.end_time).minutes}:
                      {countTimeleft(sale.end_time).seconds}
                    </span>
                  </div>
                  <div className="rating-lama flex items-center mb-4 mt-5 text-base">
                    {[...Array(5)].map((_, starIndex) => (
                      <i
                        key={starIndex}
                        className={`fas fa-star ${starIndex < sale.item.rating ? "text-yellow-400" : "text-gray-300"}`}
                      ></i>
                    ))}
                    <span className="ml-2 text-gray-700">({sale.item.rating})</span>
                  </div>

                  <h3 className="text-base font-semibold text-gray-800 text-left">{sale.item.name}</h3>

                  <div className="price flex justify-between mt-auto">
                    {sale.end_time > new Date().toISOString() ? (
                      <>
                        <span className="discount-price text-lg font-bold text-[#C62E2E]">Rp. {formatPrice(sale.flash_price)}</span>
                        <span className="original-price text-lg line-through text-gray-500">Rp. {formatPrice(sale.item.price)}</span>
                      </>
                    ) : (
                      <span className="original-price text-lg font-bold text-[#C62E2E]">Rp. {formatPrice(sale.item.price)}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default DiscountCard;

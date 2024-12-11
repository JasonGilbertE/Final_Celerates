import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "axios";

const CustomerReviewCard = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ratings?take=5", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.status === "success") {
          setReviews(response.data.data.ratings);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return (
      <p className="text-center">
        No reviews found. <Link className="font-semibold text-blue-600" to="/all-reviews">Add a review</Link>
      </p>
    );
  }

  return (
    <section className="customer-reviews pl-5 pr-8 mt-8">
      <div className="popular-header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-left">Ulasan Pelanggan</h2>
        <Link
          to="/all-reviews"
          className="see-all text-sm font-bold text-[#000000] hover:text-red-800"
        >
          Lihat Semua &gt;
        </Link>
      </div>

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
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="review-card bg-white p-4 shadow-md rounded-lg border-4 border-[#C62E2E] h-auto min-h-[250px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <img
                      src={review.profile_image}
                      alt={`${review.nama} profile`}
                      className="w-12 h-12 rounded-full mr-4 border border-gray-300"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{review.name}</h3>
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
                <p className="text-gray-600">{review.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomerReviewCard;

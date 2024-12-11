import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReviewItem = () => {
  // last segment of the URL
  const { id } = useParams();
  const [ratingsData, setRatingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null); // State untuk filter rating

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://localhost:3000/api/ratings/get/${id}`,
          { rating: filter }, // Data dikirimkan dalam body
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Pastikan header ini disertakan
            },
          }
        );
        setRatingsData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [id, filter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleFilter = (rating) => {
    setFilter(rating === filter ? null : rating); // Toggle filter
  };

  return (
    <div>
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-red-600 text-xl font-bold">
            {ratingsData.item_rating}
          </span>
          <button
            onClick={() => handleFilter(null)}
            className={`border border-red-600 px-2 py-1 rounded-md text-sm ${
              filter === null ? "bg-red-600 text-white" : "text-red-600"
            }`}
          >
            Semua
          </button>
          {Object.entries(ratingsData.rating_count).map(([star, count]) => (
            <button
              key={star}
              onClick={() => handleFilter(Number(star))}
              className={`border border-red-600 px-2 py-1 rounded-md text-sm ${
                filter === Number(star) ? "bg-red-600 text-white" : "text-red-600"
              }`}
            >
              Bintang {star} ({count})
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {ratingsData.ratings.map((rating) => (
          <div key={rating.id} className="border border-red-600 p-4 rounded-md">
            <div className="flex items-center">
              <img
                alt={rating.name}
                className="w-12 h-12 rounded-full"
                height="50"
                src={rating.profile_image}
                width="50"
              />
              <div className="ml-4">
                <h3 className="font-bold">{rating.name}</h3>
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: rating.rating }, (_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <span className="text-gray-600">{rating.rating}</span>
              </div>
            </div>
            <p className="mt-4">{rating.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewItem;

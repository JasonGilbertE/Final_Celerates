// src/components/CustomerReviewCard.jsx
import React from "react";

const CustomerReviewCard = ({ reviewer, rating, review }) => {
  return (
    <div className="review-card bg-white p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-sm">
      <div className="review-header flex items-center">
        <div className="profile-img mr-4">
          {/* Gambar profil reviewer (bisa diganti dengan avatar atau gambar) */}
          <img src="https://via.placeholder.com/50" alt="Profile" className="w-12 h-12 rounded-full" />
        </div>
        <div className="review-info">
          <h3 className="text-lg font-semibold">{reviewer}</h3>
          <div className="rating flex items-center">
            {/* Menampilkan rating menggunakan icon bintang */}
            {Array.from({ length: 5 }).map((_, index) => (
              <i
                key={index}
                className={`fas fa-star ${index < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">{rating}</span>
          </div>
        </div>
      </div>
      <p className="review-text mt-2 text-sm text-gray-700">{review}</p>
    </div>
  );
};

export default CustomerReviewCard;

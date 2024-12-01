import React from "react";
import { Link } from "react-router-dom"; // Import Link untuk navigasi

const Card = ({ id, img, alt, title, price, rating, isNew }) => {
  console.log("Navigating to /productdetail/" + id);
  return (
    <Link to={"/productdetail/${id}/"} className="block">
      <div className="border-4 border-red-700 rounded relative w-300 h-450 flex flex-col">
        <img src={img} alt={alt} className="w-full h-[270px] object-cover rounded-t" />

        {isNew && <span className="bg-red-700 text-white px-2 py-1 rounded text-xs absolute top-2 left-2">TERBARU</span>}

        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              {[...Array(rating)].map((_, i) => (
                <i key={i} className="mt-2 fas fa-star text-yellow-500"></i>
              ))}
              <span className="mt-1 ml-1 text-base">({rating})</span>
            </div>
          </div>

          <h3 className="font-bold mt-3 mb-6 text-base">{title}</h3>

          <p className="text-red-700 font-bold text-lg absolute bottom-4">{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;

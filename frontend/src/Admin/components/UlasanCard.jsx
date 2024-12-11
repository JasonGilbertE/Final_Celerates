import React, { useState, useRef, useEffect } from "react";

const UlasanCard = ({ review, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white border-4 border-[#C62E2E] my-4 rounded-md px-4 py-4 shadow-sm flex flex-col justify-between w-[400px] h-[230px] relative">
      <div className="absolute top-2 right-2">
        <button
          ref={buttonRef}
          className="text-white text-xl bg-[#C62E2E] pb-3 rounded-lg w-8 h-8 flex items-center justify-center"
          onClick={toggleDropdown}
        >
          ...
        </button>

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 bg-[#C62E2E] border shadow-lg rounded-lg z-10"
          >
            <button
              className="block w-full px-4 py-2 text-sm text-white text-left"
              onClick={() => onDelete(review.id)}
            >
              Hapus
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={review.imageUrl}
          alt={`Profile of ${review.name}`}
        />
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{review.name}</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <i
                  key={index}
                  className={`fas fa-star ${
                    index < review.rating ? "text-yellow-400" : "text-gray-300"
                  } mr-1`}
                />
              ))}
            </div>
            <span className="font-medium">{review.rating}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{review.reviewText}</p>
    </div>
  );
};

export default UlasanCard;

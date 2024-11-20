import React, { useState, useEffect } from "react";

const FlashSaleCard = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const countdownDate = new Date().getTime() + 60 * 60 * 1000; // Flash sale berakhir dalam 60 menit

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

    return () => clearInterval(countdownTimer); // Cleanup interval saat komponen dibersihkan
  }, []);

  return (
    <div className="flash-sale-card text-center w-full">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Flash Sale</h2>
      <p className="text-lg text-gray-700">Berakhir dalam</p>
      <div className="countdown flex justify-center mt-2 space-x-2">
        <span className="bg-pink-200 text-black font-bold px-4 py-2 rounded-md">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-xl">:</span>
        <span className="bg-pink-200 text-black font-bold px-4 py-2 rounded-md">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-xl">:</span>
        <span className="bg-pink-200 text-black font-bold px-4 py-2 rounded-md">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
      <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md">
        Beli Sekarang
      </button>
    </div>
  );
};

export default FlashSaleCard;

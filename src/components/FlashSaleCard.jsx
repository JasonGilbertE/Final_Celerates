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

    return () => clearInterval(countdownTimer);
  }, []);

  return (
    <div className="flash-sale-card text-left ml-5 mt-20 w-full">
      {/* Flash Sale Countdown */}
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-black-600">Flash Sale</h2>
        <div className="countdown-container flex items-center space-x-2">
          <p className="text-lg text-gray-700">Berakhir dalam</p>
          <div className="countdown flex items-center space-x-2">
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
  );
};

export default FlashSaleCard;

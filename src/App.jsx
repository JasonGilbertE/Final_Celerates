import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rating from "./pages/Rating"; // Import halaman Rating
import DiscountCard from "./components/DiscountCard";
import HomeGuest from "./pages/HomeGuest";

const App = () => {
  const [isFlashSaleActive, setIsFlashSaleActive] = useState(true); 

  return (
    <Router>
      <Routes>
        {/* Halaman Home Guest (Landing Page) */}
        <Route path="/" element={<HomeGuest />} />

        {/* Halaman Home */}
        <Route path="/home" element={<Home />} />
        
        {/* Halaman Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Halaman Register */}
        <Route path="/register" element={<Register />} />

        {/* Halaman Rating */}
        <Route path="/all-reviews" element={<Rating />} />

        {/* Contoh penggunaan DiscountCard, jika ingin menampilkannya */}
        {/* <Route path="/discount" element={<DiscountCard />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

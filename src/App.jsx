import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loyalitas from "./pages/Loyalitas";  // Updated import path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/register" element={<Register />} />
        <Route path="/loyalitas" element={<Loyalitas />} /> {/* Loyalitas route */}
      </Routes>
    </Router>
  );
};

export default App;

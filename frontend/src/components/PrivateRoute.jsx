import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children, admin }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // Menyimpan status otorisasi
  const role = localStorage.getItem("role");

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/check", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          // Cek apakah role sesuai
          if (admin && role !== "admin") {
            setIsAuthorized(false);
          } else if (!admin && role !== "user") {
            setIsAuthorized(false);
          } else {
            if (!response.data.user.is_admin && admin) {
              setIsAuthorized(false);
            } else {
              setIsAuthorized(true);
            }
          }
        } else {
          // Jika status tidak 200, logout dan arahkan ke login
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          setIsAuthorized(false);
        }
      } catch (err) {
        // Tangani kesalahan, misalnya token kadaluarsa
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, [role, admin]);

  // Saat status otorisasi sedang diproses, render loading atau nada yang sesuai
  if (isAuthorized === null) {
    return <div>Loading...</div>; // Atau bisa menggunakan spinner atau komponen loading
  }

  // Jika tidak diotorisasi, arahkan ke login
  if (isAuthorized === false) {
    return <Navigate to="/login" />;
  }

  // Jika diotorisasi, render anak komponennya
  return children;
};

export default PrivateRoute;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RatingCard from "../components/RatingCard";

const Rating = () => {
  const bearerToken = localStorage.getItem("token");
  const [reviews, setReviews] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newReview, setNewReview] = useState({
    item_id: "",
    rating: 0,
    desc: "",
    profile_image: "",
  });
  const [items, setItems] = useState([]);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ratings", {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        setReviews(response.data.data.ratings);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [bearerToken]);

  // Fetch buyed items for dropdown
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ratings/buyed-item", {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        setItems(response.data.data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [bearerToken]);

  // Handle form toggle
  const toggleForm = () => setIsFormVisible(!isFormVisible);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReview({ ...newReview, profile_image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new review
  const addReview = async () => {
    if (newReview.item_id && newReview.rating && newReview.desc) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/ratings",
          {
            item_id: newReview.item_id,
            rating: newReview.rating,
            desc: newReview.desc,
          },
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        window.location.reload();
      } catch (error) {
        alert(error.response.data.message);
        console.error("Error adding review:", error);
      }
    } else {
      alert("Mohon isi semua data ulasan.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-14 py-8">
        <h1 className="text-3xl font-semibold text-left my-4 border-b border-gray-300 pb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 text-gray-700"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          Ulasan Pelanggan
        </h1>

        {isFormVisible && (
          <div className="mt-8 bg-gray-100 p-6 px-8 rounded-lg shadow-md max-w-full mx-auto mb-8 border border-gray-300 relative">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
              onClick={() => setIsFormVisible(false)}
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">Tambah Ulasan</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Item</label>
              <select
                name="item_id"
                value={newReview.item_id}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                <option value="">Pilih item...</option>
                {items.map((item) => (
                  <option key={item.item_id} value={item.item_id}>
                    {item.item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <input
                type="number"
                name="rating"
                value={newReview.rating}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Masukkan rating (1-5)"
                min="1"
                max="5"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea
                name="desc"
                value={newReview.desc}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                rows="4"
                placeholder="Tuliskan ulasan Anda"
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-white border border-[#C62E2E] text-[#C62E2E] py-2 px-6 rounded-md hover:bg-[#C62E2E] hover:text-white transition-colors"
                onClick={addReview}
              >
                Simpan Ulasan
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <RatingCard key={index} review={review} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="bg-[#C62E2E] text-white font-semibold py-2 px-4 rounded-md w-full sm:w-auto h-[40px] hover:bg-red-600 transition-colors"
            onClick={() => {
              setIsFormVisible(isFormVisible ? false : true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Tambah Ulasan
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rating;

import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import Sidebar from '../components/Sidebar';
import UlasanCard from '../components/UlasanCard';  
import ulasanData from '../services/UlasanData'; 

const UlasanAdmin = () => {
  const [reviews, setReviews] = useState(ulasanData);
  const [showDropdown, setShowDropdown] = useState(null);  

  const handleDelete = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const toggleDropdown = (id) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />

      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar /> 

          <div className="w-3/4">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2">Penilaian Pelanggan</h2>
            <div className="grid grid-cols-2 gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="relative">
                  <UlasanCard review={review} />

                  <div className="absolute top-6 right-7">
                    <button 
                      className="flex items-center justify-center text-3xl pb-5 text-white bg-[#C62E2E] rounded-lg w-8 h-8"
                      onClick={() => toggleDropdown(review.id)}  >
                      ...
                    </button>

                    {showDropdown === review.id && (
                      <div className="absolute right-0 bg-[#C62E2E] border-2 border-gray-200 shadow-lg rounded mt-1">
                        <button 
                          onClick={() => handleDelete(review.id)} 
                          className="block px-4 py-2 text-sm text-white">
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default UlasanAdmin;

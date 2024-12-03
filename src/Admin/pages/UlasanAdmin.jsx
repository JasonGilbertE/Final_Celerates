import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import Sidebar from '../components/Sidebar';
import UlasanCard from '../components/UlasanCard';  
import ulasanData from '../services/UlasanData'; 

const UlasanAdmin = () => {
  const [reviews, setReviews] = useState(ulasanData);

  const handleDelete = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />

      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar /> 

          <div className="w-3/4">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-300">Penilaian Pelanggan</h2>
            <div className="grid grid-cols-2">
              {reviews.map((review) => (
                <div key={review.id} className="relative">
                  <UlasanCard 
                    review={review} 
                    onDelete={handleDelete} 
                  />
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

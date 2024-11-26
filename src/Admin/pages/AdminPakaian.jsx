import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Sidebar from "../components/Sidebar";
import ACardPakaian from "../components/ACardPakaian";
import ADataPakaian from "../services/ADataPakaian";
import { Link } from "react-router-dom"; 

const AdminPakaian = () => {
  const [products, setProducts] = useState(ADataPakaian);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />

      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar />

          <div className="w-3/4">
            <div className="flex justify-between items-center mb-6 border-b border-gray-600 pb-2">
              <h2 className="text-2xl font-bold">
                Kategori Produk
              </h2>
              <Link
                to="/admin/tambah-produk" 
                className="flex items-center bg-[#C62E2E] text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                <span className="mr-2">+</span> Tambah Kategori
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <ACardPakaian
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default AdminPakaian;

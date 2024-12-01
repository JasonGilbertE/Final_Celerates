import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  return (
    <aside className="w-1/4 pr-4">
      <div className="flex flex-col space-y-2 mb-4">
        <h3 className="bg-red-200 py-2 px-4 font-bold">Kategori</h3>
        <Link to="/kerajinan" className={`bg-red-200 block py-2 px-4 btn-red-pale rounded hover:bg-gray-200 w-full text-left ${activeCategory === "kerajinan" ? "bg-red-700 text-white" : ""}`} onClick={() => setActiveCategory("kerajinan")}>
          Kerajinan
        </Link>
        <Link to="/makanan" className={`bg-red-200 block py-2 px-4 btn-red-pale rounded hover:bg-gray-200 w-full text-left ${activeCategory === "makanan" ? "bg-red-700 text-white" : ""}`} onClick={() => setActiveCategory("makanan")}>
          Makanan
        </Link>
        <Link to="/pakaian" className={`bg-red-200 block py-2 px-4 btn-red-pale rounded hover:bg-gray-200 w-full text-left ${activeCategory === "pakaian" ? "bg-red-700 text-white" : ""}`} onClick={() => setActiveCategory("pakaian")}>
          Pakaian
        </Link>
      </div>
      <div className="bg-red-700 text-white p-4 rounded flex items-center justify-center">
        <img src="public/assets/images/banner5.png" alt="Promotional" className="mb-4 rounded" />
      </div>
    </aside>
  );
};

export default Sidebar;

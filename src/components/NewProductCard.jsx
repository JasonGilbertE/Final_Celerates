import React from "react";
import NewProductCard from "./NewProductCard"; // Import NewProductCard

const NewProducts = () => {
  const newProducts = [
    {
      image: "/assets/images/tasrotan.png",
      title: "Sling bag Anyaman Rotan Handmade",
      rating: 5,
      discountPrice: "Rp. 150.000",
      originalPrice: "Rp. 200.000",
    },
    {
      image: "/assets/images/tembagakuning.png",
      title: "Kerajinan Ukiran Tembaga dan Kuningan",
      rating: 3,
      discountPrice: "Rp. 250.000",
      originalPrice: "Rp. 300.000",
    },
    {
      image: "/assets/images/claypot.png",
      title: "Kerajinan Gerabah",
      rating: 3,
      discountPrice: "Rp. 100.000",
      originalPrice: "Rp. 150.000",
    },
    {
      image: "/assets/images/topeng.png",
      title: "Gantungan kunci topeng",
      rating: 4,
      discountPrice: "Rp. 17.000",
      originalPrice: "Rp. 20.000",
    },
    // Add more products as needed...
  ];

  return (
    <section className="new-products mt-10">
      <div className="newproduct-header flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Produk Terbaru</h2>
        <a href="#" className="text-sm text-black hover:text-[#C62E2E]">Lihat Semua </a>
      </div>
      <div className="category-tabs mb-4">
        <ul className="tab-menu flex justify-center gap-12">
          <li className="tab-item text-sm font-semibold">Popular</li>
          <li className="tab-item text-sm">Pakaian</li>
          <li className="tab-item text-sm">Makanan</li>
          <li className="tab-item text-sm">Kerajinan</li>
        </ul>
      </div>

      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newProducts.map((product, index) => (
          <NewProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default NewProducts;

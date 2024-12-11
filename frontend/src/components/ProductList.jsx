import React from "react";
import ProductData from "../services/ProductData"; // Pastikan path sesuai
import KategoriCard from "../components/KategoriCard"; // Pastikan path ke komponen Card sesuai

const ProductList = () => {
  return (
    <div>
      {ProductData.map((product) => (
        <Card
          key={product.id} // Pastikan key ini ada
          id={product.id} // Pastikan id dikirim
          img={product.img}
          alt={product.alt}
          title={product.title}
          price={product.price}
          rating={product.rating}
          isNew={product.isNew}
        />
      ))}
    </div>
  );
};

export default ProductList;

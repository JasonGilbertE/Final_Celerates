import { useState, useEffect } from "react";
import getAllProducts from "../../services/getAllProducts";
import CardList from "../../components/CardList/CardList";
import Navbar from "../components/Navbar/Navbar";
import RadioButton from "../../components/RadioButton/RadioButton";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let allProducts = getAllProducts();
    allProducts = allProducts.length > 0 ? allProducts : [];
    // allProducts = []
    setProducts(allProducts);
  }, []);

  const RadioButtonOpts = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Men's Shoes",
      value: "menshoes",
    },
    {
      label: "Women's Shoes",
      value: "womenshoes",
    },
  ];

  return (
    <>
      <Navbar></Navbar>
      <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
        <h3 className="font-medium">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          <RadioButton options={RadioButtonOpts} defaultValue={"all"} />
        </div>
      </div>
      <section className="container px-24 py-4">
        <main className="grid grid-cols-4 gap-4">
          <CardList products={products} />
        </main>
      </section>
    </>
  );
}

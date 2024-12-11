import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NewCard() {
  const [activeTab, setActiveTab] = useState("popular");
  const [products, setProducts] = useState([]); // Store the fetched products
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch products based on the tab filter
  const fetchProducts = async (filter) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/items?${filter}`);
      const data = await response.json();
      console.log("Fetched Products:", data); // Debug API response
      setProducts(data); // Update the products state
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "popular") {
      fetchProducts("filterBy=popular&take=10"); // Fetch popular products
    } else if (activeTab === "pakaian") {
      fetchProducts("categoryId=1"); // Fetch products for pakaian
    } else if (activeTab === "makanan") {
      fetchProducts("categoryId=2"); // Fetch products for makanan
    } else if (activeTab === "kerajinan") {
      fetchProducts("categoryId=3"); // Fetch products for kerajinan
    }
  }, [activeTab]); // Refetch when tab changes

  const formatPrice = (price) => new Intl.NumberFormat().format(price);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="new-products px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-xl mt-10">
      <div className="newproduct-header flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Produk Terbaru</h2>
        <Link to="/terbaru" className="see-allss text-sm font-bold text-black hover:text-red-600 ml-auto">
          Lihat Semua &gt;
        </Link>
      </div>

      {/* Tab Menu */}
      <div className="category-tabs flex justify-center text-base sm:text-lg mb-6">
        <ul className="tab-menu flex justify-between w-full max-w-6xl">
          <li
            onClick={() => handleTabClick("popular")}
            className={`tab-item text-center cursor-pointer ${
              activeTab === "popular" ? "text-black border-b-4 border-black" : "text-gray-400"
            }`}
          >
            Populer
          </li>
          <li
            onClick={() => handleTabClick("pakaian")}
            className={`tab-item text-center cursor-pointer ${
              activeTab === "pakaian" ? "text-black border-b-4 border-black" : "text-gray-400"
            }`}
          >
            Pakaian
          </li>
          <li
            onClick={() => handleTabClick("makanan")}
            className={`tab-item text-center cursor-pointer ${
              activeTab === "makanan" ? "text-black border-b-4 border-black" : "text-gray-400"
            }`}
          >
            Makanan
          </li>
          <li
            onClick={() => handleTabClick("kerajinan")}
            className={`tab-item text-center cursor-pointer ${
              activeTab === "kerajinan" ? "text-black border-b-4 border-black" : "text-gray-400"
            }`}
          >
            Kerajinan
          </li>
        </ul>
      </div>

      {/* Produk Grid */}
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ml-10">
        {products.map((product) => (
          <Link to={`/productdetail/${product.id}`} key={product.id} className="block">
            <div className="product-card bg-white border-4 border-[#C62E2E] rounded-lg shadow-lg overflow-hidden relative w-[300px] h-[450px]">
              <span className="label absolute top-2 left-2 bg-[#C62E2E] text-white text-xs py-1 px-2 rounded-lg">TERBARU</span>
              <img
                src={product.images && product.images[0] ? `http://localhost:3000/${product.images[0].url}` : "/default-image.png"}
                alt={product.alt || "No image available"}
                className="w-full h-64 object-cover"
              />
              <div className="product-info p-4 flex flex-col justify-between h-36">
                <div>
                  <div className="rating flex items-center gap-1">
                    {[...Array(Math.min(Math.max(Math.round(product.rating) || 0, 0), 5))].map((_, i) => (
                      <i key={i} className="fas fa-star text-yellow-400"></i>
                    ))}
                    {[...Array(5 - Math.min(Math.max(Math.round(product.rating) || 0, 0), 5))].map((_, i) => (
                      <i key={i} className="fas fa-star text-gray-300"></i>
                    ))}
                    <span className="text-sm text-gray-700">({product.rating || 0})</span>
                  </div>
                  <h6 className="text-lg font-semibold text-gray-800 mt-2">{product.name || "Nama produk tidak tersedia"}</h6>
                </div>
                <div className="price-cart-row text-left mt-8 mb-2">
                  <p className="pricez text-[#C62E2E] font-bold text-lg">Rp. {product.price ? formatPrice(product.price) : "Harga tidak tersedia"}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {products.length === 0 && !loading && <p className="text-center w-full block my-5">Tidak ada produk yang ditemukan.</p>}
      {loading && <p className="text-center w-full block my-5">Loading...</p>}
    </section>
  );
}

export default NewCard;

import { useEffect, useState } from 'react';
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Sidebar from "../components/Sidebar";
import ACardProduct from "../components/ACardProduct";

const AdminKerajinan = () => {
  const [products, setProducts] = useState([]); // State untuk menyimpan data produk
  const [loading, setLoading] = useState(true); // State untuk loading status
  const [error, setError] = useState(null); // State untuk error handling

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan. Silakan login.");
        }

        const response = await fetch("http://localhost:3000/api/items?categoryId=3", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal mengambil data produk.");
        }

        const data = await response.json();
        setProducts(data); // Asumsikan data API memiliki properti `products`
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Matikan loading setelah API dipanggil
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const newProducts = products.filter((item) => item.id !== id);
    setProducts(newProducts);
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <AdminHeader />

      <main className='flex-grow mt-20 bg-gray-50 py-8'>
        <div className='container mx-auto px-4 flex'>
          <Sidebar />

          <div className='w-3/4 ml-8'>
            <h2 className='text-2xl font-bold border-b border-gray-300 pb-2 mb-6'>
              Kategori produk: Kerajinan
            </h2>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className='text-red-500'>Error: {error}</p>
            ) : products.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {products.map(item => (
                  <ACardProduct key={item.id} product={item} onDelete={handleDelete}/>
                ))}
              </div>
            ) : (
              <p>Tidak ada produk yang tersedia.</p>
            )}
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default AdminKerajinan;

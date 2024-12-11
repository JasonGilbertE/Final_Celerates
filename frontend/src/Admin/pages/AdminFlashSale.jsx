import { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader'; 
import AdminFooter from '../components/AdminFooter'; 
import Sidebar from '../components/Sidebar'; 

const AdminFlashSale = () => {
  const [formData, setFormData] = useState({
    item_id: '',
    flash_price: '',
    start_time: '',
    end_time: '',
  });

  const [items, setItems] = useState([]); // State untuk daftar item
  const [loading, setLoading] = useState(false); // State untuk loading

  // Fetch daftar item dari API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/items'); // Ganti URL sesuai endpoint Anda
        if (!response.ok) throw new Error('Failed to fetch items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };

    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/flashsales', { // Ganti URL sesuai endpoint Anda
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create flash sale');
      }

      const data = await response.json();
      alert('Flash Sale berhasil ditambahkan!');
      setFormData({
        item_id: '',
        flash_price: '',
        start_time: '',
        end_time: '',
      });
    } catch (error) {
      console.error('Error creating flash sale:', error.message);
      alert('Gagal menambahkan Flash Sale!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />

      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar />

          <div className="w-3/4 ml-8">
            <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
              <h2 className="text-2xl font-bold">Tambah Flash Sale</h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
              <div className="mb-4">
                <label htmlFor="item_id" className="block text-gray-700">Pilih Produk</label>
                <select
                  id="item_id"
                  name="item_id"
                  value={formData.item_id}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Pilih Produk</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} - Rp {item.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="flash_price" className="block text-gray-700">Harga Flash Sale</label>
                <input
                  type="number"
                  id="flash_price"
                  name="flash_price"
                  value={formData.flash_price}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Masukkan Harga Flash Sale"
                  required />
              </div>

              <div className="mb-4">
                <label htmlFor="start_time" className="block text-gray-700">Waktu Mulai</label>
                <input
                  type="datetime-local"
                  id="start_time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  required />
              </div>

              <div className="mb-4">
                <label htmlFor="end_time" className="block text-gray-700">Waktu Berakhir</label>
                <input
                  type="datetime-local"
                  id="end_time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  required />
              </div>

              <button
                type="submit"
                className="bg-[#C62E2E] text-white px-6 py-2 rounded-lg mt-4"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Tambah Produk'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default AdminFlashSale;

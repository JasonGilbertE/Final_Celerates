import React, { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Sidebar from "../components/Sidebar";

const TambahProduk = () => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    info: "-",
    strikeout_price: "",
    price: "",
    stock: "",
    category_id: "",
    expiration_date: "",
    color: "",
    size: "",
    model: "",
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // Load categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3000/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Gagal memuat kategori");
        }
        const data = await response.json();
        setCategories(data.categories); // Sesuaikan dengan struktur respons API
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }
  
    // Buat objek FormData
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("desc", formData.desc);
    formDataObj.append("info", formData.info);
    formDataObj.append("strikeout_price", formData.strikeout_price);
    formDataObj.append("price", formData.price);
    formDataObj.append("stock", formData.stock);
    formDataObj.append("category_id", formData.category_id);
    formDataObj.append("expiration_date", formData.expiration_date);
    formDataObj.append("color", formData.color);
    formDataObj.append("size", formData.size);
    formDataObj.append("model", formData.model);
  
    if (uploadedImage) {
      const blob = await fetch(uploadedImage).then((res) => res.blob());
      formDataObj.append("images", blob, "product-image.jpg"); // Sesuaikan nama file
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Jangan tambahkan Content-Type; akan otomatis diatur oleh FormData
        },
        body: formDataObj,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Terjadi kesalahan.");
      }
  
      alert("Produk berhasil ditambahkan!");
      
      window.location.href = `/admin/semua-produk`; 
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Gagal menambahkan produk: ${error.message}`);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />

      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar />

          <div className="w-3/4 ml-8">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2">
              Tambah Produk
            </h2>

            <form className="grid grid-cols-3 gap-x-4 gap-y-2" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Nama Produk</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama produk"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"
                />
              </div>

              <div className="col-span-1 row-span-3">
                <label className="block text-sm font-medium mb-1">Gambar Produk</label>
                <div className="relative border-2 border-dashed border-[#C62E2E] rounded h-56 w-full flex items-center justify-center">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      className="h-full w-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400 text-xl">🖼️ Upload Gambar</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  placeholder="Masukkan deskripsi produk"
                  className="w-full border-2 border-[#C62E2E] rounded p-2 h-20"
                ></textarea>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#C62E2E] rounded p-2"
                >
                  <option value="" disabled>
                    Pilih kategori
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Jumlah Stok</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#C62E2E] rounded p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tgl Kadaluarsa</label>
                <input
                  type="date"
                  name="expiration_date"
                  value={formData.expiration_date}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#C62E2E] rounded p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Harga</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#C62E2E] rounded p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Harga Coret</label>
                <input
                  type="number"
                  name="strikeout_price"
                  value={formData.strikeout_price}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#C62E2E] rounded p-2"
                />
              </div>

              {/* warna */}
              <div>
                <label className="block text-sm font-medium mb-1">Warna</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="Masukkan warna produk"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"
                />
              </div>

              {/* ukuran */}
              <div>
                <label className="block text-sm font-medium mb-1">Ukuran</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="Masukkan ukuran produk"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"
                />
              </div>

              {/* model */}
              <div className="col-span-3">
                <label className="block w-full text-sm font-medium mb-1">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Masukkan model produk"
                  className="w-full border-2 border-[#C62E2E] rounded p-2"
                />
              </div>

              <div className="col-span-3 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="border border-[#C62E2E] text-[#C62E2E] px-4 py-2 rounded">
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#C62E2E] text-white px-4 py-2 rounded">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default TambahProduk;

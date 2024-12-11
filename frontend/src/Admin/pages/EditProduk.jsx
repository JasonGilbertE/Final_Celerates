import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Sidebar from "../components/Sidebar";

// Import axios
import axios from "axios";

const EditProduk = () => {
  const { id } = useParams(); // Get the product id from the URL
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
  const navigate = useNavigate(); // Use useNavigate hook for navigation

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
        setCategories(data.categories); // Adjust with the API response structure
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
    fetchCategories();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  // Load product data by ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:3000/api/items/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Gagal memuat produk");
        }
        const data = await response.json();
        setFormData({
          name: data.name,
          desc: data.desc,
          info: data.info,
          strikeout_price: data.strikeout_price,
          price: data.price,
          stock: data.stock,
          category_id: data.category.id,
          expiration_date: formatDate(data.expiration_date),
          color: data.color,
          size: data.size,
          model: data.model,
        });
        if (data.images && data.images.length > 0) {
          setUploadedImage(`http://localhost:3000/${data.images[0].url}`);
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };
    fetchProductDetails();
  }, [id]);

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
      navigate("/login");
      return;
    }

    // Create a FormData object
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
      // cek uploadedImage apakah berupa URL atau File
      if (!uploadedImage.startsWith("http")) {
        const blob = await fetch(uploadedImage).then((res) => res.blob());
        formDataObj.append("images", blob, "product-image.jpg"); // Adjust the file name if necessary
      }
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/items/${id}`, formDataObj, {
        headers: {
          Authorization: `Bearer ${token}`, // Do not set Content-Type, it will be set by FormData
        },
      });

      alert("Produk berhasil diperbarui!");
    } catch (error) {
      alert(`Gagal memperbarui produk: ${error.message}`);
      if (error.response.status === 401 || error.response.status === 403) {
        alert("Sesi Anda telah berakhir. Silakan login kembali.");
        localStorage.removeItem("token");
        navigate("/login");
      }
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
              Edit Produk
            </h2>
            <form
              className="grid grid-cols-3 gap-x-4 gap-y-2"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="col-span-3">
                <label className="block text-gray-700">Nama Produk</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="col-span-3">
                <label className="block text-gray-700">Deskripsi</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                ></textarea>
              </div>
              <div className="col-span-3">
                <label className="block text-gray-700">Harga</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              {/* harga coret */}
              <div className="col-span-3">
                <label className="block text-gray-700">Harga Coret</label>
                <input
                  type="number"
                  name="strikeout_price"
                  value={formData.strikeout_price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="col-span-3">
                <label className="block text-gray-700">Kategori</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-3">
                <label className="block text-gray-700">Stok</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              {/* tanggal kadaluarsa */}
              <div className="col-span-3">
                <label className="block text-gray-700">Tanggal Kadaluarsa</label>
                <input
                  type="date"
                  name="expiration_date"
                  value={formData.expiration_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              {/* warna */}
              <div className="col-span-3">
                <label className="block text-gray-700">Warna</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              {/* model */}
              <div className="col-span-3">
                <label className="block text-gray-700">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="col-span-3">
                <label className="block text-gray-700">Gambar Produk</label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    alt="Uploaded preview"
                    className="mt-2"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="col-span-3 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="border border-[#C62E2E] text-[#C62E2E] px-4 py-2 rounded"
                  onClick={() => navigate(-1)}
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="bg-[#C62E2E] text-white px-4 py-2 rounded"
                >
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

export default EditProduk;

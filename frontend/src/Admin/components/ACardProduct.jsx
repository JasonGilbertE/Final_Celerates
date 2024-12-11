import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ACardProduct = ({ product, onDelete, onEdit }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // State to control delete confirmation
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // cek jika key images ada pada product
  let images;
  if (!product.images) {
    images = product.image;
  } else {
    images = 'http://localhost:3000/' + product.images[0].url;
  }
  
  const handleDeleteClick = async () => {
    // Show confirmation dialog
    setShowConfirmDelete(true);
  };
  
  const confirmDelete = async () => {
    try {
      // Perform API call to delete product
      const response = await fetch(`http://localhost:3000/api/items/${product.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Gagal menghapus produk");
      }
      
      // If successful, call the onDelete prop to update the UI
      onDelete(product.id);
      alert("Produk berhasil dihapus");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setShowConfirmDelete(false);
    }
  };
  
  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };
  
  const gotoEdit = (id) => () => {
    navigate(`/admin/edit-produk/${id}`);
  }
  
  return (
    <div className="relative border-4 border-[#C62E2E] rounded-lg overflow-hidden shadow-md bg-white">
    {/* Wrap the image and product details in a Link to navigate to the detail page */}
    <Link to={`/produk/${product.id}`} className="block">
    <img
    src={images}
    alt={product.name}
    className="w-full h-48 object-cover"
    />
    <div className="p-4 text-left">
    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
    <p className="text-[#C62E2E] font-bold">
    Rp. {product.price ? product.price.toLocaleString() : "Harga tidak tersedia"}
    </p>
    </div>
    </Link>
    
    <div className="absolute top-4 right-4">
    <button
    ref={buttonRef}
    className="text-white pb-3 text-xl bg-[#C62E2E] rounded-lg w-8 h-8 flex items-center justify-center"
    onClick={toggleDropdown}
    >
    ...
    </button>
    
    {showDropdown && (
      <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 bg-[#C62E2E] border shadow-lg rounded-lg z-10"
      >
      <button
      className="block w-full px-4 py-2 text-sm text-white text-left"
      onClick={handleDeleteClick} // Trigger the delete confirmation
      >
      Hapus
      </button>
      <button
      className="block w-full px-4 py-2 text-sm text-white text-left"
      onClick={gotoEdit(product.id)} // Trigger the edit function
      >
      Ubah
      </button>
      </div>
    )}
    </div>
    
    {/* Confirmation dialog for deletion */}
    {showConfirmDelete && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Apakah Anda yakin ingin menghapus produk ini?
            </h3>
            <div className="flex justify-end space-x-4">
            <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={confirmDelete}
            >
            Ya, Hapus
            </button>
            <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            onClick={navigate("/admin/semua-produk")}
            >
            Batal
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default ACardProduct;

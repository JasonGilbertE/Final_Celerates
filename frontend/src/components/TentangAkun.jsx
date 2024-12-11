import React, { useState } from "react";
import axios from "axios";
import NotipHapus from "./NotipHapus";

const TentangAkun = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      // Mengambil token dari localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token tidak ditemukan. Anda perlu login ulang.");
        return;
      }

      // Mengirim request DELETE ke API
      const response = await axios.delete(
        "http://localhost:3000/api/users/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Menambahkan token ke header
          },
        }
      );

      if (response.data.status === "success") {
        setIsDeleted(true);
      } else {
        setError("Gagal menghapus akun. Coba lagi nanti.");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat menghapus akun.");
      console.error("Error deleting account:", error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hapus Akun Anda</h2>
      {!isDeleted ? (
        <>
          <p className="text-sm mb-4">
            Menghapus akun Anda akan menghapus semua data yang terkait dengan
            akun ini. Pastikan Anda telah memikirkan keputusan ini dengan
            seksama.
          </p>
          <button
            className="bg-[#C62E2E] text-white py-2 px-4 rounded"
            onClick={handleDeleteClick}
            disabled={loading} // Nonaktifkan tombol selama proses penghapusan
          >
            {loading ? "Menghapus..." : "Hapus Akun"}
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </>
      ) : (
        <p className="text-green-600">Akun Anda telah berhasil dihapus.</p>
      )}

      {showModal && (
        <NotipHapus
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default TentangAkun;

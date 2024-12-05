import React, { useState } from "react";
import NotipHapus from "./NotipHapus"; 

const TentangAkun = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    setIsDeleted(true);
    setShowModal(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hapus Akun Anda</h2>
      {!isDeleted ? (
        <>
          <p className="text-sm mb-4">
            Menghapus akun Anda akan menghapus semua data yang terkait dengan
            akun ini. Pastikan Anda telah memikirkan keputusan ini dengan
            Seksama.
          </p>
          <button
            className="bg-[#C62E2E] text-white py-2 px-4 rounded"
            onClick={handleDeleteClick}
          >
            Hapus Akun
          </button>
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

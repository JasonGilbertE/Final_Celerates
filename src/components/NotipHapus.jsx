import React from "react";

const NotipHapus = ({ onClose, onConfirm }) => (
  <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="modal-content bg-white p-6 rounded shadow-lg">
      <p className="text-center mb-4">Yakin ingin menghapus akun?</p>
      <div className="flex justify-center space-x-4">
      <button
        className="border-2 border-[#C62E2E] text-[#C62E2E] py-2 px-4 rounded bg-white"
        onClick={onClose}>
         Tidak
        </button>
        <button className="bg-[#C62E2E] text-white py-2 px-4 rounded" onClick={onConfirm}>
          Ya
        </button>
      </div>
    </div>
  </div>
);

export default NotipHapus;

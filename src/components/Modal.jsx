import React from "react";

const Modal = ({ onClose, onConfirm }) => (
  <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="modal-content bg-white p-6 rounded shadow-lg">
      <p className="text-center mb-4">Yakin ingin kembali?</p>
      <div className="flex justify-center space-x-4">
        <button className="bg-gray-300 text-black py-2 px-4 rounded" onClick={onClose}>
          Tidak
        </button>
        <button className="bg-red-600 text-white py-2 px-4 rounded" onClick={onConfirm}>
          Ya
        </button>
      </div>
    </div>
  </div>
);

export default Modal;

import React, { useState } from "react";
import axios from "axios";

const KeamananProfile = ({
  showSupportCardHandler,
  showWhatsAppChatHandler,
  showPoliciesHandler,
  showSupportCard,
  showWhatsAppChat,
  showPolicies,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.patch(
        "http://localhost:3000/api/users/update-password",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      // Clear form
      setOldPassword("");
      setNewPassword("");

      alert("Password updated successfully.");

      setIsModalOpen(false);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to update password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Keamanan dan Bantuan</h3>
      <div className="space-y-2">
        <button
          className="block w-full text-left py-2 px-2 border rounded hover:bg-gray-100"
          onClick={() => setIsModalOpen(true)}
        >
          Ubah Kata Sandi
        </button>
        <a
          className="block w-full text-left py-2 px-2 border rounded hover:bg-gray-100"
          href="#"
          onClick={showSupportCardHandler}
        >
          Hubungi Pusat Bantuan
        </a>
      </div>

      {showSupportCard && (
        <div className="border rounded-lg p-4 mt-4">
          <div id="support-card-content">
            <img
              alt="Support Banner"
              className="w-full rounded-lg mb-4"
              height="200"
              src="/assets/images/PUSATBANTUAN.png"
            />
            <div className="flex space-x-4">
              <a
                className="block w-1/2 text-center py-2 border rounded bg-[#F7CDCF]"
                href="#"
                onClick={showWhatsAppChatHandler}
              >
                <h3 className="font-bold">Kontak Dukungan Pelanggan</h3>
                <h4>klik disini untuk selengkapnya</h4>
              </a>
              <a
                className="block w-1/2 text-center py-2 border rounded bg-[#F7CDCF]"
                href="#"
                onClick={showPoliciesHandler}
              >
                <h3 className="font-bold">Kebijakan dan Ketentuan</h3>
                <h4>klik di sini untuk selengkapnya</h4>
              </a>
            </div>
          </div>
        </div>
      )}

      {showWhatsAppChat && (
        <div className="border rounded-lg p-4 text-center">
          <h3 className="text-lg font-bold mb-4">
            Chat di WhatsApp dengan +626281222729155
          </h3>
          <a
            className="block w-1/4 text-center py-2 border rounded bg-[#C62E2E] text-white"
            href="https://wa.me/6281222729155"
            target="_blank"
          >
            Lanjutkan ke chat
          </a>
        </div>
      )}

      {showPolicies && (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4">Kebijakan dan Ketentuan</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center border-b py-2">
              <span>Kebijakan Pembayaran</span>
              <i className="fas fa-chevron-down"></i>
            </li>
            <ul className="hidden pl-4 space-y-1">
              <li>Metode Pembayaran yang Diterima</li>
              <li>Proses Pengembalian Dana</li>
            </ul>
            <li className="flex justify-between items-center border-b py-2">
              <span>Kebijakan Pengiriman</span>
              <i className="fas fa-chevron-down"></i>
            </li>
            <ul className="hidden pl-4 space-y-1">
              <li>Waktu Pengiriman</li>
              <li>Biaya Pengiriman</li>
            </ul>
            <li className="flex justify-between items-center border-b py-2">
              <span>Kebijakan Privasi</span>
              <i className="fas fa-chevron-down"></i>
            </li>
            <ul className="hidden pl-4 space-y-1">
              <li>Pengumpulan Data</li>
              <li>Penyimpanan Data</li>
            </ul>
          </ul>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Ubah Kata Sandi</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Kata Sandi Lama</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Kata Sandi Baru</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              {message && <p className="text-red-500 mb-4">{message}</p>}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 border rounded bg-gray-100"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded ${
                    loading ? "bg-gray-400" : "bg-red-600"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeamananProfile;

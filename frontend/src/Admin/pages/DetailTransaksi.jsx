import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Sidebar from "../components/Sidebar";

const DetailTransaksi = () => {
  const { transactionId } = useParams(); // Ambil transactionId dari URL
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/transactions/admin/${transactionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        if (response.data.status === "success") {
          setTransaction(response.data.data);
        } else {
          console.error("Failed to fetch transaction details");
        }
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, [transactionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />

      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar />

          <div className="flex-1">
            {transaction && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Detail Transaksi</h2>

                {/* Informasi Transaksi */}
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold">Informasi Transaksi</h3>
                  <div className="space-y-4 mt-4">
                    <p><strong>ID Pesanan:</strong> {transaction.orderID}</p>
                    <p><strong>Status:</strong> {transaction.status}</p>
                    <p><strong>Alamat Pengiriman:</strong> {transaction.address}</p>
                    <p><strong>Total:</strong> Rp {transaction.total.toLocaleString()}</p>
                  </div>
                </div>

                {/* Informasi Pengguna */}
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold">Informasi Pengguna</h3>
                  <div className="space-y-4 mt-4">
                    <p><strong>Nama:</strong> {transaction.user.name}</p>
                    <p><strong>Email:</strong> {transaction.user.email}</p>
                    <p><strong>No. Telepon:</strong> {transaction.user.telp_number}</p>
                  </div>
                </div>

                {/* Daftar Barang */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold">Daftar Barang</h3>
                  <div className="space-y-4 mt-4">
                    {transaction.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <img
                          src={`http://localhost:3000/${item.images[0]}`}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                        <div>
                          <p><strong>Nama Barang:</strong> {item.name}</p>
                          <p><strong>Jumlah:</strong> {item.quantity}</p>
                          <p><strong>Harga:</strong> Rp {item.amount.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default DetailTransaksi;

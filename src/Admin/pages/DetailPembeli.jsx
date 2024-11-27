import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import Sidebar from "../components/Sidebar";
import RiwayatData from "../services/RiwayatData"; 

const DetailPembeli = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const customerData = RiwayatData.filter((order) => order.namaUser === customerId);
    setCustomer(customerData);
  }, [customerId]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <main className="flex-grow mt-20 bg-gray-50 py-8">
        <div className="container mx-auto px-4 flex">
          <Sidebar />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Detail Pembeli</h2>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Informasi Pembeli</h3>
              <div className="space-y-4">
                {customer.map((order) => (
                  <div key={order.idPesanan} className="space-y-2">
                    <p><strong>Nama:</strong> {order.namaUser}</p>
                    <p><strong>Produk:</strong> {order.produk}</p>
                    <p><strong>Tanggal:</strong> {order.tanggal}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Jumlah:</strong> Rp. {order.jumlah.toLocaleString()}</p>
                    <p><strong>ID Pesanan:</strong> {order.idPesanan}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <AdminFooter />
    </div>
  );
};

export default DetailPembeli;

import React from "react";

const AddressTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Daftar Alamat</h2>
      <div className="space-y-4">
        {/* Menampilkan daftar alamat */}
        <div className="border-b py-2">
          <h3 className="text-lg">Alamat Utama</h3>
          <p>Jl. Kebon Jeruk No.10, Jakarta</p>
        </div>
        <div className="border-b py-2">
          <h3 className="text-lg">Alamat Pengiriman</h3>
          <p>Jl. Merdeka Raya No.5, Bandung</p>
        </div>
        {/* Tombol untuk menambah alamat baru */}
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Tambah Alamat Baru</button>
      </div>
    </div>
  );
};

export default AddressTab;

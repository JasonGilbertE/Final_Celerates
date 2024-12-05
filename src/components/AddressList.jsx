import React from 'react';

const AddressList = ({ addresses, handleDeleteAddress, handleEditAddress, handleSaveAddress }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Alamat tercantum</h2>
      {addresses.map((address) => (
        <div key={address.id} className="mb-4 border p-4 rounded">
          {address.isEditing ? (
            <div>
              <div className="mb-2">
                <label className="block text-gray-700">Nama Alamat</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={address.name}
                  onChange={(e) => {
                    const updatedAddress = { ...address, name: e.target.value };
                    setAddresses(addresses.map((addr) => (addr.id === address.id ? updatedAddress : addr)));
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Nama Penerima</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={address.receiver}
                  onChange={(e) => {
                    const updatedAddress = { ...address, receiver: e.target.value };
                    setAddresses(addresses.map((addr) => (addr.id === address.id ? updatedAddress : addr)));
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">No. Telepon</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={address.phone}
                  onChange={(e) => {
                    const updatedAddress = { ...address, phone: e.target.value };
                    setAddresses(addresses.map((addr) => (addr.id === address.id ? updatedAddress : addr)));
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Alamat</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={address.address}
                  onChange={(e) => {
                    const updatedAddress = { ...address, address: e.target.value };
                    setAddresses(addresses.map((addr) => (addr.id === address.id ? updatedAddress : addr)));
                  }}
                />
              </div>
              <div className="flex space-x-2 mt-2">
                <button className="py-2 px-4 bg-[#C62E2E] text-white rounded" onClick={() => handleSaveAddress(address.id)}>
                  Simpan
                </button>
                <button className="py-2 px-4 bg-[#ffffff] text-[#C62E2E] border border-[#C62E2E] rounded" onClick={() => handleEditAddress(address.id)}>
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="font-bold">{address.name}</div>
              <div>{address.receiver}</div>
              <div>{address.phone}</div>
              <div>{address.address}</div>
              <div className="flex space-x-2 mt-2">
                <button className="py-2 px-4 bg-[#ffffff] text-[#C62E2E] border border-[#C62E2E] rounded" onClick={() => handleDeleteAddress(address.id)}>
                  Hapus Alamat
                </button>
                <button className="py-2 px-4 bg-[#C62E2E] text-white rounded" onClick={() => handleEditAddress(address.id)}>
                  Ubah Alamat
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddressList;

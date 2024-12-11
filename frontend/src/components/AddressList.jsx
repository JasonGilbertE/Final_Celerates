import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    receiver: '',
    phone: '',
    address: '',
  });
  const [isAdding, setIsAdding] = useState(false);

  const token = localStorage.getItem('token');
  const apiUrl = 'http://localhost:3000/api/addresses';

  // Fetch all addresses
  useEffect(() => {
    fetchAddresses();
  }, [token]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const addressesWithEditing = response.data.data.map((addr) => ({
        ...addr,
        isEditing: false,
      }));
      setAddresses(addressesWithEditing);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    }
  };

  // Add new address
  const handleAddAddress = async () => {
    if (addresses.length >= 5) {
      alert('Maksimal 5 alamat diperbolehkan.');
      return;
    }
    try {
      const response = await axios.post(
        apiUrl,
        {
          nama_alamat: newAddress.name,
          alamat: newAddress.address,
          no_telpon: newAddress.phone,
          penerima: newAddress.receiver,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newAddressWithEditing = { ...response.data.data, isEditing: false };
      setAddresses([...addresses, newAddressWithEditing]);
      setNewAddress({ name: '', receiver: '', phone: '', address: '' });
      setIsAdding(false);
      fetchAddresses();
    } catch (error) {
      console.error('Failed to add address:', error);
    }
  };

  // Update address
  const handleSaveAddress = async (id) => {
    const updatedAddress = addresses.find((addr) => addr.id === id);
    try {
      await axios.patch(
        `${apiUrl}/${id}`,
        {
          nama_alamat: updatedAddress.address_name,
          alamat: updatedAddress.address,
          no_telpon: updatedAddress.phone_number,
          penerima: updatedAddress.recipient,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAddresses(
        addresses.map((addr) =>
          addr.id === id ? { ...addr, isEditing: false } : addr
        )
      );
    } catch (error) {
      alert(error.response.data.message);
      console.error('Failed to update address:', error);
    }
  };

  // Delete address
  const handleDeleteAddress = async (id) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus alamat ini?');
    if (!confirmed) return;

    try {
      await axios.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(addresses.filter((addr) => addr.id !== id));
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  // Toggle edit mode
  const handleEditAddress = (id) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === id ? { ...addr, isEditing: !addr.isEditing } : addr
      )
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Alamat Tercantum</h2>
      {addresses.map((address) => (
        <div key={address.id} className="mb-4 border p-4 rounded">
          {address.isEditing ? (
            <div>
              <div className="mb-2">
                <label className="block text-gray-700">Nama Alamat</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={address.address_name}
                  onChange={(e) =>
                    setAddresses(
                      addresses.map((addr) =>
                        addr.id === address.id ? { ...addr, address_name: e.target.value } : addr
                      )
                    )
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Nama Penerima</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={address.recipient}
                  onChange={(e) =>
                    setAddresses(
                      addresses.map((addr) =>
                        addr.id === address.id ? { ...addr, recipient: e.target.value } : addr
                      )
                    )
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">No. Telepon</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={address.phone_number}
                  onChange={(e) =>
                    setAddresses(
                      addresses.map((addr) =>
                        addr.id === address.id ? { ...addr, phone_number: e.target.value } : addr
                      )
                    )
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Alamat</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={address.address}
                  onChange={(e) =>
                    setAddresses(
                      addresses.map((addr) =>
                        addr.id === address.id ? { ...addr, address: e.target.value } : addr
                      )
                    )
                  }
                />
              </div>
              <div className="flex space-x-2 mt-2">
                <button
                  className="py-2 px-4 bg-[#C62E2E] text-white rounded"
                  onClick={() => handleSaveAddress(address.id)}
                >
                  Simpan
                </button>
                <button
                  className="py-2 px-4 bg-[#ffffff] text-[#C62E2E] border border-[#C62E2E] rounded"
                  onClick={() => handleEditAddress(address.id)}
                >
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="font-bold">{address.address_name}</div>
              <div>{address.recipient}</div>
              <div>{address.phone_number}</div>
              <div>{address.address}</div>
              <div className="flex space-x-2 mt-2">
                <button
                  className="py-2 px-4 bg-[#ffffff] text-[#C62E2E] border border-[#C62E2E] rounded"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  Hapus Alamat
                </button>
                <button
                  className="py-2 px-4 bg-[#C62E2E] text-white rounded"
                  onClick={() => handleEditAddress(address.id)}
                >
                  Ubah Alamat
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {isAdding ? (
        <div className="mb-4 border p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Tambah Alamat Baru</h3>
          <div className="mb-2">
            <label className="block text-gray-700">Nama Alamat</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Nama Penerima</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={newAddress.receiver}
              onChange={(e) => setNewAddress({ ...newAddress, receiver: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">No. Telepon</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Alamat</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={newAddress.address}
              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
            />
          </div>
          <div className="flex space-x-2 mt-2">
            <button
              className="py-2 px-4 bg-[#C62E2E] text-white rounded"
              onClick={handleAddAddress}
            >
              Tambah
            </button>
            <button
              className="py-2 px-4 bg-[#ffffff] text-[#C62E2E] border border-[#C62E2E] rounded"
              onClick={() => setIsAdding(false)}
            >
              Batal
            </button>
          </div>
        </div>
      ) : (
        <button
          className="py-2 px-4 bg-[#C62E2E] text-white rounded"
          onClick={() => setIsAdding(true)}
        >
          Tambah Alamat Baru
        </button>
      )}
    </div>
  );
};

export default AddressList;

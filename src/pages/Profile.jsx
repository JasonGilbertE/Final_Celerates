import React, { useState } from "react";
import "tailwindcss/tailwind.css"; 
import Footer from "../components/Footer";
import Header from "../components/Header";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profil");
  const [editField, setEditField] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "Jihan Aprilia",
    email: "jihanl@gmail.com",
    phone: "085765789099",
  });

  const [addresses, setAddresses] = useState([
    { id: 1, name: "Rumah Utama", receiver: "Jihan", phone: "08573613891", address: "Jl. Diponegoro no. 99", isEditing: false },
    { id: 2, name: "Rumah Mama", receiver: "Mama Jihan", phone: "081975382007", address: "Jl. Tapak tilas Blok C no 45", isEditing: false },
  ]);

  const [showSupportCard, setShowSupportCard] = useState(false);
  const [showWhatsAppChat, setShowWhatsAppChat] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleSaveChanges = () => {
    setEditField(null);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleEditAddress = (id) => {
    const updatedAddresses = addresses.map((address) => (address.id === id ? { ...address, isEditing: !address.isEditing } : address));
    setAddresses(updatedAddresses);
  };

  const handleSaveAddress = (id) => {
    const updatedAddresses = addresses.map((address) => (address.id === id ? { ...address, isEditing: false } : address));
    setAddresses(updatedAddresses);
  };

  const showSupportCardHandler = () => {
    setShowSupportCard(true);
    setShowWhatsAppChat(false);
    setShowPolicies(false);
  };

  const showWhatsAppChatHandler = () => {
    setShowWhatsAppChat(true);
    setShowPolicies(false);
  };

  const showPoliciesHandler = () => {
    setShowPolicies(true);
    setShowWhatsAppChat(false);
  };

  return (
    <div className="bg-white">
     <Header />
      <div className="bg-white mx-8 pt-28 flex items-center space-x-2 border-b">
        <i className="fas fa-user-circle text-2xl pb-5"></i>
        <span className="text-xl pb-5">Akun</span>
      </div>

      <main className="p-8">
        <div className="flex space-x-8">
          <aside className="w-1/4 space-y-4">
            <div className="bg-[#C62E2E] text-white p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="bg-white text-[#000000] rounded-full w-8 h-8 flex items-center justify-center">J</div>
                <span>Jihan Aprilia</span>
              </div>
            </div>
            <div className="bg-[#F7CDCF] p-4 rounded-lg text-center">
              <button className="w-full text-center">Akun</button>
            </div>
            <div className="bg-[#F7CDCF] p-4 rounded-lg text-center">
              <a className="w-full text-center" href="#">
                Daftar Transaksi
              </a>
            </div>
          </aside>

          <section className="w-3/4">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="border-b mb-4">
                <ul className="flex space-x-4">
                  <li className={`tab-link border-b-2 pb-2 cursor-pointer ${activeTab === "profil" ? "border-[#C62E2E] active" : ""}`} onClick={() => handleTabChange("profil")}>
                    Profil
                  </li>
                  <li className={`tab-link border-b-2 pb-2 cursor-pointer ${activeTab === "daftar-alamat" ? "border-[#C62E2E] active" : ""}`} onClick={() => handleTabChange("daftar-alamat")}>
                    Daftar Alamat
                  </li>
                  <li className={`tab-link border-b-2 pb-2 cursor-pointer ${activeTab === "keamanan" ? "border-[#C62E2E] active" : ""}`} onClick={() => handleTabChange("keamanan")}>
                    Keamanan
                  </li>
                  <li className={`tab-link border-b-2 pb-2 cursor-pointer ${activeTab === "tentang-akun" ? "border-[#C62E2E] active" : ""}`} onClick={() => handleTabChange("tentang-akun")}>
                    Tentang Akun
                  </li>
                </ul>
              </div>
              {activeTab === "profil" && (
                <div className="flex space-x-8">
                  <div className="w-2/3">
                    <h3 className="text-lg font-bold mb-4">Ubah Profil</h3>
                    <div className="bg-[#F7CDCF] p-4 rounded-lg">
                      <div className="mb-2 flex items-center">
                        <span className="font-bold w-1/4">Nama</span>
                        <span className="w-1/12">:</span>
                        {editField === "name" ? (
                          <input className="flex-1 p-1 rounded" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
                        ) : (
                          <span className="flex-1">{profileData.name}</span>
                        )}
                        <i className="fas fa-pencil-alt text-gray-600 cursor-pointer" onClick={() => handleEdit("name")}></i>
                      </div>
                      <div className="mb-2 flex items-center">
                        <span className="font-bold w-1/4">Email</span>
                        <span className="w-1/12">:</span>
                        {editField === "email" ? (
                          <input className="flex-1 p-1 rounded" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} />
                        ) : (
                          <span className="flex-1">{profileData.email}</span>
                        )}
                        <i className="fas fa-pencil-alt text-gray-600 cursor-pointer" onClick={() => handleEdit("email")}></i>
                      </div>
                      <div className="mb-2 flex items-center">
                        <span className="font-bold w-1/4">No. Ponsel</span>
                        <span className="w-1/12">:</span>
                        {editField === "phone" ? (
                          <input className="flex-1 p-1 rounded" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} />
                        ) : (
                          <span className="flex-1">{profileData.phone}</span>
                        )}
                        <i className="fas fa-pencil-alt text-gray-600 cursor-pointer" onClick={() => handleEdit("phone")}></i>
                      </div>
                    </div>
                    {editField && (
                      <div className="flex justify-center mt-4">
                        <button className="bg-[#C62E2E] text-white px-4 py-2 rounded w-1/3" onClick={handleSaveChanges}>
                          Simpan
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="w-1/3 flex items-center">
                    <div className="bg-white shadow rounded-lg p-4">
                      <img alt="Profile picture of Jihan Aprilia" className="rounded-lg" height="150" src="/assets/images/orang/org1.jpg" width="150" />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "daftar-alamat" && (
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
                            <button className="py-2 px-4 bg-[#C62E2E] text-white rounded" onClick={() => handleSaveAddress(address.id, address)}>
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
              )}

              {activeTab === "keamanan" && (
                <div>
                  <h3 className="text-lg font-bold mb-2">Keamanan dan Bantuan</h3>
                  <div className="space-y-2">
                    <a className="block w-full text-left py-2 px-2 border rounded hover:bg-gray-100" href="#">
                      Ubah Kata Sandi
                    </a>
                    <a className="block w-full text-left py-2 px-2 border rounded hover:bg-gray-100" href="#" onClick={() => showSupportCardHandler()}>
                      Hubungi Pusat Bantuan
                    </a>
                  </div>
                </div>
              )}
              {showSupportCard && (
                <div className="border rounded-lg p-4">
                  <div id="support-card-content">
                    <img alt="Support Banner" className="w-full rounded-lg mb-4" height="200" src="/assets/images/PUSATBANTUAN.png" />
                    <div className="flex space-x-4">
                      <a className="block w-1/2 text-center py-2 border rounded bg-[#F7CDCF]" href="#" onClick={() => showWhatsAppChatHandler()}>
                        <h3 className="font-bold">Kontak Dukungan Pelanggan</h3>
                        <h4>klik disini untuk selengkapnya</h4>
                      </a>
                      <a className="block w-1/2 text-center py-2 border rounded bg-[#F7CDCF]" href="#" onClick={() => showPoliciesHandler()}>
                        <h3 className="font-bold">Kebijakan dan Ketentuan</h3>
                        <h4>klik di sini untuk selengkapnya</h4>
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {showWhatsAppChat && (
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="text-lg font-bold mb-4">Chat di WhatsApp dengan +62</h3>
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
                      <li>Pengumpulan Data Pribadi</li>
                      <li>Penggunaan Data Pribadi</li>
                    </ul>
                    <li className="flex justify-between items-center border-b py-2">
                      <span>Syarat dan Ketentuan Pengguna</span>
                      <i className="fas fa-chevron-down"></i>
                    </li>
                    <ul className="hidden pl-4 space-y-1">
                      <li>Hak dan Kewajiban Pengguna</li>
                      <li>Batasan Tanggung Jawab</li>
                    </ul>
                  </ul>
                </div>
              )}
              {activeTab === "tentang-akun" && (
                <div>
                  <p>Hapus Akun Anda</p>
                  <div className="flex justify-center">
                    <button className="bg-[#C62E2E] text-white px-4 py-2 rounded-lg mt-4 w-1/3">Hapus Akun</button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <section className="p-8">
          <img alt="Banner showcasing" className="w-full rounded-lg" height="200" src="/assets/images/banner.png" />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;

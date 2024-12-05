import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SidebarProfile from "../components/SidebarProfile";
import ProfileDetails from "../components/ProfileDetails";
import AddressList from "../components/AddressList";
import TentangAkun from "../components/TentangAkun"; 
import KeamananProfile from "../components/KeamananProfile";  

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
    <div className="bg-white flex flex-col min-h-screen">
      <Header />
      <div className="bg-white mx-8 pt-28 flex items-center space-x-2 border-b">
        <i className="fas fa-user-circle text-2xl pb-5"></i>
        <span className="text-xl pb-5">Akun</span>
      </div>

      <main className="flex-1 p-8">
        <div className="flex space-x-8">
          <SidebarProfile />

          <section className="w-3/4">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="border-b mb-4">
                <ul className="flex space-x-4">
                  <li
                    className={`tab-link border-b-2 pb-2 cursor-pointer ${
                      activeTab === "profil" ? "border-[#C62E2E] active" : ""
                    }`}
                    onClick={() => handleTabChange("profil")}
                  >
                    Profil
                  </li>
                  <li
                    className={`tab-link border-b-2 pb-2 cursor-pointer ${
                      activeTab === "daftar-alamat" ? "border-[#C62E2E] active" : ""
                    }`}
                    onClick={() => handleTabChange("daftar-alamat")}
                  >
                    Daftar Alamat
                  </li>
                  <li
                    className={`tab-link border-b-2 pb-2 cursor-pointer ${
                      activeTab === "keamanan" ? "border-[#C62E2E] active" : ""
                    }`}
                    onClick={() => handleTabChange("keamanan")}
                  >
                    Keamanan
                  </li>
                  <li
                    className={`tab-link border-b-2 pb-2 cursor-pointer ${
                      activeTab === "tentang-akun" ? "border-[#C62E2E] active" : ""
                    }`}
                    onClick={() => handleTabChange("tentang-akun")}
                  >
                    Tentang Akun
                  </li>
                </ul>
              </div>

              {activeTab === "profil" && (
                <ProfileDetails
                  profileData={profileData}
                  editField={editField}
                  handleEdit={handleEdit}
                  handleSaveChanges={handleSaveChanges}
                  setProfileData={setProfileData}
                />
              )}

              {activeTab === "daftar-alamat" && (
                <AddressList
                  addresses={addresses}
                  handleDeleteAddress={handleDeleteAddress}
                  handleEditAddress={handleEditAddress}
                  handleSaveAddress={handleSaveAddress}
                />
              )}

              {activeTab === "keamanan" && (
                <KeamananProfile
                  showSupportCardHandler={showSupportCardHandler}
                  showWhatsAppChatHandler={showWhatsAppChatHandler}
                  showPoliciesHandler={showPoliciesHandler}
                  showSupportCard={showSupportCard}
                  showWhatsAppChat={showWhatsAppChat}
                  showPolicies={showPolicies}
                />
              )}

              {activeTab === "tentang-akun" && (
                <TentangAkun /> 
              )}
            </div>
          </section>
        </div>
      </main>

      <div className="my-8 mx-10">
        <img className="w-full rounded-lg" src="/assets/images/banner.png" alt="Banner" />
      </div>

      <Footer />
    </div>
  );
};

export default Profile;

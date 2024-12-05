import React from "react";

const ProfileDetails = ({
  profileData,
  editField,
  setProfileData,
  handleEdit,
  handleSaveChanges,
  profilePhoto,
  handlePhotoChange,
}) => {
  return (
    <div className="flex items-start">
      <div className="w-1/4 flex flex-col items-center">
        <img
          src="/assets/images/orang/org1.jpg"
          alt="Foto Profil"
          className="w-40 h-40 rounded-full border-4 border-gray-300 object-cover"
        />
        <label htmlFor="upload-photo" className="mt-4 cursor-pointer text-[#C62E2E]">
          Ubah Foto
          <input
            id="upload-photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="w-3/4">
        <h3 className="text-lg font-semibold mb-4">Ubah Profil</h3>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Nama</label>
            {editField === "name" ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            ) : (
              <div className="flex justify-between items-center">
                <span>{profileData.name}</span>
                <button onClick={() => handleEdit("name")} className="text-[#C62E2E]">
                  Edit
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold">Email</label>
            {editField === "email" ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            ) : (
              <div className="flex justify-between items-center">
                <span>{profileData.email}</span>
                <button onClick={() => handleEdit("email")} className="text-[#C62E2E]">
                  Edit
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold">Nomor Telepon</label>
            {editField === "phone" ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            ) : (
              <div className="flex justify-between items-center">
                <span>{profileData.phone}</span>
                <button onClick={() => handleEdit("phone")} className="text-[#C62E2E]">
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
        {editField && (
          <button
            onClick={handleSaveChanges}
            className="mt-4 bg-[#C62E2E] text-white px-4 py-2 rounded"
          >
            Simpan Perubahan
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;

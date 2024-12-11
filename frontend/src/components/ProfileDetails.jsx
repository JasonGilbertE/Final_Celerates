import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileDetails = () => {
  const bearerToken = localStorage.getItem("token");
  const [profileData, setProfileData] = useState({
    id: null,
    name: "",
    email: "",
    telp_number: "",
    profile_image: "",
  });
  const [editField, setEditField] = useState(null);
  const [newImage, setNewImage] = useState(null);

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        const profile ={
          name: response.data.data.name,
          email: response.data.data.email,
          telp_number: response.data.data.telp_number,
        }
        // cek jika profile udah ada di local storage
        if (localStorage.getItem("profile")) {
          // jika ada, hapus dulu
          localStorage.removeItem("profile");
        }

        // save to local storage
        localStorage.setItem("profile", JSON.stringify(profile));

        setProfileData(response.data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [bearerToken]);

  // Handle profile image update
  const updateProfileImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.patch("http://localhost:3000/api/users/update-image", formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // After uploading, immediately update the profile image in state
      const updatedProfile = { ...profileData, profile_image: URL.createObjectURL(file) };
      setProfileData(updatedProfile);

    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  // Handle photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      updateProfileImage(file);  // Call the update function immediately
    }
  };

  // Save profile changes
  const updateProfile = async (updatedData) => {
    try {
      const response = await axios.patch("http://localhost:3000/api/users/update", updatedData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      // restart the page
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Save changes (either profile fields or profile image)
  const handleSave = () => {
    const updatedData = {
      name: profileData.name,
      email: profileData.email,
      telp_number: profileData.telp_number,
    };

    if (editField) {
      updateProfile(updatedData);
    }

    setEditField(null); // Reset edit state after saving
  };

  // Handle editing state for fields
  const handleEdit = (field) => {
    setEditField(field);
  };

  if (!profileData) {
    return <div>Loading...</div>; // Render loading state while fetching data
  }

  return (
    <div className="flex items-start">
      <div className="w-1/4 flex flex-col items-center">
        <img
          src={profileData.profile_image} // Default to a placeholder image if profile_image is empty
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
            {editField === "telp_number" ? (
              <input
                type="tel"
                value={profileData.telp_number}
                onChange={(e) => setProfileData({ ...profileData, telp_number: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            ) : (
              <div className="flex justify-between items-center">
                <span>{profileData.telp_number}</span>
                <button onClick={() => handleEdit("telp_number")} className="text-[#C62E2E]">
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
        {editField && (
          <button
            onClick={handleSave}
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
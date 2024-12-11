import React, { useState, useEffect } from "react";

const ProfileTab = () => {
  // State untuk menyimpan data profil
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  // State untuk menandai apakah profil dalam mode edit
  const [isEditing, setIsEditing] = useState(false);

  // State untuk mengelola input yang sedang diedit
  const [name, setName] = useState(profile.name);

  // Fungsi untuk mengupdate data profil (simulasi tanpa API)
  const updateProfile = () => {
    // Simulasikan update data (misalnya menyimpan ke database, jika sudah ada backend)
    setProfile((prevProfile) => ({
      ...prevProfile,
      name: name,
    }));

    // Menonaktifkan mode edit setelah disimpan
    setIsEditing(false);
  };

  // Menghandle perubahan input pada nama
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h2>Profile</h2>

      <p>
        <strong>Name:</strong>
        {isEditing ? <input type="text" value={name} onChange={handleNameChange} /> : profile.name}
      </p>

      <p>
        <strong>Email:</strong> {profile.email}
      </p>

      {/* Tombol untuk edit atau save */}
      {isEditing ? <button onClick={updateProfile}>Save</button> : <button onClick={() => setIsEditing(true)}>Edit</button>}
    </div>
  );
};

export default ProfileTab;

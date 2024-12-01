import React, { useState } from "react";

const SecurityTab = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Logic untuk mengubah password
    console.log("Password lama:", password);
    console.log("Password baru:", newPassword);
    // Reset form
    setPassword("");
    setNewPassword("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Keamanan</h2>

      {/* Form untuk mengganti password */}
      <div className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password Lama
          </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 px-4 py-2 w-full border rounded-lg" placeholder="Masukkan password lama" />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium">
            Password Baru
          </label>
          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 px-4 py-2 w-full border rounded-lg" placeholder="Masukkan password baru" />
        </div>

        <button onClick={handleChangePassword} className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Ubah Password
        </button>
      </div>

      {/* Fitur otentikasi dua faktor */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Otentikasi Dua Faktor</h3>
        <p className="mt-2 text-sm">Aktifkan otentikasi dua faktor untuk meningkatkan keamanan akun Anda.</p>
        <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Aktifkan 2FA</button>
      </div>
    </div>
  );
};

export default SecurityTab;

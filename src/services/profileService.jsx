// src/services/profilService.js
import axios from "axios";

// Set base URL untuk API (ganti dengan URL backend Anda)
const API_URL = "https://api.example.com"; // Ganti dengan URL API yang sesuai

// Fungsi untuk mendapatkan data profil pengguna
export const getProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile", error);
    throw error;
  }
};

// Fungsi untuk mengupdate data profil pengguna
export const updateProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile", error);
    throw error;
  }
};

// Fungsi untuk menghapus profil pengguna
export const deleteProfile = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting profile", error);
    throw error;
  }
};

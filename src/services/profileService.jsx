import axios from "axios";

const API_URL = "https://api.example.com"; 

export const getProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile", error);
    throw error;
  }
};

export const updateProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile", error);
    throw error;
  }
};

export const deleteProfile = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting profile", error);
    throw error;
  }
};

import axiosInstance from "../utils/axiosInstance";

// Service pour l'inscription
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

// Service pour la connexion
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

import api from "./axios"; // Import the configured axios instance

export const registerUser = async (userData) => {
  return api.post("/user/register", userData);
};

export const loginUser = async (userData) => {
  return api.post("/user/login", userData);
};

// Add more API calls as needed...

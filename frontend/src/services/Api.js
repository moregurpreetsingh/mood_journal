import api from "./axios"; // Import the configured axios instance

export const registerUser = async (userData) => {
  return api.post("/user/register", userData);
};

export const loginUser = async (userData) => {
  return api.post("/user/login", userData);
};

export const saveCurrentMood = async ({ userId, mood }) => {
  return api.post("user/saveCurrentMood", { userId, mood });
};
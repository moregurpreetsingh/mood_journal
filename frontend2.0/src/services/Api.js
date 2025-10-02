import api from "./axios"; // Import the configured axios instance

export const registerUser = async (userData) => {
  return api.post("/user/register", userData);
};

export const loginUser = async (userData) => {
  return api.post("/user/login", userData);
};

export const saveCurrentMood = async ({ userId, mood }) => {
  return api.post("mood/saveCurrentMood", { userId, mood });
};

export const mostRecentTodayMood = async ({ userId}) => {
  return api.post("mood/mostRecentTodayMood", { userId});
};

export const mostRecentMoods = async ({ userId}) => {
  return api.post("mood/mostRecentMoods", { userId});
};
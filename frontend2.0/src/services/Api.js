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

export const getUserDetails = async ( userData ) => {
  return api.post("user/getUserDetails",  userData );
}

export const changePassword = async ( userData ) => {
  return api.post("user/changePassword", userData );
}

export const changeUserName = async ( userData ) => {
  return api.post("user/changeUserName", userData );
}

export const getWeeklyAverage = async ( userData ) => {
  return api.post("insights/getWeeklyAverage", userData );
}

export const getTopMoods = async ( userData ) => {
  return api.post("insights/getTopMoods", userData );
}

export const getMoodShifts = async ( userData ) => {
  return api.post("insights/getMoodShifts", userData );
}
import axios from "axios";

// Create a custom axios instance
const api = axios.create({
  baseURL: "http://localhost:8080", // your backend server
  withCredentials: true, // ✅ sends cookies and auth headers
});

export default api;

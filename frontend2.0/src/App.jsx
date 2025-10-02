import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./app/pages/LoginPage";
import RegisterPage from "./app/pages/RegistrationPage";
import Home from "./app/pages/Home"
// import Dashboard from "./pages/Dashboard"; // Your authenticated page

export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

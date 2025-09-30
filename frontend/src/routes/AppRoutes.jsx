import React, { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import DashboardPage from "../pages/DashboardPage"
import NotFoundPage from "../pages/NotFoundPage"
import { UserContext } from "../contexts/UserContext"

export default function AppRoutes() {
  const { user } = useContext(UserContext)

  return (
    <Routes>
      {!user && <Route path="/" element={<LoginPage />} />}
      {!user && <Route path="/register" element={<RegisterPage />} />}
      {user && <Route path="/dashboard" element={<DashboardPage />} />}
      <Route path="*" element={<NotFoundPage />} />
      {/* Redirect logged-in user to dashboard */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
    </Routes>
  )
}

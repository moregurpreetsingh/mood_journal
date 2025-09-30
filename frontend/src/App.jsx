import React, { useState, useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { UserContext } from "./contexts/UserContext"

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <AppRoutes />
      </Router>
    </UserContext.Provider>
  )
}

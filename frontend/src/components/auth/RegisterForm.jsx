import React, { useState, useContext } from "react"
import { registerUser } from "../../api/api"
import { UserContext } from "../../contexts/UserContext"

export default function RegisterForm() {
  const { setUser } = useContext(UserContext)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const data = await registerUser({ username, email, passwordHash: password })
      setUser(data)
      localStorage.setItem("user", JSON.stringify(data))
      window.location.href = "/dashboard"
    } catch (err) {
      setError(err.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label>Username</label>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border rounded px-2 py-1"
        />
      </div>

      <div className="grid gap-2">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded px-2 py-1"
        />
      </div>

      <div className="grid gap-2">
        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded px-2 py-1"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded">
        {loading ? "Creating..." : "Create account"}
      </button>
    </form>
  )
}

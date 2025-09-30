import React, { useState, useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { logMood } from "../../api/api"

export default function MoodInput({ onNewEntry }) {
  const { user } = useContext(UserContext)
  const [mood, setMood] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setMessage("Please login first")
      return
    }
    setLoading(true)
    setMessage("")
    try {
      const payload = {
        mood,
        note,
        date: new Date().toISOString()
      }
      const saved = await logMood(user.id, payload)
      setMessage("Mood logged successfully")
      setMood("")
      setNote("")
      if (onNewEntry) onNewEntry(saved)
    } catch (err) {
      setMessage(err.message || "Failed to log mood")
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(""), 3000)
    }
  }

  return (
    <div className="border rounded-md p-4 bg-white shadow-sm">
      <h3 className="text-md font-medium mb-2">Log your mood</h3>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
          className="border rounded px-2 py-1"
        >
          <option value="">Select mood</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Stressed">Stressed</option>
          <option value="Excited">Excited</option>
          <option value="Anxious">Anxious</option>
          <option value="Neutral">Neutral</option>
        </select>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a short note (optional)"
          className="border rounded px-2 py-1"
          rows="3"
        />

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {loading ? "Saving..." : "Log Mood"}
          </button>
          {message && <span className="text-sm text-gray-600 ml-3">{message}</span>}
        </div>
      </form>
    </div>
  )
}

import React, { useEffect, useState, useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import MoodInput from "../components/mood/MoodInput"
import MoodCard from "../components/mood/MoodCard"
import { getMoodHistory } from "../api/api"

export default function DashboardPage() {
  const { user } = useContext(UserContext)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user) return
    const fetchHistory = async () => {
      setLoading(true)
      setError("")
      try {
        const data = await getMoodHistory(user.id)
        setHistory(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message || "Failed to load mood history")
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [user])

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Your Mood Dashboard</h1>
          <div>
            <strong>{user?.username}</strong>
          </div>
        </header>

        <section className="mb-6">
          <MoodInput onNewEntry={(entry) => setHistory(prev => [entry, ...prev])} />
        </section>

        <section>
          <h2 className="text-lg font-medium mb-2">Recent entries</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : history.length === 0 ? (
            <p>No moods logged yet.</p>
          ) : (
            <div className="space-y-3">
              {history.map((m, idx) => (
                <MoodCard key={m._id ?? idx} entry={m} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

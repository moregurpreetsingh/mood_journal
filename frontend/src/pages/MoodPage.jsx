"use client"

import { useEffect, useState } from "react"
import { MoodPicker } from "../components/MoodPicker"
import { MoodToday } from "../components/MoodToday"
import { MoodRecent } from "../components/MoodRecent"
import {
  saveCurrentMood,
  mostRecentTodayMood,
  mostRecentMoods,
} from "../services/api"

const MOODS = [
  { emoji: "😀", label: "Happy" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😍", label: "Loved" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😨", label: "Anxious" },
  { emoji: "🤒", label: "Sick" },
  { emoji: "😇", label: "Peaceful" },
  { emoji: "🤩", label: "Excited" },
  { emoji: "😭", label: "Heartbroken" },
  { emoji: "🤯", label: "Stressed" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "🤔", label: "Thoughtful" },
  { emoji: "😌", label: "Relaxed" },
  { emoji: "😎", label: "Confident" },
  { emoji: "😕", label: "Confused" },
  { emoji: "🤗", label: "Grateful" },
  { emoji: "😬", label: "Nervous" },
  { emoji: "😶", label: "Speechless" },
]

const STORAGE_KEY = "mood-log-v1"

// ✅ Map mood label to emoji and build entry object
function mapMoodToEntry(moodLabel, timestamp) {
  const found = MOODS.find((m) => m.label === moodLabel)
  return {
    emoji: found?.emoji || "❓",
    label: moodLabel,
    timestamp,
  }
}

export default function MoodPage() {
  const [showPicker, setShowPicker] = useState(true)
  const [log, setLog] = useState([])
  const [today, setToday] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(null)

  // 🔐 Load userId from sessionStorage
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId")
    if (storedUserId) {
      setUserId(storedUserId)
    } else {
      // fallback: hydrate from localStorage
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) {
            setLog(parsed)
            setToday(parsed[parsed.length - 1])
          }
        }
      } catch {}
    }
  }, [])

  // 📡 Fetch from API when userId is available
  useEffect(() => {
    if (!userId) return

    async function fetchMoodData() {
      setLoading(true)
      setError(null)
      try {
        const [todayRes, recentRes] = await Promise.all([
          mostRecentTodayMood({ userId }),
          mostRecentMoods({ userId }),
        ])

        // Today's mood
        if (todayRes?.data) {
          const { mood, createdDate } = todayRes.data
          setToday(mapMoodToEntry(mood, createdDate))
        }

        // Recent moods
        if (Array.isArray(recentRes?.data)) {
          const mapped = recentRes.data.map((entry) =>
            mapMoodToEntry(entry.mood, entry.formattedDate)
          )
          setLog(mapped)
        }
      } catch (err) {
        setError("Failed to fetch mood data.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMoodData()
  }, [userId])

  // 💾 Save to localStorage if no backend
  useEffect(() => {
    if (!userId) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(log))
      } catch {}
    }
  }, [log, userId])

  // ✅ Handle mood selection
  async function handleSelect(mood) {
    if (!userId) {
      setError("User not logged in. Please login first.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      await saveCurrentMood({ userId, mood: mood.label })

      // Re-fetch updated data from backend
      const [todayRes, recentRes] = await Promise.all([
        mostRecentTodayMood({ userId }),
        mostRecentMoods({ userId }),
      ])

      if (todayRes?.data) {
        const { mood, createdDate } = todayRes.data
        setToday(mapMoodToEntry(mood, createdDate))
      }

      if (Array.isArray(recentRes?.data)) {
        const mapped = recentRes.data.map((entry) =>
          mapMoodToEntry(entry.mood, entry.formattedDate)
        )
        setLog(mapped)
      }

      setShowPicker(false)
    } catch (err) {
      setError("Failed to save mood. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function clearHistory() {
    setLog([])
    setToday(null)
    if (!userId) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <h1 className="text-balance text-3xl font-bold tracking-tight">Mood Journal Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">Track how you feel and review recent entries.</p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Action row */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPicker(true)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              aria-label="Log your mood"
              disabled={loading}
            >
              Log your mood
            </button>
            {loading && <p className="text-sm text-blue-600 ml-3 select-none">Saving mood...</p>}
            {error && <p className="text-sm text-red-600 ml-3 select-none">{error}</p>}
          </div>

          <button
            type="button"
            onClick={clearHistory}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            aria-label="Clear mood history"
            disabled={loading}
          >
            Clear history
          </button>
        </div>

        {/* Today's mood */}
        <section
          aria-labelledby="today-heading"
          className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 id="today-heading" className="text-2xl font-semibold">
            Today&apos;s mood
          </h2>
          <div className="mt-4">
            <MoodToday entry={today} />
          </div>
        </section>

        {/* Recent moods */}
        <section
          aria-labelledby="recent-heading"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 id="recent-heading" className="text-2xl font-semibold">
            Recent moods
          </h2>
          <div className="mt-4">
            <MoodRecent entries={[...log].reverse()} />
          </div>
        </section>
      </div>

      {showPicker && (
        <MoodPicker
          moods={MOODS}
          onSelect={handleSelect}
          onClose={() => setShowPicker(false)}
          title="How are you feeling today?"
        />
      )}
    </main>
  )
}

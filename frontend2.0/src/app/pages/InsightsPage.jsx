"use client"

import { useEffect, useState, useMemo } from "react"
import {
  WeeklyAverage,
  TopMoods,
  Consistency,
  WeeklyMoodTrend,
  EmojiFrequency,
  MoodDistribution,
  PositiveVsNegative,
} from "../../components/insights"
import AppSidebar from "../../components/Sidemenu"
import AuthGuard from "../../components/AuthGuard"
import "../../components/insights/insights.css"

const STORAGE_KEY = "mood-log-v1"

// Mood scoring system
const SCORE_BY_LABEL = {
  "😭": 1, "😢": 1, "😞": 1, "😕": 2, "😐": 2,
  "🙂": 3, "😊": 3, "😃": 4, "😄": 4, "🤩": 5, "😍": 5
}

// Mood categories
const POSITIVE = ["😊", "😃", "😄", "🤩", "😍"]
const NEUTRAL = ["😐", "🙂"]
const NEGATIVE = ["😭", "😢", "😞", "😕"]

// Utility functions
function startOfWeek(date = new Date()) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  return new Date(d.setDate(diff))
}

function endOfWeek(date = new Date()) {
  const start = startOfWeek(date)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return end
}

function dayKey(date) {
  return date.toISOString().split('T')[0]
}

function dayAbbr(date) {
  return date.toLocaleDateString('en', { weekday: 'short' })
}

function stdDev(values) {
  if (values.length <= 1) return 0
  const mean = values.reduce((a, b) => a + b) / values.length
  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length
  return Math.sqrt(variance)
}

function useLocalEntries() {
  const [entries, setEntries] = useState([])
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setEntries(parsed)
      }
    } catch {}
  }, [])
  return entries
}

export default function InsightsPage() {
  const allEntries = useLocalEntries()

  const {
    weeklyAvg,
    prevAvg,
    wowDelta,
    top3,
    consistencyLabel,
    shifts,
    trendData,
    freqData,
    distData,
    posNegByDay
  } = useMemo(() => {
    const now = new Date()
    const currentWeekStart = startOfWeek(now)
    const currentWeekEnd = endOfWeek(now)
    
    const prevWeekStart = new Date(currentWeekStart)
    prevWeekStart.setDate(prevWeekStart.getDate() - 7)
    const prevWeekEnd = new Date(prevWeekStart)
    prevWeekEnd.setDate(prevWeekStart.getDate() + 6)

    // Filter entries for current week
    const currentWeekEntries = allEntries.filter(entry => {
      const entryDate = new Date(entry.date)
      return entryDate >= currentWeekStart && entryDate <= currentWeekEnd
    })

    // Filter entries for previous week
    const prevWeekEntries = allEntries.filter(entry => {
      const entryDate = new Date(entry.date)
      return entryDate >= prevWeekStart && entryDate <= prevWeekEnd
    })

    // Calculate weekly averages
    const currentScores = currentWeekEntries.map(e => SCORE_BY_LABEL[e.mood] || 3)
    const prevScores = prevWeekEntries.map(e => SCORE_BY_LABEL[e.mood] || 3)
    
    const weeklyAvg = currentScores.length ? currentScores.reduce((a, b) => a + b) / currentScores.length : 0
    const prevAvg = prevScores.length ? prevScores.reduce((a, b) => a + b) / prevScores.length : 0
    const wowDelta = weeklyAvg - prevAvg

    // Calculate top moods
    const moodCounts = {}
    currentWeekEntries.forEach(entry => {
      const mood = entry.mood
      moodCounts[mood] = (moodCounts[mood] || 0) + 1
    })
    
    const top3 = Object.entries(moodCounts)
      .map(([emoji, count]) => ({
        emoji,
        label: getMoodLabel(emoji),
        count,
        pct: (count / currentWeekEntries.length) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)

    // Calculate consistency
    const consistency = stdDev(currentScores)
    let consistencyLabel = "High"
    let shifts = 0
    
    if (consistency > 1.5) {
      consistencyLabel = "Low"
      shifts = Math.floor(consistency * 2)
    } else if (consistency > 0.8) {
      consistencyLabel = "Medium"
      shifts = Math.floor(consistency * 3)
    } else {
      shifts = Math.max(1, Math.floor(consistency * 4))
    }

    // Generate trend data for the week
    const trendData = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart)
      date.setDate(currentWeekStart.getDate() + i)
      const dayEntries = currentWeekEntries.filter(e => dayKey(new Date(e.date)) === dayKey(date))
      const dayScores = dayEntries.map(e => SCORE_BY_LABEL[e.mood] || 3)
      const avgScore = dayScores.length ? dayScores.reduce((a, b) => a + b) / dayScores.length : null
      
      trendData.push({
        day: dayAbbr(date),
        score: avgScore
      })
    }

    // Emoji frequency data
    const freqData = Object.entries(moodCounts)
      .map(([mood, count]) => ({ mood, count, label: getMoodLabel(mood) }))
      .sort((a, b) => b.count - a.count)

    // Mood distribution data
    const totalEntries = currentWeekEntries.length
    const distData = [
      { name: 'Positive', value: currentWeekEntries.filter(e => POSITIVE.includes(e.mood)).length },
      { name: 'Neutral', value: currentWeekEntries.filter(e => NEUTRAL.includes(e.mood)).length },
      { name: 'Negative', value: currentWeekEntries.filter(e => NEGATIVE.includes(e.mood)).length }
    ].filter(item => item.value > 0)

    // Positive vs Negative by day
    const posNegByDay = trendData.map(dayData => {
      const date = new Date(currentWeekStart)
      const dayIndex = trendData.indexOf(dayData)
      date.setDate(currentWeekStart.getDate() + dayIndex)
      
      const dayEntries = currentWeekEntries.filter(e => dayKey(new Date(e.date)) === dayKey(date))
      
      return {
        day: dayData.day,
        positive: dayEntries.filter(e => POSITIVE.includes(e.mood)).length,
        neutral: dayEntries.filter(e => NEUTRAL.includes(e.mood)).length,
        negative: dayEntries.filter(e => NEGATIVE.includes(e.mood)).length
      }
    })

    return {
      weeklyAvg,
      prevAvg,
      wowDelta,
      top3,
      consistencyLabel,
      shifts,
      trendData,
      freqData,
      distData,
      posNegByDay
    }
  }, [allEntries])

  return (
    <AuthGuard>
      <style>{`
        .insights-main-container {
          padding: 24px;
          margin-left: 260px; /* Account for fixed sidebar */
          min-height: 100vh;
          background-color: #f9fafb;
        }

        @media (max-width: 768px) {
          .insights-main-container {
            padding: 16px;
            margin-left: 0;
          }
        }

        .insights-content-wrapper {
          max-width: 1200px;
          width: 100%;
        }

        .insights-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .insights-page-title {
          font-size: 1.26rem;
          font-weight: 700;
          color: var(--neutral-dark);
          margin: 0 0 0.5rem 0;
          text-align: left;
        }

        .insights-page-subtitle {
          color: var(--neutral-medium);
          font-size: 1.1rem;
          margin: 0;
        }

        .no-data-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .no-data-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .no-data-state h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--neutral-dark);
          margin: 0 0 1rem 0;
        }

        .no-data-state p {
          color: var(--neutral-medium);
          font-size: 1rem;
          margin: 0;
          max-width: 400px;
          margin: 0 auto;
        }
      `}</style>
      
      <AppSidebar />
      
      <div className="insights-main-container">
        <div className="insights-content-wrapper">
          <header className="insights-header">
            <h1 className="insights-page-title">Weekly Insights</h1>
          </header>
            
            {/* Check if there's any data */}
            {/* {allEntries.length === 0 ? (
              <div className="no-data-state">
                <div className="no-data-icon">📊</div>
                <h2>No mood data available</h2>
                <p>Start logging your moods to see insightful analytics and trends!</p>
              </div>
            ) : ( */}
              {/* Main metrics grid */}
              <div className="insights-grid">
                <WeeklyAverage weeklyAvg={weeklyAvg} wowDelta={wowDelta} />
                <TopMoods top3={top3} />
                <Consistency consistencyLabel={consistencyLabel} shifts={shifts} />
                <EmojiFrequency freqData={freqData} />
                <MoodDistribution distData={distData} />
              </div>
              
              {/* Wide charts grid */}
              <div className="insights-grid-wide">
                <WeeklyMoodTrend trendData={trendData} />
                <PositiveVsNegative posNegByDay={posNegByDay} />
              </div>
            {/* )} */}
        </div>
      </div>
    </AuthGuard>
  )
}

// Helper function to get mood label
function getMoodLabel(emoji) {
  const labels = {
    "😭": "Crying",
    "😢": "Sad", 
    "😞": "Disappointed",
    "😕": "Slightly Sad",
    "😐": "Neutral",
    "🙂": "Slight Smile",
    "😊": "Happy",
    "😃": "Very Happy", 
    "😄": "Grinning",
    "🤩": "Excited",
    "😍": "Love"
  }
  return labels[emoji] || "Unknown"
}

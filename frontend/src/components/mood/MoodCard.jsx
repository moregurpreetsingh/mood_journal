import React from "react"

export default function MoodCard({ entry }) {
  // entry fields: { _id, userId, date, mood, note, createdAt }
  const dateStr = entry.date ? new Date(entry.date).toLocaleString() : (entry.createdAt ? new Date(entry.createdAt).toLocaleString() : "")
  return (
    <div className="border rounded-md p-3 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{entry.mood}</div>
        <div className="text-xs text-gray-500">{dateStr}</div>
      </div>
      {entry.note && <p className="mt-2 text-sm text-gray-700">{entry.note}</p>}
    </div>
  )
}

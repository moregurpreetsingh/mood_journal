"use client"

export function MoodToday({ entry }) {
  if (!entry) {
    return <p className="italic text-slate-600">No mood logged yet today.</p>
  }

  return (
    <div className="flex items-center gap-6">
      <span className="text-7xl" role="img" aria-label={entry.label} title={entry.label}>
        {entry.emoji}
      </span>
      <div>
        <p className="text-xl font-semibold text-blue-700">{entry.label}</p>
        <p className="mt-1 text-sm text-slate-600">{new Date(entry.timestamp).toLocaleString()}</p>
      </div>
    </div>
  )
}

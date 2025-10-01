"use client"

export function MoodRecent({ entries }) {
  if (!entries.length) {
    return <p className="italic text-slate-600">No mood entries yet.</p>
  }

  return (
    <ul
      role="list"
      className="max-h-72 overflow-y-auto rounded-lg border border-slate-200"
      aria-label="Recent mood entries"
    >
      {entries.map((entry, idx) => (
        <li
          key={`${entry.timestamp}-${idx}`}
          className="flex items-center gap-5 border-b border-slate-200 bg-white p-4 last:border-b-0 hover:bg-slate-50"
        >
          <span role="img" aria-label={entry.label} className="text-4xl" title={entry.label}>
            {entry.emoji}
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-medium text-slate-900">{entry.label}</p>
            <p className="text-sm text-slate-600">{new Date(entry.timestamp).toLocaleString()}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

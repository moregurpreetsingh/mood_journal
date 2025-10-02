"use client"

export function MoodPicker({ moods, onSelect, onClose, title }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-slate-600 hover:text-red-600"
          >
            ✕
          </button>
        </div>

        {/* Mood Grid */}
        <div className="grid grid-cols-4 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => onSelect(mood)}
              className="flex flex-col items-center justify-center rounded-md border border-slate-200 p-3 hover:bg-slate-100"
              title={mood.label}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-xs mt-1 text-slate-700">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

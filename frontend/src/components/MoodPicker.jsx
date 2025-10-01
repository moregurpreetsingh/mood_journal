"use client"

import { useEffect, useRef } from "react"

export function MoodPicker({ moods, onSelect, onClose, title }) {
  const dialogRef = useRef(null)
  const firstButtonRef = useRef(null)

  useEffect(() => {
    firstButtonRef.current?.focus()
    function onKeyDown(e) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mood-picker-title"
      ref={dialogRef}
      onMouseDown={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <h3 id="mood-picker-title" className="text-xl font-semibold">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            aria-label="Close mood picker"
            title="Close"
          >
            {"×"}
          </button>
        </div>

        <div className="mt-5 grid grid-cols-5 gap-4">
          {moods.map((mood, idx) => (
            <button
              key={mood.label}
              ref={idx === 0 ? firstButtonRef : undefined}
              type="button"
              onClick={() => onSelect(mood)}  // triggers on emoji click
              className="group rounded-lg border border-slate-200 bg-white p-4 text-3xl transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              aria-label={mood.label}
              title={mood.label}
            >
              <span aria-hidden="true">{mood.emoji}</span>
              <span className="sr-only">{mood.label}</span>
              <span className="mt-2 block text-center text-xs font-medium text-slate-600 group-hover:text-slate-800">
                {mood.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

import React from 'react';

const moods = [
  { date: '2025-10-01', icon: '😊', score: 8, note: 'Good day!' },
  { date: '2025-09-30', icon: '😐', score: 5, note: 'Okay, nothing special.' },
  { date: '2025-09-29', icon: '😞', score: 3, note: 'A bit rough today.' },
  // Add more moods as needed
];

export default function RecentMoods() {
  return (
    <section className="recentMoodsContainer" aria-label="Recent moods list">
      {moods.map(({ date, icon, score, note }) => (
        <div
          key={date}
          tabIndex={0}
          className="moodEntry"
          role="listitem"
          aria-label={`Mood on ${date}: ${note}`}
        >
          <time className="entryDate" dateTime={date}>
            {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </time>
          <span className="entryMoodIcon" aria-hidden="true">{icon}</span>
          <div className="scoreChip" aria-label={`Mood score: ${score}`}>
            {score}
          </div>
          <p className="note">{note}</p>
        </div>
      ))}
    </section>
  );
}

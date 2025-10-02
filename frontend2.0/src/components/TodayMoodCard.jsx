import React from 'react';

export default function TodayMoodCard() {
  return (
    <section className="todayMoodCard" aria-label="Today's mood">
      <header className="todayMoodHeader">
        <div className="todayMoodIcon" aria-hidden="true">😄</div>
        <h2 className="todayMoodLabel">Happy</h2>
        <time className="todayMoodTimestamp" dateTime="2025-10-02T10:30">10:30 AM</time>
      </header>
      <div className="sparklineContainer" aria-label="7-day mood sparkline chart">
        {/* Insert sparkline chart here */}
        <svg width="100%" height="50" role="img" aria-hidden="true">
          <polyline
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            points="0,40 10,30 20,35 30,25 40,20 50,15 60,10"
          />
        </svg>
      </div>
      <button className="primaryButton" type="button">Add Mood</button>
    </section>
  );
}

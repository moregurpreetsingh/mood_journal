import React from 'react';

const insights = [
  {
    title: 'Average Mood',
    description: 'Your average mood this week',
    value: '7.5',
    delta: '+0.5',
    deltaType: 'positive',
  },
  {
    title: 'Stress Level',
    description: 'Average stress score',
    value: '3.2',
    delta: '-0.2',
    deltaType: 'negative',
  },
  {
    title: 'Sleep Quality',
    description: 'Average sleep hours',
    value: '7.1',
    delta: '0',
    deltaType: 'neutral',
  },
];

export default function WeeklyInsights() {
  return (
    <section className="weeklyInsightsContainer" aria-label="Weekly insights">
      {insights.map(({ title, description, value, delta, deltaType }) => (
        <article
          key={title}
          className="insightCard"
          tabIndex={0}
          aria-describedby={`${title}-desc`}
        >
          <h3>{title}</h3>
          <p id={`${title}-desc`} className="insightDescription">{description}</p>
          <div className="valueDelta">
            <span className="value">{value}</span>
            {deltaType === 'positive' && (
              <span className="deltaPositive" aria-label="Positive change">{delta}</span>
            )}
            {deltaType === 'negative' && (
              <span className="deltaNegative" aria-label="Negative change">{delta}</span>
            )}
            {deltaType === 'neutral' && <span>{delta}</span>}
          </div>
          <div className="chartContainer" aria-hidden="true">
            {/* Placeholder for chart */}
            <svg width="100%" height="80">
              <rect width="100%" height="80" fill="#f3f4f6" />
            </svg>
          </div>
          <a href="/insights" className="link">View full insights</a>
        </article>
      ))}
    </section>
  );
}

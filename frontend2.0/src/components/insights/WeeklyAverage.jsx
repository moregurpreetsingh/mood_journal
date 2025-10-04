import './insights.css';

export function WeeklyAverage({ weeklyAvg, wowDelta }) {
  return (
    <div className="insight-card" aria-label="Weekly average mood">
      <header className="insight-card-header">
        <h3>Weekly Average</h3>
      </header>
      <div className="insight-card-content">
        <div className="metric-large">{weeklyAvg.toFixed(1)}</div>
        <div className={`metric-subtitle ${wowDelta >= 0 ? 'metric-positive' : 'metric-negative'}`}>
          {wowDelta >= 0 ? '↗' : '↘'} {Math.abs(wowDelta).toFixed(1)} vs last week
        </div>
      </div>
    </div>
  )
}
  
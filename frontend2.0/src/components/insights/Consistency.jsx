import './insights.css';

export function Consistency({ consistencyLabel, shifts }) {
  return (
    <div className="insight-card" aria-label="Consistency score">
      <header className="insight-card-header">
        <h3>Consistency</h3>
      </header>
      <div className="insight-card-content">
        <div className="metric-large">{consistencyLabel}</div>
        <div className="metric-subtitle">
          {shifts} mood shift{shifts === 1 ? '' : 's'} this week
        </div>
      </div>
    </div>
  )
}
  
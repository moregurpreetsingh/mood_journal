import './insights.css';

export function TopMoods({ top3 }) {
  return (
    <div className="insight-card" aria-label="Top moods of the week">
      <header className="insight-card-header">
        <h3>Top Moods</h3>
      </header>
      <div className="insight-card-content">
        {top3.length ? (
          <ul className="insight-list">
            {top3.map((t) => (
              <li key={t.label} className="insight-list-item">
                <div className="insight-list-content">
                  <span
                    role="img"
                    aria-label={t.label}
                    title={t.label}
                    className="insight-emoji"
                  >
                    {t.emoji}
                  </span>
                  <span className="insight-label">{t.label}</span>
                </div>
                <span className="insight-percentage">{t.pct.toFixed(0)}%</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-data">
            <p>No moods logged this week yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
  
import React, { useEffect, useState } from 'react';
import { getTopMoods } from '../../services/api';
import { useUser } from "../../contexts/UserContext";

const moods = [
  { id: 'happy', emoji: '😄', label: 'Happy' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'angry', emoji: '😠', label: 'Angry' },
  { id: 'surprised', emoji: '😲', label: 'Surprised' },
  { id: 'calm', emoji: '😌', label: 'Calm' },
  { id: 'anxious', emoji: '😰', label: 'Anxious' },
  { id: 'excited', emoji: '🤩', label: 'Excited' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
  { id: 'bored', emoji: '😐', label: 'Bored' },
  { id: 'confused', emoji: '😕', label: 'Confused' },
  { id: 'love', emoji: '😍', label: 'Love' },
  { id: 'grateful', emoji: '🙏', label: 'Grateful' },
  { id: 'sick', emoji: '🤒', label: 'Sick' },
  { id: 'frustrated', emoji: '😤', label: 'Frustrated' },
  { id: 'nervous', emoji: '😬', label: 'Nervous' },
  { id: 'relaxed', emoji: '😎', label: 'Relaxed' },
  { id: 'sleepy', emoji: '😪', label: 'Sleepy' },
  { id: 'shy', emoji: '😳', label: 'Shy' },
  { id: 'proud', emoji: '😌', label: 'Proud' },
  { id: 'hopeful', emoji: '🤞', label: 'Hopeful' },
];

export function TopMoods() {
  const { userId } = useUser();
  const [top3, setTop3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopMoods = async () => {
      try {
        const response = await getTopMoods({ userId });
        if (response.status === 200 && Array.isArray(response.data)) {
          // Calculate total frequency for percentages
          const total = response.data.reduce((sum, item) => sum + item.frequency, 0);

          // Map moods with emoji and label, and calculate percentage
          const moodsWithPct = response.data.map(({ mood, frequency }) => {
            const moodInfo = moods.find(m => m.id === mood) || { emoji: '❓', label: 'Unknown' };
            return {
              label: moodInfo.label,
              emoji: moodInfo.emoji,
              pct: (frequency / total) * 100,
            };
          });

          setTop3(moodsWithPct);
        } else {
          setError('Failed to fetch moods');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching moods');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTopMoods();
    }
  }, [userId]);

  if (loading) return <div className="insight-card">Loading...</div>;
  if (error) return <div className="insight-card">Error: {error}</div>;

  return (
    <>
      <style>{`
        .insight-card {
          padding: 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 0 5px rgba(0,0,0,0.1);
          max-width: 400px;
        }
        .insight-card-header h3 {
          margin: 0 0 1rem 0;
          font-size: 1.25rem;
        }
        .insight-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .insight-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
        }
        .insight-list-item:last-child {
          border-bottom: none;
        }
        .insight-list-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .insight-emoji {
          position: relative;
          cursor: pointer;
          font-size: 1.5rem;
        }
        .emoji-label {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--neutral-dark, #333);
          color: white;
          padding: 3px 6px;
          border-radius: 4px;
          font-size: 0.75rem;
          white-space: nowrap;
          transition: opacity 0.2s ease-in-out;
          pointer-events: none;
          z-index: 10;
        }
        .insight-emoji:hover .emoji-label {
          visibility: visible;
          opacity: 1;
        }
        .insight-percentage {
          font-weight: 600;
          color: var(--neutral-medium, #666);
          min-width: 40px;
          text-align: right;
        }
      `}</style>

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
                      <span className="emoji-label">{t.label}</span>
                    </span>
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
    </>
  );
}

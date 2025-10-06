import { useEffect, useState, useRef } from 'react';
import './insights.css';
import { getWeeklyAverage } from '../../services/api';
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

export function WeeklyAverage() {
  const { userId } = useUser();

  const [weeklyAvg, setWeeklyAvg] = useState(null);
  const [wowDelta, setWowDelta] = useState(null);
  const [topMood, setTopMood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const didFetch = useRef(false);

  useEffect(() => {
    if (!userId || didFetch.current) return;

    const fetchWeeklyAverage = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getWeeklyAverage({ userId });
        const data = response.data;

        if (data.statusCodeValue === 200) {
          const { averageScore, topMood } = data.body;
          const avg = parseFloat(averageScore);

          setWeeklyAvg(avg);
          setTopMood(topMood);

          const lastWeekAvg = 5.0;
          setWowDelta(avg - lastWeekAvg);

          didFetch.current = true;
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyAverage();
  }, [userId]);

  const moodEmoji = moods.find((m) => m.id === topMood)?.emoji || '❓';

  if (loading) return <div className="insight-card">Loading...</div>;
  if (error) return <div className="insight-card">Error: {error}</div>;

  return (
    <div className="insight-card" aria-label="Weekly average mood">
      <header className="insight-card-header">
        <h3>Weekly Average</h3>
      </header>
      <div className="insight-card-content">
        <div className="top-mood-emoji" style={{ fontSize: '2rem' }}>
          {moodEmoji}
        </div>
        <div className="metric-large">{weeklyAvg.toFixed(1)}</div>
        <div className={`metric-subtitle ${wowDelta >= 0 ? 'metric-positive' : 'metric-negative'}`}>
          {wowDelta >= 0 ? '↗' : '↘'} {Math.abs(wowDelta).toFixed(1)} vs last week
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import './insights.css';
import { getMoodShifts } from '../../services/api';
import { useUser } from "../../contexts/UserContext";

export function Consistency() {
  const { userId } = useUser();
  const [shifts, setShifts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to convert shifts count to label
  const getConsistencyLabel = (count) => {
    if (count === 0) return 'Perfect';
    if (count <= 2) return 'Stable';
    if (count <= 5) return 'Variable';
    return 'Unstable';
  };

  useEffect(() => {
    const fetchMoodShifts = async () => {
      try {
        const response = await getMoodShifts({ userId });
        if (response.status === 200 && typeof response.data === 'number') {
          setShifts(response.data);
        } else {
          setError('Failed to fetch mood shifts');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching mood shifts');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchMoodShifts();
    }
  }, [userId]);

  if (loading) return <div className="insight-card">Loading...</div>;
  if (error) return <div className="insight-card">Error: {error}</div>;

  const consistencyLabel = getConsistencyLabel(shifts);

  // Convert label to css class (lowercase)
  const labelClass = consistencyLabel.toLowerCase();

  return (
    <div className="insight-card" aria-label="Consistency score">
      <header className="insight-card-header">
        <h3>Consistency</h3>
      </header>
      <div className="insight-card-content">
        <div className={`metric-large ${labelClass}`}>{consistencyLabel}</div>
        <div className="metric-subtitle">
          {shifts} mood shift{shifts === 1 ? '' : 's'} this week
        </div>
      </div>
    </div>
  );
}

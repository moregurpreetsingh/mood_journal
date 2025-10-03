import React, { useState, useEffect } from "react";
import MoodPickerDialog from "../../components/MoodPickerDialog";
import { mostRecentTodayMood, mostRecentMoods } from "../../services/Api";
import { useUser } from "../../contexts/UserContext";
import SideMenu from "../../components/SideMenu";

export default function DashboardPage() {
  const { userId } = useUser();

  const moodEmojiMap = {
    Happy: "😄",
    Sad: "😢",
    Angry: "😠",
    Surprised: "😲",
    Calm: "😌",
    Anxious: "😰",
    Excited: "🤩",
    Tired: "😴",
    Bored: "😐",
    Confused: "😕",
    Love: "😍",
    Grateful: "🙏",
    Sick: "🤒",
    Frustrated: "😤",
    Nervous: "😬",
    Relaxed: "😎",
    Sleepy: "😪",
    Shy: "😳",
    Proud: "😌",
    Hopeful: "🤞",
  };

  const [todaysMood, setTodaysMood] = useState({
    emoji: "😕",
    label: "Confused",
    timestamp: new Date().toLocaleString(),
  });

  const [recentMoods, setRecentMoods] = useState([]);
  const [isPickerOpen, setIsPickerOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [error, setError] = useState(null);
  const [errorRecent, setErrorRecent] = useState(null);

  // Load today's mood from API
  const loadTodaysMood = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await mostRecentTodayMood({ userId });
      const data = response.data;
      if (data && data.mood) {
        setTodaysMood({
          emoji: moodEmojiMap[data.mood] || "❓",
          label: data.mood,
          timestamp: data.formattedDate,
        });
      }
    } catch (err) {
      setError("Failed to load today's mood.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load recent moods from API
  const loadRecentMoods = async () => {
    setLoadingRecent(true);
    setErrorRecent(null);
    try {
      const response = await mostRecentMoods({ userId });
      const data = response.data;
      if (Array.isArray(data)) {
        const mapped = data.map((item) => ({
          id: item.id,
          label: item.mood,
          emoji: moodEmojiMap[item.mood] || "❓",
          timestamp: item.formattedDate,
        }));
        setRecentMoods(mapped);
      } else {
        setRecentMoods([]);
      }
    } catch (err) {
      setErrorRecent("Failed to load recent moods.");
      console.error(err);
    } finally {
      setLoadingRecent(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadTodaysMood();
      loadRecentMoods();
    }
  }, [userId]);

  // Handle mood selection from dialog
  const handleMoodSelect = async (moodLabel) => {
    try {
      setTodaysMood({
        emoji: moodEmojiMap[moodLabel] || "❓",
        label: moodLabel,
        timestamp: new Date().toLocaleString(),
      });
      setIsPickerOpen(false);
      await loadTodaysMood();
      await loadRecentMoods();
    } catch (error) {
      console.log("Error loading moods:", error);
    }
  };

  return (
    <>
      <style>{`
        /* Existing styles */

        .dashboard-wrapper {
          display: flex;
          min-height: 100vh;
          background-color: #f9fafb;
        }

        .side-menu-container {
          flex-shrink: 0;
          width: 250px;
          background-color: white;
          box-shadow: 2px 0 5px rgba(0,0,0,0.1);
          border-radius: 0 24px 24px 0;
        }

        .dashboard-container {
          flex-grow: 1;
          padding: 24px;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .dashboard-wrapper {
            flex-direction: column;
          }
          .side-menu-container {
            width: 100%;
            border-radius: 0 0 24px 24px;
            box-shadow: none;
          }
          .dashboard-container {
            padding: 16px;
          }
        }

        .dashboard-content {
          max-width: 80rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .dashboard-header {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .dashboard-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          }
        }
        .dashboard-header > div:first-child h1 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }
        .dashboard-header > div:first-child p {
          margin-top: 4px;
          color: #6b7280;
          font-size: 1rem;
        }
        .header-buttons {
          display: flex;
          gap: 16px;
        }
        @media (max-width: 639px) {
          .header-buttons {
            flex-direction: column;
          }
        }
        .button-primary {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: #000000;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 1rem;
          transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }
        
        .button-primary:hover {
          background-color: #111111;
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
        }
        
        .button-primary:active {
          background-color: #1a1a1a;
          transform: scale(0.98);
          box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.3);
        }
        
        .button-primary:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.4);
        }
        
        .button-secondary {
          background-color: transparent;
          border: 1px solid #9ca3af;
          color: #4b5563;
          padding: 10px 20px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1rem;
          font-weight: 600;
          outline: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .button-secondary:hover {
          background-color: #f3f4f6;
          border-color: #6b7280;
          color: #1f2937;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        
        .button-secondary:active {
          background-color: #e5e7eb;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
          transform: scale(0.98);
        }
        
        .button-secondary:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.4);
        }
        
        .card {
          background-color: white;
          border-radius: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 24px;
        }
        .todays-mood-title {
          font-weight: 700;
          margin-bottom: 16px;
          font-size: 1.125rem;
        }
        .todays-mood-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .todays-mood-emoji {
          font-size: 3rem;
        }
        .todays-mood-label {
          color: #333333;
          font-weight: 600;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
          font-size: 1.125rem;
          text-align: left;
          transition: text-decoration 0.2s ease;
        }
        .todays-mood-label:hover,
        .todays-mood-label:focus {
          text-decoration: underline;
          outline: none;
        }
        .todays-mood-timestamp {
          margin-top: 4px;
          font-size: 0.875rem;
          color: #6b7280;
        }
        .recent-moods-title {
          font-weight: 700;
          margin-bottom: 16px;
          font-size: 1.125rem;
        }
        .recent-moods-list {
          max-height: 15rem;
          overflow-y: auto;
        }
        .recent-mood-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .recent-mood-item:last-child {
          border-bottom: none;
        }
        .recent-mood-emoji {
          font-size: 1.5rem;
        }
        .recent-mood-text {
          display: flex;
          flex-direction: column;
        }
        .recent-mood-label {
          font-weight: 500;
          font-size: 1rem;
          margin: 0;
        }
        .recent-mood-timestamp {
          font-size: 0.75rem;
          color: #6b7280;
          margin: 2px 0 0;
        }
        .recent-moods-list::-webkit-scrollbar {
          width: 8px;
        }
        .recent-moods-list::-webkit-scrollbar-thumb {
          background-color: rgba(107, 114, 128, 0.4);
          border-radius: 4px;
        }
        .recent-moods-list::-webkit-scrollbar-track {
          background: transparent;
        }
        button:focus,
        button:focus-visible {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }
      `}</style>

      <div className="dashboard-wrapper">
        <aside className="side-menu-container">
          <SideMenu />
        </aside>

        <div className="dashboard-container">
          <div className="dashboard-content">
            {/* Header */}
            <header className="dashboard-header">
              <div>
                <h1>Mood Journal Dashboard</h1>
                <p>Track how you feel and review recent entries.</p>
              </div>
              <div className="header-buttons">
                <button
                  className="button-primary"
                  onClick={() => setIsPickerOpen(true)}
                  aria-label="Log your mood"
                >
                  Log your mood
                </button>
                <button
                  className="button-secondary"
                  onClick={() => alert("Clear history clicked")}
                  aria-label="Clear history"
                >
                  Clear history
                </button>
              </div>
            </header>

            {/* Today's Mood Card */}
            <section className="card" aria-labelledby="todays-mood-title">
              <h2 id="todays-mood-title" className="todays-mood-title">
                Today's mood
              </h2>
              {loading ? (
                <p>Loading today's mood...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : (
                <div className="todays-mood-content">
                  <span className="todays-mood-emoji">{todaysMood.emoji}</span>
                  <div>
                    <button
                      type="button"
                      className="todays-mood-label"
                      onClick={() => alert(`Clicked mood: ${todaysMood.label}`)}
                    >
                      {todaysMood.label}
                    </button>
                    <p className="todays-mood-timestamp">{todaysMood.timestamp}</p>
                  </div>
                </div>
              )}
            </section>

            {/* Recent Moods Card */}
            <section className="card" aria-labelledby="recent-moods-title">
              <h2 id="recent-moods-title" className="recent-moods-title">
                Recent moods
              </h2>
              {loadingRecent ? (
                <p>Loading recent moods...</p>
              ) : errorRecent ? (
                <p style={{ color: "red" }}>{errorRecent}</p>
              ) : recentMoods.length === 0 ? (
                <p>No recent moods found.</p>
              ) : (
                <div
                  className="recent-moods-list"
                  role="list"
                  aria-label="Recent moods list"
                >
                  {recentMoods.map(({ id, emoji, label, timestamp }) => (
                    <div key={id} role="listitem" className="recent-mood-item">
                      <span className="recent-mood-emoji">{emoji}</span>
                      <div className="recent-mood-text">
                        <p className="recent-mood-label">{label}</p>
                        <p className="recent-mood-timestamp">{timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Mood Picker Dialog */}
          <MoodPickerDialog
            isOpen={isPickerOpen}
            onClose={() => setIsPickerOpen(false)}
            onSelect={handleMoodSelect}
            userId={userId}
          />
        </div>
      </div>
    </>
  );
}

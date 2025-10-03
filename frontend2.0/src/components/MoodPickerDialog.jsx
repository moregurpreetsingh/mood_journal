import React, { useEffect, useRef, useState } from 'react';
import { saveCurrentMood } from '../services/Api'; 
import '../app/MoodTracker.css';

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

export default function MoodPickerDialog({ isOpen, onClose, userId, onSelect }) {
  const dialogRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const moodButtonsRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(0);
      setTimeout(() => {
        moodButtonsRefs.current[0]?.focus();
      }, 0);

      function handleKeyDown(e) {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      }

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  async function handleSelectMood(moodId) {
    const moodObj = moods.find(m => m.id === moodId);
    if (!moodObj) return;
  
    try {
      await saveCurrentMood({ userId, mood: moodObj.label });
  
      if (typeof onSelect === 'function') {
        await onSelect(moodObj.label);  
      }
  
      onClose();
    } catch (err) {
      console.error('Failed to save mood:', err);
    }
  }
  

  function onMoodKeyDown(e) {
    const cols = 5;
    let nextIndex = focusedIndex;

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (focusedIndex + 1) % moods.length;
        break;
      case 'ArrowLeft':
        nextIndex = (focusedIndex - 1 + moods.length) % moods.length;
        break;
      case 'ArrowDown':
        nextIndex = (focusedIndex + cols) % moods.length;
        break;
      case 'ArrowUp':
        nextIndex = (focusedIndex - cols + moods.length) % moods.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = moods.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSelectMood(moods[focusedIndex].id);
        return;
      default:
        return;
    }
    e.preventDefault();
    setFocusedIndex(nextIndex);
    moodButtonsRefs.current[nextIndex]?.focus();
  }

  if (!isOpen) return null;

  return (
    <div
      className="mood-picker-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mood-picker-title"
      ref={dialogRef}
      tabIndex={-1}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <section className="mood-picker-container">
        <h2 id="mood-picker-title">Select Your Mood</h2>
        <div
          role="list"
          className="mood-grid"
          aria-label="Mood options"
        >
          {moods.map((mood, idx) => (
            <button
              key={mood.id}
              role="listitem"
              type="button"
              aria-label={mood.label}
              aria-selected={focusedIndex === idx}
              tabIndex={focusedIndex === idx ? 0 : -1}
              ref={(el) => (moodButtonsRefs.current[idx] = el)}
              onClick={() => handleSelectMood(mood.id)}
              onKeyDown={onMoodKeyDown}
              className="mood-button"
              style={{
                border:
                  focusedIndex === idx
                    ? '2px solid var(--primary)'
                    : undefined,
                boxShadow:
                  focusedIndex === idx
                    ? '0 0 8px var(--primary)'
                    : undefined,
                background:
                  focusedIndex === idx
                    ? 'var(--neutral-light)'
                    : undefined,
              }}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import "./EsportsCards.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function EsportsCards() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let abort = new AbortController();
    fetchTournaments(abort.signal);

    // Poll every 15s to pick up admin changes
    const id = setInterval(() => {
      abort.abort();
      abort = new AbortController();
      fetchTournaments(abort.signal);
    }, 15000);

    // Refetch on tab focus or when tab becomes visible
    const onFocus = () => {
      abort.abort();
      abort = new AbortController();
      fetchTournaments(abort.signal);
    };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') onFocus();
    });

    return () => {
      clearInterval(id);
      abort.abort();
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onFocus);
    };
  }, []);

  const fetchTournaments = async (signal) => {
    try {
      const ts = Date.now(); // cache-busting to avoid stale caches
      const response = await fetch(`${API_URL}/api/tournaments?ts=${ts}`, { signal });
      if (response.ok) {
        const data = await response.json();
        setTournaments(data.items || []);
      } else {
        setError('Failed to load tournaments');
      }
    } catch (err) {
      console.error('Error fetching tournaments:', err);
      setError('Network error while loading tournaments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="cards">
        <div className="loading-message">Loading tournaments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cards">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchTournaments}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cards">
      {tournaments.map((t, i) => (
        <div key={t._id || i} className={`card ${t.color}`}>
          <img src={t.image} alt={t.game} />
          <div className="icon">{t.icon}</div>
          <h2>{t.game}</h2>
          <ul>
            {t.events.map((e, j) => (
              <li key={j}>{e}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default EsportsCards;

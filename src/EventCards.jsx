import React, { useEffect, useMemo, useState } from "react";
import PUBGBRRegistration from "./PUBGBRRegistration";
import "./PUBG.css";

// Base API URL (Vite env or localhost)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function EventCards() {
  const [openEvent, setOpenEvent] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [lastSyncMsg, setLastSyncMsg] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync any locally saved registrations to the database on mount
  useEffect(() => {
    flushLocalRegistrations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch tournaments from DB
  useEffect(() => {
    let abort = new AbortController();
    fetchTournaments(abort.signal);
    return () => abort.abort();
  }, []);

  async function fetchTournaments(signal) {
    setLoading(true);
    try {
      const ts = Date.now();
      const resp = await fetch(`${API_URL}/api/tournaments?ts=${ts}`, { signal });
      if (!resp.ok) throw new Error('Failed to load tournaments');
      const data = await resp.json();
      setTournaments(Array.isArray(data.items) ? data.items : []);
      setError(null);
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Fetch tournaments error:', e);
        setError('Network error while loading tournaments');
      }
    } finally {
      setLoading(false);
    }
  }

  // Build PUBG events from DB data
  const pubg = useMemo(
    () => tournaments.find((t) => /pubg/i.test(String(t.game))),
    [tournaments]
  );
  const events = useMemo(
    () => (pubg ? pubg.events.map((e) => `${pubg.game}: ${e}`) : []),
    [pubg]
  );

  async function flushLocalRegistrations() {
    setSyncing(true);
    setLastSyncMsg("");
    try {
      // Currently supporting PUBG local key; extend with more keys as needed
      const keys = ["pubg_registrations"]; 
      let total = 0, success = 0;

      for (const key of keys) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        let list = [];
        try { list = JSON.parse(raw) || []; } catch { list = []; }
        if (!Array.isArray(list) || list.length === 0) continue;

        total += list.length;
        const remaining = [];
        for (const item of list) {
          try {
            const resp = await fetch(`${API_URL}/api/registrations`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item),
            });
            if (resp.ok) {
              success += 1;
            } else {
              remaining.push(item); // keep unsent
            }
          } catch {
            remaining.push(item);
          }
        }
        if (remaining.length > 0) {
          localStorage.setItem(key, JSON.stringify(remaining));
        } else {
          localStorage.removeItem(key);
        }
      }

      if (total === 0) setLastSyncMsg("Nothing to sync.");
      else if (success === total) setLastSyncMsg(`Synced ${success}/${total} registrations to server.`);
      else setLastSyncMsg(`Partial sync: ${success}/${total} sent. We will retry pending items next time.`);
    } finally {
      setSyncing(false);
    }
  }

  return (

    <div className="cards-container">
      {/* Optional: manual retry sync */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <button className="submit-btn" disabled={syncing} onClick={flushLocalRegistrations}>
          {syncing ? 'Syncing…' : 'Sync local registrations'}
        </button>
        {lastSyncMsg && <small style={{ opacity: 0.8 }}>{lastSyncMsg}</small>}
      </div>
      {loading && <p>Loading events…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && events.length === 0 && (
        <p>No PUBG tournaments found.</p>
      )}
      {events.map((ev) => (
        <div key={ev} className="event-card" onClick={() => setOpenEvent(ev)}>
          <h3>{ev}</h3>
          <p>Click to register</p>
        </div>
      ))}

      {openEvent && (
        <div className="modal-overlay" onClick={() => setOpenEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <PUBGBRRegistration
              eventName={openEvent}
              gameTitle={pubg?.game || 'PUBG'}
              onClose={() => setOpenEvent(null)}
            />
          </div>
        </div>
      )}
    </div>
    );
}

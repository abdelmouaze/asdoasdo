import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { data as cardData } from './cardData';
import './RegistrationTable.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function fmtDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch { return iso || ''; }
}

export default function RegistrationTable() {
  const { eventName } = useParams();
  const location = useLocation();
  const decodedEventName = decodeURIComponent(eventName || '').trim();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const qs = decodedEventName ? `?game=${encodeURIComponent(decodedEventName)}` : '';
        const res = await fetch(`${API_URL}/api/registrations${qs}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data && Array.isArray(data.items)) {
            setRows(data.items);
            return;
          }
        }
      } catch {}
      try {
        const raw = localStorage.getItem('pubg_registrations');
        const list = raw ? JSON.parse(raw) : [];
        const target = (decodedEventName || '').toLowerCase().trim();
        const filtered = target ? list.filter((r) => (r.gameTitle || '').toLowerCase().trim() === target) : list;
        if (!cancelled) setRows(filtered);
      } catch {
        if (!cancelled) setRows([]);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [decodedEventName, location.key]);

  const flatCards = useMemo(() => cardData.flat(), []);
  const selectedCard = useMemo(() => {
    const target = (decodedEventName || '').toLowerCase().trim();
    return flatCards.find(c => (c.title || '').toLowerCase().trim() === target);
  }, [flatCards, decodedEventName]);

  const modeList = useMemo(() => {
    if (selectedCard && Array.isArray(selectedCard.description)) {
      return selectedCard.description;
    }
    return Array.from(new Set(rows.map(r => (r.eventName || 'Mode').trim())));
  }, [selectedCard, rows]);

  const extractShortMode = (label) => {
    const s = String(label || '');
    const idx = s.lastIndexOf(':');
    const short = idx >= 0 ? s.slice(idx + 1) : s;
    return short.trim();
  };

  const groups = modeList.map((modeLabel) => {
    const normFull = (modeLabel || '').toLowerCase().trim();
    const normShort = extractShortMode(modeLabel).toLowerCase();
    const list = rows.filter(r => {
      const ev = (r.eventName || '').toLowerCase().trim();
      return ev === normFull || ev === normShort;
    });
    return [modeLabel, list];
  });

  return ( 
    <div className="reg-page">
      <section className="reg-section">
        <div className="reg-container">
          <div className="reg-header">
            <h1 className="reg-title">Registrations — {decodedEventName || 'All'}</h1>
            <Link to="/" className="reg-back">← Back</Link>
          </div>

          {modeList.length === 0 ? (
            <p className="empty-cell">No modes found for this game.</p>
          ) : (
            <div className="mode-grid">
              {groups.map(([modeName, list]) => (
                <div className="mode-card" key={modeName}>
                  <h2 className="mode-title">{modeName}</h2>
                  <div className="table-wrap">
                    <table className="reg-table">
                      <thead className="reg-thead">
                        <tr>
                          {['#','Player ID','Player Name'].map((h) => (
                            <th key={h} className="reg-th">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="reg-tbody">
                        {list.map((r, idx) => (
                          <tr key={r.id || idx}>
                            <td className="reg-td">{idx + 1}</td>
                            <td className="reg-td">{r.ingameID}</td>
                            <td className="reg-td">{r.fullName}</td>
                          </tr>
                        ))}
                        {list.length === 0 && (
                          <tr>
                            <td colSpan={3} className="empty-cell">No registrations yet for this mode.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

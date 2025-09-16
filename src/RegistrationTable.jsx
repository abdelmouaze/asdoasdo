import React, { useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

function fmtDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch { return iso || ''; }
}

export default function RegistrationTable() {
  const { eventName } = useParams();
  const location = useLocation();
  const decodedEventName = decodeURIComponent(eventName || '');

  // For now we persist registrations in localStorage under this key from PUBGBRRegistration.jsx
  const rows = useMemo(() => {
    try {
      const raw = localStorage.getItem('pubg_registrations');
      const list = raw ? JSON.parse(raw) : [];
      if (!decodedEventName) return list;
      return list.filter((r) => (r.eventName || '').toLowerCase() === decodedEventName.toLowerCase());
    } catch {
      return [];
    }
  }, [decodedEventName, location.key]);

  return (
    <section style={{ padding: '32px 16px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
          <h1 style={{ color: '#fff', margin: 0 }}>Registrations — {decodedEventName || 'All'}</h1>
          <Link to="/" style={{ color: '#a78bfa', textDecoration: 'none', border: '1px solid rgba(167,139,250,.4)', padding: '8px 12px', borderRadius: 8 }}>← Back</Link>
        </div>

        {rows.length === 0 ? (
          <p style={{ color: '#cbd5e1' }}>No registrations found yet for this game/mode.</p>
        ) : (
          <div style={{ overflowX: 'auto', border: '1px solid rgba(148,163,184,.25)', borderRadius: 12 }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, color: '#e5e7eb' }}>
              <thead style={{ background: 'rgba(30,41,59,.6)' }}>
                <tr>
                  {['#','Full Name','Email','Phone','Country','Team','In-game ID','Rank','Role','Created'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid rgba(148,163,184,.25)', color: '#fff' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={r.id || idx} style={{ background: idx % 2 ? 'rgba(15,23,42,.6)' : 'rgba(2,6,23,.4)' }}>
                    <td style={{ padding: '10px 12px' }}>{idx + 1}</td>
                    <td style={{ padding: '10px 12px' }}>{r.fullName}</td>
                    <td style={{ padding: '10px 12px' }}>{r.email}</td>
                    <td style={{ padding: '10px 12px' }}>{r.phone}</td>
                    <td style={{ padding: '10px 12px' }}>{r.country}</td>
                    <td style={{ padding: '10px 12px' }}>{r.teamName}</td>
                    <td style={{ padding: '10px 12px' }}>{r.ingameID}</td>
                    <td style={{ padding: '10px 12px' }}>{r.rank}</td>
                    <td style={{ padding: '10px 12px' }}>{r.role}</td>
                    <td style={{ padding: '10px 12px' }}>{fmtDate(r.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

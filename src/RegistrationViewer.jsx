import React, { useState, useEffect } from 'react';
import './RegistrationViewer.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function RegistrationViewer({ tournaments, token }) {
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Remove any leading URLs accidentally included in tournament.game
  const cleanTitle = (val) => {
    const s = String(val || '').trim();
    // If the string starts with a URL, strip it and keep the last token(s)
    if (/^https?:\/\//i.test(s)) {
      // split by space and drop the first token (URL)
      const parts = s.split(/\s+/);
      return parts.slice(1).join(' ').trim();
    }
    return s;
  };

  const normalize = (s) => String(s || '').toLowerCase().trim();

  useEffect(() => {
    if (tournaments.length > 0 && !selectedTournament) {
      setSelectedTournament(tournaments[0]);
    }
  }, [tournaments]);

  // Fetch ALL registrations once when component mounts (or token changes)
  useEffect(() => {
    fetchAllRegistrations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchAllRegistrations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/registrations`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAllRegistrations(data.items || []);
      } else {
        console.error('Failed to fetch registrations');
        setAllRegistrations([]);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setAllRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter client-side: by selected tournament (gameTitle) and searchTerm
  const filteredRegistrations = allRegistrations.filter(reg => {
    // Filter by selected tournament's game
    if (selectedTournament) {
      const gSel = cleanTitle(selectedTournament.game).toLowerCase().trim();
      const gReg = String(reg.gameTitle || '').toLowerCase().trim();
      if (gSel && gReg !== gSel) return false;
    }
    // Filter by search term
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      reg.fullName?.toLowerCase().includes(term) ||
      reg.email?.toLowerCase().includes(term) ||
      reg.ingameID?.toLowerCase().includes(term) ||
      reg.eventName?.toLowerCase().includes(term)
    );
  });

  const groupedRegistrations = filteredRegistrations.reduce((groups, reg) => {
    const eventName = reg.eventName || 'General';
    if (!groups[eventName]) {
      groups[eventName] = [];
    }
    groups[eventName].push(reg);
    return groups;
  }, {});

  // Build the event list: all events from the selected tournament, plus any extra names present in data
  const baseEvents = Array.isArray(selectedTournament?.events) ? selectedTournament.events : [];
  const extraEvents = Array.from(new Set(
    filteredRegistrations
      .map(r => r.eventName)
      .filter(Boolean)
      .map(normalize)
      .filter(nm => !baseEvents.some(be => normalize(be) === nm))
  ));
  const allEventNames = [
    ...baseEvents,
    ...extraEvents
  ];

  const exportToCSV = () => {
    if (filteredRegistrations.length === 0) return;

    const headers = ['Full Name', 'Email', 'Phone', 'In-Game ID', 'Event', 'Registration Date'];
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(reg => [
        `"${reg.fullName || ''}"`,
        `"${reg.email || ''}"`,
        `"${reg.phone || ''}"`,
        `"${reg.ingameID || ''}"`,
        `"${reg.eventName || ''}"`,
        `"${new Date(reg.createdAt).toLocaleDateString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const fname = selectedTournament ? cleanTitle(selectedTournament.game) : 'all';
    a.download = `${fname}_registrations.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="registration-viewer">
      <div className="registration-header">
        <h2>Registration Management</h2>
        <div className="header-actions">
          <button onClick={exportToCSV} className="export-btn" disabled={filteredRegistrations.length === 0}>
            📊 Export CSV
          </button>
        </div>
      </div>

      <div className="registration-controls">
        <div className="tournament-selector">
          <label>Select Tournament:</label>
          <select
            value={selectedTournament?._id || ''}
            onChange={(e) => {
              const tournament = tournaments.find(t => t._id === e.target.value);
              setSelectedTournament(tournament);
            }}
          >
            {tournaments.map(tournament => (
              <option key={tournament._id} value={tournament._id}>
                {cleanTitle(tournament.game)}
              </option>
            ))}
          </select>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search registrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading registrations...</div>
      ) : (
        <div className="registration-content">
          <div className="registration-stats">
            <div className="stat-card">
              <h3>{filteredRegistrations.length}</h3>
              <p>Total Registrations</p>
            </div>
            <div className="stat-card">
              <h3>{allEventNames.length}</h3>
              <p>Active Events</p>
            </div>
            <div className="stat-card">
              <h3>{new Set(filteredRegistrations.map(r => r.email)).size}</h3>
              <p>Unique Players</p>
            </div>
          </div>

          <div className="events-container">
            {allEventNames.length === 0 && (
              <div className="empty-state">
                <p>No events configured for {cleanTitle(selectedTournament?.game) || 'this tournament'}.</p>
              </div>
            )}
            {allEventNames.map((eventName) => {
              const eventRegistrations = filteredRegistrations.filter(r => normalize(r.eventName) === normalize(eventName));
              return (
                <div key={eventName} className="event-section">
                  <h3 className="event-title">
                    {eventName} ({eventRegistrations.length} registrations)
                  </h3>
                  <div className="registrations-table-container">
                    <table className="registrations-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Player Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>In-Game ID</th>
                          <th>Registration Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eventRegistrations.map((reg, index) => (
                          <tr key={reg._id || index}>
                            <td>{index + 1}</td>
                            <td className="player-name">{reg.fullName || 'N/A'}</td>
                            <td className="email">{reg.email || 'N/A'}</td>
                            <td>{reg.phone || 'N/A'}</td>
                            <td className="ingame-id">{reg.ingameID || 'N/A'}</td>
                            <td className="date">{reg.createdAt ? new Date(reg.createdAt).toLocaleDateString() : 'N/A'}</td>
                          </tr>
                        ))}
                        {eventRegistrations.length === 0 && (
                          <tr>
                            <td colSpan={6} className="empty-cell">No registrations yet for this event.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

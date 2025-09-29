import React, { useState } from 'react';
import './TournamentManager.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function TournamentManager({ tournaments, token, onTournamentsChange }) {
  const [showForm, setShowForm] = useState(false);
  const [editingTournament, setEditingTournament] = useState(null);
  const [formData, setFormData] = useState({
    game: '',
    color: 'blue',
    icon: '🎮',
    events: [''],
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const colorOptions = ['red', 'blue', 'green', 'teal', 'purple', 'orange'];
  const iconOptions = ['🎮', '🔫', '🔥', '⚔️', '🧙', '🚗', '🏆', '⭐', '💎', '🎯'];

  const resetForm = () => {
    setFormData({
      game: '',
      color: 'blue',
      icon: '🎮',
      events: [''],
      image: ''
    });
    setEditingTournament(null);
    setShowForm(false);
    setError('');
  };

  const handleEdit = (tournament) => {
    setFormData({
      game: tournament.game,
      color: tournament.color,
      icon: tournament.icon,
      events: tournament.events.length > 0 ? tournament.events : [''],
      image: tournament.image
    });
    setEditingTournament(tournament);
    setShowForm(true);
  };

  const handleEventChange = (index, value) => {
    const newEvents = [...formData.events];
    newEvents[index] = value;
    setFormData({ ...formData, events: newEvents });
  };

  const addEvent = () => {
    setFormData({ ...formData, events: [...formData.events, ''] });
  };

  const removeEvent = (index) => {
    if (formData.events.length > 1) {
      const newEvents = formData.events.filter((_, i) => i !== index);
      setFormData({ ...formData, events: newEvents });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const cleanedData = {
        ...formData,
        events: formData.events.filter(event => event.trim() !== '')
      };

      const url = editingTournament 
        ? `${API_URL}/api/tournaments/${editingTournament._id}`
        : `${API_URL}/api/tournaments`;
      
      const method = editingTournament ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cleanedData)
      });

      const data = await response.json();

      if (response.ok) {
        onTournamentsChange();
        resetForm();
      } else {
        setError(data.error || 'Failed to save tournament');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Tournament save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tournament, permanent = false) => {
    const deleteType = permanent ? 'permanently delete' : 'hide';
    const warningMessage = permanent 
      ? `⚠️ PERMANENT DELETE: This will completely remove "${tournament.game}" from the database. This action cannot be undone!`
      : `Are you sure you want to hide "${tournament.game}"? (It will be hidden from public view but data will be preserved)`;
    
    if (!confirm(warningMessage)) {
      return;
    }

    try {
      const endpoint = permanent 
        ? `${API_URL}/api/tournaments/${tournament._id}/permanent`
        : `${API_URL}/api/tournaments/${tournament._id}`;
        
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        onTournamentsChange();
        alert(`Tournament ${permanent ? 'permanently deleted' : 'hidden'} successfully`);
      } else {
        const data = await response.json();
        alert(data.error || `Failed to ${deleteType} tournament`);
      }
    } catch (err) {
      alert('Network error. Please try again.');
      console.error('Tournament delete error:', err);
    }
  };

  const isUrlIcon = (val) => typeof val === 'string' && /^(https?:)?\/\//i.test(val);

  const mapColor = (val) => {
    if (!val) return '#4A5568';
    if (String(val).startsWith('#')) return val;
    const key = String(val).toLowerCase();
    const table = {
      red: '#e53e3e',
      blue: '#3182ce',
      green: '#38a169',
      teal: '#319795',
      purple: '#805ad5',
      orange: '#dd6b20',
      cyan: '#0891b2',
      "#ffaa00": '#ffaa00',
      "#005699": '#005699',
      "#b99660": '#b99660',
      "#aa432e": '#aa432e',
      "#ff455d": '#ff455d',
      "#1387fc": '#1387fc',
    };
    return table[key] || '#4A5568';
  };

  // Try to request pre-colored icons for known providers
  const tintableUrl = (iconUrl, colorHex) => {
    if (!iconUrl) return null;
    const hex = colorHex.replace('#', '');
    try {
      const url = new URL(iconUrl, window.location.origin);
      const host = url.hostname;
      // icons8 PNG supports &color=
      if (host.includes('icons8.com')) {
        url.searchParams.set('color', hex.toLowerCase());
        // ensure png format
        if (!url.searchParams.get('format')) url.searchParams.set('format', 'png');
        return url.toString();
      }
      // iconify supports ?color=%23HEX
      if (host.includes('iconify.design')) {
        url.searchParams.set('color', `#${hex}`);
        return url.toString();
      }
      return null; // unknown provider
    } catch {
      return null;
    }
  };

  const getIconNode = (t) => {
    const col = mapColor(t.color);
    if (isUrlIcon(t.icon)) {
      const tinted = tintableUrl(t.icon, col);
      const src = tinted || t.icon;
      return <img src={src} alt={t.game} className="ticon" />;
    }
    return <span style={{ color: col }}>{t.icon || '🎮'}</span>;
  };

  return (
    <div className="tournament-manager">
      <div className="tournament-header">
        <h2>Tournament Management</h2>
        <button 
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Tournament
        </button>
      </div>

      {showForm && (
        <div className="tournament-form-overlay">
          <div className="tournament-form-container">
            <div className="tournament-form-header">
              <h3>{editingTournament ? 'Edit Tournament' : 'Add New Tournament'}</h3>
              <button onClick={resetForm} className="close-btn">×</button>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="tournament-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Game Name</label>
                  <input
                    type="text"
                    value={formData.game}
                    onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Color Theme</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    disabled={loading}
                  >
                    {colorOptions.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Icon</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    disabled={loading}
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon} {icon}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Events</label>
                {formData.events.map((event, index) => (
                  <div key={index} className="event-input-row">
                    <input
                      type="text"
                      value={event}
                      onChange={(e) => handleEventChange(index, e.target.value)}
                      placeholder={`Event ${index + 1}`}
                      disabled={loading}
                    />
                    {formData.events.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeEvent(index)}
                        className="remove-event-btn"
                        disabled={loading}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={addEvent}
                  className="add-event-btn"
                  disabled={loading}
                >
                  + Add Event
                </button>
              </div>

              <div className="form-actions">
                <button type="button" onClick={resetForm} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingTournament ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="tournaments-grid">
        {tournaments.map(tournament => (
          <div key={tournament._id} className={`tournament-card ${tournament.color}`}>
            <img src={tournament.image} alt={tournament.game} />
            <div className="tournament-info">
              <div className="tournament-title">
                <span className="tournament-icon">{getIconNode(tournament)}</span>
                <h3>{tournament.game}</h3>
              </div>
              <div className="tournament-events">
                {tournament.events.map((event, index) => (
                  <span key={index} className="event-tag">{event}</span>
                ))}
              </div>
              <div className="tournament-actions">
                <button onClick={() => handleEdit(tournament)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(tournament, false)} className="hide-btn">
                  Hide
                </button>
                <button onClick={() => handleDelete(tournament, true)} className="delete-btn">
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tournaments.length === 0 && (
        <div className="empty-state">
          <p>No tournaments found. Add your first tournament to get started!</p>
        </div>
      )}
    </div>
  );
}

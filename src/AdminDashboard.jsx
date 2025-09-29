import React, { useState, useEffect } from 'react';
import TournamentManager from './TournamentManager';
import RegistrationViewer from './RegistrationViewer';
import './AdminDashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function AdminDashboard({ user, token, onLogout }) {
  const [activeTab, setActiveTab] = useState('tournaments');
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tournaments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTournaments(data.items || []);
      }
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    onLogout();
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
       <div style={{ paddingTop: '107px' }}>
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-title">
            <h1>🎮 Shadow Vortex Admin</h1>
            <p>Welcome back, {user.username}!</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <nav className="admin-nav">
        <button 
          className={`nav-btn ${activeTab === 'tournaments' ? 'active' : ''}`}
          onClick={() => setActiveTab('tournaments')}
        >
          🏆 Tournaments
        </button>
        <button 
          className={`nav-btn ${activeTab === 'registrations' ? 'active' : ''}`}
          onClick={() => setActiveTab('registrations')}
        >
          👥 Registrations
        </button>
      </nav>

      <main className="admin-main">
        {activeTab === 'tournaments' && (
          <TournamentManager 
            tournaments={tournaments}
            token={token}
            onTournamentsChange={fetchTournaments}
          />
        )}
        {activeTab === 'registrations' && (
          <RegistrationViewer 
            tournaments={tournaments}
            token={token}
          />
        )}
      </main>
    </div>
    </div>
  );
}

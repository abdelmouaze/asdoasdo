import React, { useState } from 'react';
import PlayersGrid from './PlayersGrid';

// Demo component showing how to integrate the players grid
const TeamPlayersDemo = () => {
  const [players, setPlayers] = useState([
    {
      id: 1,
      username: 'ShadowVortex',
      avatar: 'https://i.pravatar.cc/150?img=1',
      country: 'US',
      city: 'Los Angeles',
      joinedAt: '2024-01-15'
    },
    {
      id: 2,
      username: 'CyberPhoenix',
      avatar: 'https://i.pravatar.cc/150?img=2',
      country: 'JP',
      city: 'Tokyo',
      joinedAt: '2024-02-20'
    },
    {
      id: 3,
      username: 'NeonStrike',
      avatar: null, // This will show placeholder
      country: 'GB',
      city: 'London',
      joinedAt: '2024-03-10'
    }
  ]);

  // Function to simulate adding a new player
  const addRandomPlayer = () => {
    const newPlayer = {
      id: Date.now(),
      username: `Player${Math.floor(Math.random() * 1000)}`,
      avatar: Math.random() > 0.5 ? `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 20)}` : null,
      country: ['US', 'JP', 'GB', 'CA', 'AU', 'DE', 'FR'][Math.floor(Math.random() * 7)],
      city: ['New York', 'Tokyo', 'London', 'Toronto', 'Sydney', 'Berlin', 'Paris'][Math.floor(Math.random() * 7)],
      joinedAt: new Date()
    };

    setPlayers(prev => [...prev, newPlayer]);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '20px 0'
    }}>
      {/* Demo Controls */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        padding: '20px'
      }}>
        <h1 style={{ 
          color: '#e5e7eb', 
          marginBottom: '16px',
          fontSize: '2rem',
          fontWeight: '700'
        }}>
          Gaming Team Players Grid
        </h1>
        <p style={{ 
          color: '#94a3b8', 
          marginBottom: '24px',
          fontSize: '1.1rem'
        }}>
          Responsive player cards with gaming aesthetics
        </p>
        <button
          onClick={addRandomPlayer}
          style={{
            background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0, 212, 255, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 24px rgba(0, 212, 255, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 16px rgba(0, 212, 255, 0.3)';
          }}
        >
          Add Random Player
        </button>
      </div>

      {/* Players Grid */}
      <PlayersGrid teamId="demo-team" players={players} />
    </div>
  );
};

export default TeamPlayersDemo;

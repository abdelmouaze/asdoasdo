import React, { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import './PlayersGrid.css';

const PlayersGrid = ({ teamId, players = [] }) => {
  const [teamPlayers, setTeamPlayers] = useState(players);

  // Mock function to simulate adding a new player
  const addNewPlayer = (newPlayer) => {
    setTeamPlayers(prev => [...prev, {
      id: Date.now(),
      username: newPlayer.username || 'New Player',
      avatar: newPlayer.avatar || null,
      country: newPlayer.country || 'US',
      city: newPlayer.city || 'Unknown',
      joinedAt: new Date()
    }]);
  };

  // Example: Listen for new players joining (you can replace this with real API calls)
  useEffect(() => {
    // This is just for demonstration - replace with your actual player joining logic
    const handlePlayerJoin = (event) => {
      if (event.detail && event.detail.teamId === teamId) {
        addNewPlayer(event.detail.player);
      }
    };

    window.addEventListener('playerJoined', handlePlayerJoin);
    return () => window.removeEventListener('playerJoined', handlePlayerJoin);
  }, [teamId]);

  // Sample players data for demonstration
  const samplePlayers = teamPlayers.length > 0 ? teamPlayers : [
    {
      id: 1,
      username: 'ShadowGamer',
      avatar: 'https://i.pravatar.cc/150?img=1',
      country: 'US',
      city: 'New York',
      joinedAt: '2024-01-15'
    },
    {
      id: 2,
      username: 'CyberNinja',
      avatar: 'https://i.pravatar.cc/150?img=2',
      country: 'JP',
      city: 'Tokyo',
      joinedAt: '2024-02-20'
    },
    {
      id: 3,
      username: 'VortexKing',
      avatar: null,
      country: 'GB',
      city: 'London',
      joinedAt: '2024-03-10'
    },
    {
      id: 4,
      username: 'PhoenixRise',
      avatar: 'https://i.pravatar.cc/150?img=4',
      country: 'CA',
      city: 'Toronto',
      joinedAt: '2024-03-25'
    },
    {
      id: 5,
      username: 'StormBreaker',
      avatar: 'https://i.pravatar.cc/150?img=5',
      country: 'AU',
      city: 'Sydney',
      joinedAt: '2024-04-01'
    }
  ];

  return (
    <section className="players-section">
      <div className="players-header">
        <h2>Team Players</h2>
        <div className="players-count">
          {samplePlayers.length} {samplePlayers.length === 1 ? 'Player' : 'Players'}
        </div>
      </div>
      
      <div className="players-grid">
        {samplePlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      {samplePlayers.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No players yet</h3>
          <p>Players will appear here when they join the team.</p>
        </div>
      )}
    </section>
  );
};

export default PlayersGrid;

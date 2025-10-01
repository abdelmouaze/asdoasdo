import React from 'react';
import './PlayerCard.css';

const PlayerCard = ({ player }) => {
  const {
    id,
    username = 'Unknown Player',
    avatar = null,
    country = '',
    city = 'Unknown City',
    joinedAt = new Date()
  } = player;

  // Generate flag emoji from country code
  const flagEmoji = (code) => {
    if (!code) return '🌍';
    return code.toUpperCase().replace(/./g, c => 
      String.fromCodePoint(127397 + c.charCodeAt(0))
    );
  };

  return (
    <div className="card" key={id}>
      <div className="content">
        <div className="front">
          {/* Background circles */}
          <div className="img">
            <div className="circle"></div>
            <div className="circle" id="right"></div>
            <div className="circle" id="bottom"></div>
          </div>

          {/* Player content */}
          <div className="front-content">
            <small className="badge">Player</small>
            
            {/* Player Avatar */}
            <div className="player-avatar">
              {avatar ? (
                <img src={avatar} alt={username} />
              ) : (
                <div className="avatar-placeholder">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Player description */}
            <div className="description">
              <div className="title">
                <p className="title">
                  <strong>{username}</strong>
                </p>
                <span className="flag">{flagEmoji(country)}</span>
              </div>
              <p className="card-footer">
                {city} &nbsp; | &nbsp; {new Date(joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;

import React, { useState, useRef } from 'react';
import './PlayerProfile.css';

const PlayerProfile = ({ playerId }) => {
  const [player, setPlayer] = useState({
    id: 1,
    username: 'ShadowVortex',
    avatar: 'https://i.pravatar.cc/150?img=1',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop',
    country: 'US',
    city: 'Los Angeles',
    bio: 'Professional esports player with 5+ years of competitive gaming experience. Specialized in FPS and MOBA games.',
    rank: 'Diamond',
    role: 'Team Captain',
    level: 87,
    joinedAt: '2019-03-15',
    stats: {
      wins: 1247,
      losses: 432,
      kda: '2.4',
      winRate: 74
    },
    games: [
      { id: 1, name: 'PUBG Mobile', icon: '🔫', color: '#ff6b35' },
      { id: 2, name: 'Call of Duty', icon: '⚔️', color: '#00d4ff' },
      { id: 3, name: 'Valorant', icon: '🎯', color: '#ff0844' },
      { id: 4, name: 'Apex Legends', icon: '🏆', color: '#ff8c00' },
      { id: 5, name: 'CS:GO', icon: '💥', color: '#ffd700' },
      { id: 6, name: 'Fortnite', icon: '🌪️', color: '#8b5cf6' }
    ],
    teams: [
      { 
        id: 1, 
        name: 'Shadow Esports', 
        logo: 'https://via.placeholder.com/60x60/8b5cf6/ffffff?text=SE',
        role: 'Captain',
        joinedAt: '2023-01-15'
      },
      { 
        id: 2, 
        name: 'Cyber Warriors', 
        logo: 'https://via.placeholder.com/60x60/00d4ff/ffffff?text=CW',
        role: 'Player',
        joinedAt: '2022-08-20'
      }
    ],
    achievements: [
      { id: 1, title: 'Tournament Winner', description: 'Won 5 major tournaments', icon: '🏆' },
      { id: 2, title: 'MVP Player', description: 'Most Valuable Player 2023', icon: '⭐' },
      { id: 3, title: 'Kill Master', description: '10,000+ eliminations', icon: '💀' },
      { id: 4, title: 'Team Leader', description: 'Led team to victory', icon: '👑' }
    ]
  });

  const [activeTab, setActiveTab] = useState('overview');
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Handle image upload
  const handleImageUpload = (file, type) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPlayer(prev => ({
          ...prev,
          [type]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Flag emoji converter
  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return '🌍';
    return countryCode.toUpperCase().replace(/./g, char => 
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
  };

  // Calculate account age
  const getAccountAge = () => {
    const joinDate = new Date(player.joinedAt);
    const now = new Date();
    const diffTime = Math.abs(now - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years}y ${months}m`;
    }
    return `${months}m`;
  };

  return (
    <div className="player-profile">
      {/* Animated Background */}
      <div className="cyber-background">
        <div className="cyber-grid"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <div className="profile-header">
        <div className="cover-image">
          <img src={player.coverImage} alt="Cover" />
          <div className="cover-overlay"></div>
          
          {/* Edit Cover Button */}
          <button 
            className="edit-cover-btn"
            onClick={() => coverInputRef.current?.click()}
            title="Change Cover Photo"
          >
            <span>📷</span>
            <span>Change Cover</span>
          </button>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleImageUpload(e.target.files[0], 'coverImage')}
          />
        </div>
        
        <div className="profile-info">
          <div className="avatar-container">
            <div className="avatar-glow"></div>
            <img src={player.avatar} alt={player.username} className="avatar" />
            <div className="level-badge">{player.level}</div>
            
            {/* Edit Avatar Button */}
            <button 
              className="edit-avatar-btn"
              onClick={() => avatarInputRef.current?.click()}
              title="Change Profile Photo"
            >
              <span>📷</span>
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageUpload(e.target.files[0], 'avatar')}
            />
          </div>
          
          <div className="user-details">
            <h1 className="username">{player.username}</h1>
            <div className="location">
              <span className="flag">{getFlagEmoji(player.country)}</span>
              <span className="city">{player.city}</span>
            </div>
            <div className="user-meta">
              <span className="rank">{player.rank}</span>
              <span className="separator">•</span>
              <span className="role">{player.role}</span>
              <span className="separator">•</span>
              <span className="account-age">{getAccountAge()} old</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-nav">
        <div className="nav-container">
          {['overview', 'games', 'teams', 'achievements'].map(tab => (
            <button
              key={tab}
              className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="profile-content">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content overview-tab">
            
            {/* Player Info Card */}
            <div className="info-card">
              <div className="card-header">
                <h3>Player Information</h3>
              </div>
              <div className="card-content">
                <div className="bio-section">
                  <h4>Biography</h4>
                  <p>{player.bio}</p>
                </div>
                
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-value">{player.stats.wins}</div>
                    <div className="stat-label">Wins</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{player.stats.losses}</div>
                    <div className="stat-label">Losses</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{player.stats.kda}</div>
                    <div className="stat-label">K/D/A</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{player.stats.winRate}%</div>
                    <div className="stat-label">Win Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Games Preview */}
            <div className="quick-games">
              <h3>Favorite Games</h3>
              <div className="games-preview">
                {player.games.slice(0, 4).map(game => (
                  <div key={game.id} className="game-preview" style={{'--game-color': game.color}}>
                    <span className="game-icon">{game.icon}</span>
                    <span className="game-name">{game.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Games Tab */}
        {activeTab === 'games' && (
          <div className="tab-content games-tab">
            <div className="section-header">
              <h3>Games I Play</h3>
              <p>My gaming arsenal across different genres</p>
            </div>
            
            <div className="games-grid">
              {player.games.map(game => (
                <div key={game.id} className="game-card" style={{'--game-color': game.color}}>
                  <div className="game-icon-large">{game.icon}</div>
                  <h4>{game.name}</h4>
                  <div className="game-stats">
                    <div className="game-stat">
                      <span>Rank</span>
                      <span>Diamond</span>
                    </div>
                    <div className="game-stat">
                      <span>Hours</span>
                      <span>1,247</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <div className="tab-content teams-tab">
            <div className="section-header">
              <h3>My Teams</h3>
              <p>Current and past team affiliations</p>
            </div>
            
            <div className="teams-grid">
              {player.teams.map(team => (
                <div key={team.id} className="team-card">
                  <div className="team-logo">
                    <img src={team.logo} alt={team.name} />
                  </div>
                  <div className="team-info">
                    <h4>{team.name}</h4>
                    <div className="team-role">{team.role}</div>
                    <div className="team-joined">
                      Joined {new Date(team.joinedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="team-actions">
                    <button className="view-team-btn">View Team</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="tab-content achievements-tab">
            <div className="section-header">
              <h3>Achievements</h3>
              <p>Milestones and accomplishments in my gaming journey</p>
            </div>
            
            <div className="achievements-grid">
              {player.achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                  <div className="achievement-glow"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerProfile;

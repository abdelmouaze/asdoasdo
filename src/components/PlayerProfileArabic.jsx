import React, { useState, useEffect, useRef } from 'react';
import './PlayerProfileArabic.css';

const PlayerProfileArabic = ({ playerId }) => {
  const [player, setPlayer] = useState({
    id: 1,
    username: 'Shadow Vortex',
    avatar: 'https://i.pravatar.cc/150?img=1',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop',
    country: 'DZ',
    countryFlag: '🇩🇿',
    city: 'الجزائر',
    bio: 'لاعب محترف في الألعاب الإلكترونية مع خبرة 5+ سنوات في الألعاب التنافسية. متخصص في ألعاب FPS و MOBA.',
    rank: 'ماسي',
    role: 'قائد الفريق',
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
        role: 'قائد',
        joinedAt: '2023-01-15'
      },
      { 
        id: 2, 
        name: 'Cyber Warriors', 
        logo: 'https://via.placeholder.com/60x60/00d4ff/ffffff?text=CW',
        role: 'لاعب',
        joinedAt: '2022-08-20'
      },
      { 
        id: 3, 
        name: 'Neon Squad', 
        logo: 'https://via.placeholder.com/60x60/ff0844/ffffff?text=NS',
        role: 'بديل',
        joinedAt: '2022-03-10'
      }
    ],
    achievements: [
      { id: 1, title: 'بطل البطولة', description: 'فاز في 5 بطولات كبرى', icon: '🏆' },
      { id: 2, title: 'أفضل لاعب', description: 'أفضل لاعب لعام 2023', icon: '⭐' },
      { id: 3, title: 'سيد القتل', description: '10,000+ عملية قتل', icon: '💀' },
      { id: 4, title: 'قائد الفريق', description: 'قاد الفريق للنصر', icon: '👑' }
    ]
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
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
      return `${years} سنة ${months} شهر`;
    }
    return `${months} شهر`;
  };

  return (
    <div className="player-profile-ar" dir="rtl">
      {/* Animated Cyberpunk Background */}
      <div className="cyber-background-ar">
        <div className="cyber-grid-ar"></div>
        <div className="floating-particles-ar">
          {[...Array(25)].map((_, i) => (
            <div key={i} className={`particle-ar particle-ar-${i + 1}`}></div>
          ))}
        </div>
        <div className="cyber-circles">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`cyber-circle cyber-circle-${i + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <div className="profile-header-ar">
        <div className="cover-image-ar">
          <img src={player.coverImage} alt="Cover" />
          <div className="cover-overlay-ar"></div>
          
          {/* Edit Cover Button */}
          <button 
            className="edit-cover-btn"
            onClick={() => coverInputRef.current?.click()}
            title="تغيير صورة الخلفية"
          >
            <span>📷</span>
          </button>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleImageUpload(e.target.files[0], 'coverImage')}
          />
        </div>
        
        <div className="profile-info-ar">
          <div className="avatar-container-ar">
            <div className="avatar-glow-ar"></div>
            <img src={player.avatar} alt={player.username} className="avatar-ar" />
            <div className="level-badge-ar">{player.level}</div>
            
            {/* Edit Avatar Button */}
            <button 
              className="edit-avatar-btn"
              onClick={() => avatarInputRef.current?.click()}
              title="تغيير صورة البروفايل"
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
          
          <div className="user-details-ar">
            <h1 className="username-ar">{player.username}</h1>
            <div className="location-ar">
              <span className="flag-ar">{getFlagEmoji(player.country)}</span>
              <span className="city-ar">{player.city}</span>
            </div>
            <div className="user-meta-ar">
              <span className="rank-ar">{player.rank}</span>
              <span className="separator-ar">•</span>
              <span className="role-ar">{player.role}</span>
              <span className="separator-ar">•</span>
              <span className="account-age-ar">{getAccountAge()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-nav-ar">
        <div className="nav-container-ar">
          {[
            { key: 'overview', label: 'نظرة عامة' },
            { key: 'games', label: 'الألعاب' },
            { key: 'teams', label: 'الفرق' },
            { key: 'achievements', label: 'الإنجازات' }
          ].map(tab => (
            <button
              key={tab.key}
              className={`nav-tab-ar ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="profile-content-ar">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content-ar overview-tab-ar">
            
            {/* Player Info Card */}
            <div className="info-card-ar">
              <div className="card-header-ar">
                <h3>معلومات اللاعب</h3>
              </div>
              <div className="card-content-ar">
                <div className="bio-section-ar">
                  <h4>السيرة الذاتية</h4>
                  <p>{player.bio}</p>
                </div>
                
                <div className="stats-grid-ar">
                  <div className="stat-item-ar">
                    <div className="stat-value-ar">{player.stats.wins}</div>
                    <div className="stat-label-ar">انتصارات</div>
                  </div>
                  <div className="stat-item-ar">
                    <div className="stat-value-ar">{player.stats.losses}</div>
                    <div className="stat-label-ar">هزائم</div>
                  </div>
                  <div className="stat-item-ar">
                    <div className="stat-value-ar">{player.stats.kda}</div>
                    <div className="stat-label-ar">K/D/A</div>
                  </div>
                  <div className="stat-item-ar">
                    <div className="stat-value-ar">{player.stats.winRate}%</div>
                    <div className="stat-label-ar">نسبة الفوز</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Games Preview */}
            <div className="quick-games-ar">
              <h3>الألعاب المفضلة</h3>
              <div className="games-preview-ar">
                {player.games.slice(0, 4).map(game => (
                  <div key={game.id} className="game-preview-ar" style={{'--game-color': game.color}}>
                    <span className="game-icon-ar">{game.icon}</span>
                    <span className="game-name-ar">{game.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Games Tab */}
        {activeTab === 'games' && (
          <div className="tab-content-ar games-tab-ar">
            <div className="section-header-ar">
              <h3>الألعاب التي ألعبها</h3>
              <p>مجموعة الألعاب الخاصة بي عبر أنواع مختلفة</p>
            </div>
            
            <div className="games-grid-ar">
              {player.games.map(game => (
                <div key={game.id} className="game-card-ar" style={{'--game-color': game.color}}>
                  <div className="game-icon-large-ar">{game.icon}</div>
                  <h4>{game.name}</h4>
                  <div className="game-stats-ar">
                    <div className="game-stat-ar">
                      <span>الرتبة</span>
                      <span>ماسي</span>
                    </div>
                    <div className="game-stat-ar">
                      <span>الساعات</span>
                      <span>1,247</span>
                    </div>
                  </div>
                  <div className="game-progress-ar">
                    <div className="progress-bar-ar">
                      <div className="progress-fill-ar" style={{width: '74%'}}></div>
                    </div>
                    <span className="progress-text-ar">74% نسبة الفوز</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <div className="tab-content-ar teams-tab-ar">
            <div className="section-header-ar">
              <h3>فرقي</h3>
              <p>الانتماءات الحالية والسابقة للفرق</p>
            </div>
            
            <div className="teams-grid-ar">
              {player.teams.map(team => (
                <div key={team.id} className="team-card-ar">
                  <div className="team-glow-ar"></div>
                  <div className="team-logo-ar">
                    <img src={team.logo} alt={team.name} />
                  </div>
                  <div className="team-info-ar">
                    <h4>{team.name}</h4>
                    <div className="team-role-ar">{team.role}</div>
                    <div className="team-joined-ar">
                      انضم في {new Date(team.joinedAt).toLocaleDateString('ar-DZ')}
                    </div>
                  </div>
                  <div className="team-actions-ar">
                    <button className="view-team-btn-ar">عرض الفريق</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="tab-content-ar achievements-tab-ar">
            <div className="section-header-ar">
              <h3>الإنجازات</h3>
              <p>المعالم والإنجازات في رحلتي في الألعاب</p>
            </div>
            
            <div className="achievements-grid-ar">
              {player.achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card-ar">
                  <div className="achievement-glow-ar"></div>
                  <div className="achievement-icon-ar">{achievement.icon}</div>
                  <div className="achievement-content-ar">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                  <div className="achievement-date-ar">
                    تم الحصول عليه في 2023
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button for Edit Mode */}
      <button 
        className={`edit-mode-btn ${isEditing ? 'active' : ''}`}
        onClick={() => setIsEditing(!isEditing)}
        title={isEditing ? 'إنهاء التعديل' : 'تعديل البروفايل'}
      >
        {isEditing ? '✓' : '✏️'}
      </button>
    </div>
  );
};

export default PlayerProfileArabic;

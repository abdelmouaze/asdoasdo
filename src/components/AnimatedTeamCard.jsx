import React, { useEffect, useState } from 'react';
import './AnimatedTeamCard.css';

const AnimatedTeamCard = ({ team, index, isAdmin, onDelete, isDeleting }) => {
  const [dominantColor, setDominantColor] = useState('#00d4ff');

  useEffect(() => {
    if (team.logo) {
      // Extract dominant color from logo
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          let r = 0, g = 0, b = 0, count = 0;
          
          // Sample pixels and calculate average color
          for (let i = 0; i < data.length; i += 16) { // Sample every 4th pixel
            if (data[i + 3] > 128) { // Only count non-transparent pixels
              r += data[i];
              g += data[i + 1];
              b += data[i + 2];
              count++;
            }
          }
          
          if (count > 0) {
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);
            
            // Convert to hex
            const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            setDominantColor(hex);
          }
        } catch (error) {
          console.log('Could not extract color from logo:', error);
        }
      };
      img.src = team.logo;
    }
  }, [team.logo]);

  return (
    <div 
      className={`animated-team-card card-${index}`}
      style={{
        '--team-color': dominantColor,
        '--team-color-rgb': dominantColor.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ') || '0, 212, 255'
      }}
    >
      <div className="boxshadow"></div>
      <div className="main">
        {/* Team Logo in background */}
        <div className="team-logo-bg">
          <img src={team.logo || 'https://via.placeholder.com/100'} alt={team.name} />
        </div>
        
        <div className="top"></div>
        <div className="left side"></div>
        <div className="right side"></div>
        
        <div className="title">{team.name || 'TEAM NAME'}</div>
        
        {/* Team Info */}
        <div className="team-info">
          <div className="info-item">
            <span className="flag">{team.country || 'DZ'}</span>
            <span className="city">{team.city || 'CITY'}</span>
          </div>
          <div className="members-count">
            Members: {team.currentMembers || 1} / {team.maxMembers || 10}
          </div>
        </div>
        
        {/* Join Team Button */}
        <div className="join-button-container">
          <button className="join-team-btn">
            Join Team
          </button>
        </div>
        
        {/* Admin Delete Button */}
        {isAdmin && (
          <div className="admin-delete-container">
            <button 
              className="delete-team-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(team._id, team.name);
              }}
              disabled={isDeleting}
            >
              {isDeleting ? '⏳ Deleting...' : '🗑️ Delete'}
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default AnimatedTeamCard;

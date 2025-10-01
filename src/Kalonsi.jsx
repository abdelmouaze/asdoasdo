import React from 'react';
import './Kalonsi.css';

const TWITCH_CHANNEL = import.meta.env.VITE_KALONSI_TWITCH || 'shadow_vortexes';
const YOUTUBE_CHANNEL = import.meta.env.VITE_KALONSI_YOUTUBE || 'ShadowVortex-Esports';

// Note: Twitch embed requires allowed parent domains. In dev it's localhost.
// For production, add your domain in the URL's parent parameter and in Twitch settings.
export default function Kalonsi() {
  const twitchParent = window.location.hostname || 'localhost';
  const twitchPlayerUrl = `https://player.twitch.tv/?channel=${encodeURIComponent(TWITCH_CHANNEL)}&parent=${encodeURIComponent(twitchParent)}&muted=true`;
  const youtubeChannelUrl = `https://www.youtube.com/${YOUTUBE_CHANNEL.startsWith('UC') ? 'channel' : '@'}${YOUTUBE_CHANNEL.replace(/^@/, '')}`;

  return (
    <div style={{ paddingTop: '107px' }}> 
    <div className="kalonsi-page" style={{ paddingTop: '107px' }}>
      <div className="kalonsi-wrap">
        <header className="kalonsi-head">
          <h1>Kalonsi</h1>
          <p>Follow and watch live on Twitch and YouTube.</p>
          <div className="kalonsi-actions">
            <a className="btn-primary" href={`https://twitch.tv/${TWITCH_CHANNEL}`} target="_blank" rel="noreferrer">Twitch</a>
            <a className="btn-outline" href={youtubeChannelUrl} target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </header>

        <section className="kalonsi-grid">
          <div className="kalonsi-card">
            <h3>Twitch Stream</h3>
            <div className="embed">
              <iframe
                title="Kalonsi Twitch"
                src={twitchPlayerUrl}
                height="360"
                width="100%"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen"
              />
            </div>
          </div>

          <div className="kalonsi-card">
            <h3><a href={youtubeChannelUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>YouTube</a></h3>
            <div className="embed">
              <iframe
                title="Kalonsi YouTube"
                src={`https://www.youtube.com/embed?listType=user_uploads&list=${encodeURIComponent(YOUTUBE_CHANNEL)}`}
                height="360"
                width="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <footer className="kalonsi-foot">
          <small>Tip: Set VITE_KALONSI_TWITCH and VITE_KALONSI_YOUTUBE in your .env to control embeds.</small>
        </footer>
      </div>
    </div>
    </div>  
  );
}

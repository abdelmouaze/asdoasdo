import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PlayersGrid from './components/PlayersGrid';
import './TeamsDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function TeamsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('auth_token');
  const [team, setTeam] = useState(location.state?.team || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('info');
  const [joining, setJoining] = useState(false);
  const [joinMsg, setJoinMsg] = useState('');
  const [matches, setMatches] = useState([]);
  const flagEmoji = (code) => (code||'').toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)));

  useEffect(() => {
    let abort = new AbortController();
    (async () => {
      try {
        // If we already have team from navigation state and it matches the route id, skip fetching
        if (team && (team._id === id || !id)) return;
        setLoading(true);
        const res = await fetch(`${API_URL}/api/teams/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          signal: abort.signal,
        });
        
        // Handle 401 errors (invalid/expired token)
        if (res.status === 401 && token) {
          console.log('Token expired or invalid, clearing auth and retrying as guest');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          // Retry without token
          const retryRes = await fetch(`${API_URL}/api/teams/${id}`, { signal: abort.signal });
          if (!retryRes.ok) throw new Error('Failed to load team');
          const data = await retryRes.json();
          setTeam(data.item || data);
          return;
        }
        
        if (!res.ok) throw new Error('Failed to load team');
        const data = await res.json();
        setTeam(data.item || data);
      } catch (e) {
        if (e?.name === 'AbortError') return;
        setError(e.message || 'Failed to load team');
      } finally {
        setLoading(false);
      }
    })();
    return () => abort.abort();
  }, [id]);

  // Fetch team stats once team is available
  useEffect(() => {
    if (!team?._id) return;
    // If stats already present, skip fetch
    if (team?.stats && (typeof team.stats.wins !== 'undefined' || typeof team.stats.losses !== 'undefined')) {
      return;
    }

    const abort = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/teams/${team._id}/stats`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: abort.signal,
        });
        if (!res.ok) return; // silently ignore if endpoint not available
        const data = await res.json();
        const stats = data?.item || data;
        if (!stats) return;
        setTeam(prev => ({ ...prev, stats: { wins: Number(stats.wins||0), losses: Number(stats.losses||0) } }));
      } catch (e) {
        // ignore stats errors; UI has fallbacks
      }
    })();
    return () => abort.abort();
  }, [team?._id]);

  // Fetch recent matches (limit 5) once team is available
  useEffect(() => {
    if (!team?._id) return;
    const abort = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/teams/${team._id}/matches?limit=5`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: abort.signal,
        });
        if (!res.ok) return; // ignore silently if not available
        const data = await res.json();
        const items = Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []);
        setMatches(items.slice(0, 5));
      } catch (_) {
        // ignore errors; UI will show empty state
      }
    })();
    return () => abort.abort();
  }, [team?._id]);

  // Back handler: go back if possible, otherwise go to teams list
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/teams');
    }
  };

  // Join team handler
  const handleJoinTeam = async () => {
    if (!token) {
      setJoinMsg('يرجى تسجيل الدخول للانضمام');
      return;
    }
    if (!team?._id) return;
    if ((team.members || 0) >= (team.maxMembers || 0)) {
      setJoinMsg('الفريق ممتلئ');
      return;
    }
    try {
      setJoining(true);
      setJoinMsg('');
      const res = await fetch(`${API_URL}/api/teams/${team._id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      if (!res.ok || data?.success === false) {
        throw new Error(data?.error || 'Failed to join team');
      }
      setTeam(data.item || team);
      setJoinMsg('تم الانضمام إلى الفريق بنجاح');
    } catch (e) {
      setJoinMsg(e.message || 'تعذر الانضمام إلى الفريق');
    } finally {
      setJoining(false);
    }
  };

  if (!team && loading) return <div className="td-page" style={{ paddingTop: '107px' }}><div className="td-loading">Loading team…</div></div>;
  if (!team && error) return <div className="td-page" style={{ paddingTop: '107px' }}><div className="td-error">{error}</div></div>;
  if (!team) return <div className="td-page" style={{ paddingTop: '107px' }}><div className="td-error">Team not found</div></div>;

  return (
    <div style={{ paddingTop: '107px' }}>
    <div className="td-page" style={{ paddingTop: '107px' }}>
      {/* Actions bar above the hero */}
      <div className="td-actions">
        <button className="td-back" onClick={handleBack}>← Back</button>
        <button
          className="td-join"
          onClick={handleJoinTeam}
          disabled={joining}
          title={'Join Team'}
        >
          {joining ? 'Joining…' : 'Join Team'}
        </button>
      </div>

      <div className="td-cover">
        {team.banner ? (
          <img src={team.banner} alt="Team cover" />
        ) : (
          <div className="td-cover-ph" />
        )}

        <div className="td-hero">
          <div className="td-avatar">
            <img src={team.logo || 'https://via.placeholder.com/150'} alt="Team logo" />
          </div>

      {joinMsg && (
        <div className="td-join-message" style={{ maxWidth: 1100, margin: '8px auto 0', color: '#e5e7eb', textAlign: 'center' }}>
          {joinMsg}
        </div>
      )}
          <div className="td-hero-meta">
            <h2>{team.name}</h2>
            <div className="td-hero-sub">{team.city || '—'} {team.country ? <span className="td-flag">{flagEmoji(team.country)}</span> : null}</div>
          </div>
        </div>

      </div>

      <div className="td-statsbar">
        <div className="td-statitem">
          <div className="icon">👑</div>
          <div className="lines"><span className="label">Owner</span><b className="value">{team.owner?.name || '—'}</b></div>
        </div>
        <div className="td-statitem">
          <div className="icon">📅</div>
          <div className="lines"><span className="label">Member since</span><b className="value">{new Date(team.createdAt || Date.now()).toLocaleDateString()}</b></div>
        </div>
        <div className="td-statitem">
          <div className="icon">🏆</div>
          <div className="lines"><span className="label">Wins</span><b className="value">0</b></div>
        </div>
        <div className="td-statitem">
          <div className="icon">▶</div>
          <div className="lines"><span className="label">Total rounds</span><b className="value">0</b></div>
        </div>
      </div>

      {/* Stats widgets */}
      <div className="td-stats-cards" dir="rtl">
        <div className="td-stat-card td-stat-pie">
          <div className="td-stat-title">Statistics</div>
          <div className="td-stat-body td-pie-wrap">
            {(() => {
              const wins = Number(team.stats?.wins || 0);
              const losses = Number(team.stats?.losses || 0);
              const total = Math.max(wins + losses, 1);
              const winPct = Math.round((wins / total) * 100);
              return (
                <>
                  <div className="td-legend">
                    <span className="win">فوز</span>
                    <span className="loss">خسارة</span>
                  </div>
                  <div
                    className="td-pie"
                    style={{ background: `conic-gradient(#22c55e 0% ${winPct}%, #ef4444 ${winPct}% 100%)` }}
                    aria-label={`Win ${winPct}%`}
                    title={`Win ${winPct}%`}
                  />
                </>
              );
            })()}
          </div>
        </div>

        <div className="td-stat-card td-stat-summary">
          <div className="td-stat-title">Statistics</div>
          <div className="td-stat-body td-summary">
            {(() => {
              const wins = Number(team.stats?.wins || 0);
              const losses = Number(team.stats?.losses || 0);
              const total = wins + losses;
              const winPct = total ? Math.round((wins / total) * 100) : 0;
              return (
                <>
                  <div className="td-summary-text">
                    Total matches played: {total} (Wins {wins} | Losses {losses})
                    <br /> Win rate <b>{winPct}%</b>
                  </div>
                  <div className="td-bar">
                    <div className="td-bar-win" style={{ width: `${winPct}%` }}>{winPct}%</div>
                    <div className="td-bar-loss" style={{ width: `${100 - winPct}%` }}>{100 - winPct}%</div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      <div className="td-body">
        

          
            <div className="td-card">
              <h3>Team Info</h3>
              <div className="td-info-grid">
                {[
                  { label: 'Country', value: team.country || '—' },
                  { label: 'City', value: team.city || '—' },
                  { label: 'Game', value: team.game || '—' },
                  { label: 'Max Members', value: team.maxMembers || 0 },
                ].map((it, i) => (
                  <div key={i} className="td-info-card">
                    <div className="ic-label">{it.label}</div>
                    <div className="ic-value">{it.value}</div>
                  </div>
                ))}
                <div className="td-info-card td-info-socials">
                  <div className="ic-label">Socials</div>
                  <div className="ic-links">
                    <ul className="td-links">
                      {team.socials?.whatsapp && <li><a href={team.socials.whatsapp} target="_blank">WhatsApp</a></li>}
                      {team.socials?.twitter && <li><a href={team.socials.twitter} target="_blank">Twitter/X</a></li>}
                      {team.socials?.telegram && <li><a href={team.socials.telegram} target="_blank">Telegram</a></li>}
                      {team.socials?.facebook && <li><a href={team.socials.facebook} target="_blank">Facebook</a></li>}
                      {team.socials?.discord && <li><a href={team.socials.discord} target="_blank">Discord</a></li>}
                      {!team.socials && <li style={{color:'#94a3b8'}}>—</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="td-card">
              <h3>Achievements</h3>
              <div className="td-empty">No achievements yet.</div>
            </div>

            <div className="td-card">
              <h3>Media</h3>
              <div className="td-empty">No media uploaded.</div>
            </div>
          
        

        <aside className="td-aside">
          <div className="td-card">
            <h4>Team Stats</h4>
            <div className="td-stat"><span>Members</span><b>{team.members || 0} / {team.maxMembers || 0}</b></div>
            <div className="td-stat"><span>Tournaments</span><b>0</b></div>
            <div className="td-stat"><span>Ranking</span><b>—</b></div>
          </div>
        </aside>
      </div>

      {/* Players Grid Section - At the bottom */}
      <PlayersGrid teamId={team._id} players={team.players || []} />
    </div>
    </div>
  );
}

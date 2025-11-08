import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedTeamCard from './components/AnimatedTeamCard';
import './Teams.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Teams({ isAdminPanel = false }) {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('all');
  const [maxMembers, setMaxMembers] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [openModal, setOpenModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;
  const [hasMore, setHasMore] = useState(true);
  const [deletingTeam, setDeletingTeam] = useState(null);

  const token = localStorage.getItem('auth_token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';

  // Build query string for backend filters
  const buildQueryString = (pageNum) => {
    const params = new URLSearchParams();
    params.set('page', String(pageNum));
    params.set('limit', String(PAGE_SIZE));
    if (sortBy) params.set('sortBy', sortBy);
    params.set('sortOrder', 'desc');
    const q = query.trim();
    if (q) params.set('search', q);
    if (region !== 'all') params.set('country', region.toUpperCase());
    if (maxMembers !== 'all') params.set('maxMembers', String(maxMembers));
    return params.toString();
  };

  // Fetch page helper
  const fetchPage = async (pageNum, replace = false, signal) => {
    const qs = buildQueryString(pageNum);
    const res = await fetch(`${API_URL}/api/teams?${qs}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      signal,
    });
    
    // Handle 401 errors (invalid/expired token)
    if (res.status === 401) {
      console.log('Token expired or invalid, clearing auth and retrying as guest');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      // Retry without token
      const retryRes = await fetch(`${API_URL}/api/teams?${qs}`, { signal });
      if (!retryRes.ok) throw new Error('Failed to load teams');
      const data = await retryRes.json();
      const items = Array.isArray(data.items) ? data.items : [];
      setTeams(prev => replace ? items : [...prev, ...items]);
      const pagination = data.pagination || { page: pageNum, pages: items.length ? pageNum + 1 : pageNum };
      setHasMore(pagination.page < pagination.pages);
      return;
    }
    
    if (!res.ok) throw new Error('Failed to load teams');
    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];
    setTeams(prev => replace ? items : [...prev, ...items]);
    const pagination = data.pagination || { page: pageNum, pages: items.length ? pageNum + 1 : pageNum };
    setHasMore(pagination.page < pagination.pages);
  };

  // Initial load and when filters change, reset to page 1
  useEffect(() => {
    let abort = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setTeams([]);
        setPage(1);
        await fetchPage(1, true, abort.signal);
      } catch (e) {
        setError(e.message || 'Failed to load teams');
        setTeams([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    })();
    return () => abort.abort();
  }, [query, region, maxMembers, sortBy]);

  // Load more handler
  const onLoadMore = async () => {
    if (loading || !hasMore) return;
    try {
      setLoading(true);
      const next = page + 1;
      await fetchPage(next, false);
      setPage(next);
    } catch (e) {
      setError(e.message || 'Failed to load more');
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    let list = [...teams];
    const q = query.trim().toLowerCase();
    if (q) list = list.filter(t => (t.name || '').toLowerCase().includes(q) || (t.city || '').toLowerCase().includes(q));
    if (region !== 'all') list = list.filter(t => (t.country || '').toLowerCase() === region);
    if (maxMembers !== 'all') list = list.filter(t => Number(t.maxMembers || 0) <= Number(maxMembers));
    list.sort((a,b) => {
      if (sortBy === 'createdAt') return new Date(b.createdAt||0) - new Date(a.createdAt||0);
      if (sortBy === 'name') return (a.name||'').localeCompare(b.name||'');
      if (sortBy === 'members') return (b.members||0) - (a.members||0);
      return 0;
    });
    return list;
  }, [teams, query, region, maxMembers, sortBy]);

  // Delete team function for admin - direct deletion
  const handleDeleteTeam = async (teamId, teamName) => {
    if (!isAdmin) {
      alert('Only administrators can delete teams.');
      return;
    }

    setDeletingTeam(teamId);
    try {
      const response = await fetch(`${API_URL}/api/teams/${teamId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete team');
      }

      // Remove team from local state immediately
      setTeams(prevTeams => prevTeams.filter(team => team._id !== teamId));
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'delete-notification';
      notification.innerHTML = `✅ Team "${teamName}" deleted successfully <span style="float: right; margin-left: 10px; cursor: pointer;">×</span>`;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        animation: slideIn 0.3s ease-out;
        cursor: pointer;
      `;
      
      notification.onclick = () => notification.remove();
      document.body.appendChild(notification);
      setTimeout(() => {
        if (notification.parentNode) notification.remove();
      }, 3000);
      
    } catch (error) {
      console.error('Error deleting team:', error);
      
      // Show error notification
      const notification = document.createElement('div');
      notification.className = 'delete-notification error';
      notification.innerHTML = `❌ Error: ${error.message} <span style="float: right; margin-left: 10px; cursor: pointer;">×</span>`;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        animation: slideIn 0.3s ease-out;
        cursor: pointer;
      `;
      
      notification.onclick = () => notification.remove();
      document.body.appendChild(notification);
      setTimeout(() => {
        if (notification.parentNode) notification.remove();
      }, 4000);
    } finally {
      setDeletingTeam(null);
    }
  };

  const [form, setForm] = useState({ name: '', country: '', city: '', maxMembers: 5, logo: '' });

  const onCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.country) return;
    try {
      setCreating(true);
      const res = await fetch(`${API_URL}/api/teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create team');
      const created = await res.json();
      setTeams(t => [created.item || created, ...t]);
      setOpenModal(false);
      setForm({ name: '', country: '', city: '', maxMembers: 5, logo: '' });
    } catch (e) {
      setError(e.message);
      setCreating(false);
    }
  };

  return (
    <div style={{ paddingTop: '107px' }}>
    <div className={`teams-page ${isAdminPanel ? 'admin-teams-page' : ''}`}>
      <div className="teams-header">
        <div className="left">
          <button className="btn-create" onClick={() => navigate('/teams/create')}>Create Team</button>
        </div>
        <div className="right">
        </div>
      </div>

      <div className="teams-filters">
        <div className="field">
          <span className="icon">🔎</span>
          <input placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)} />
        </div>
        <select value={region} onChange={(e)=>setRegion(e.target.value)}>
          <option value="all">All Countries</option>
          <option value="eg">EG</option>
          <option value="iq">IQ</option>
          <option value="ae">AE</option>
          <option value="ma">MA</option>
        </select>
        <select value={maxMembers} onChange={(e)=>setMaxMembers(e.target.value)}>
          <option value="all">Max members: all</option>
          <option value="5">≤ 5</option>
          <option value="7">≤ 7</option>
          <option value="10">≤ 10</option>
        </select>
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <option value="createdAt">Sort: Newest</option>
          <option value="name">Sort: Name</option>
          <option value="members">Sort: Members</option>
        </select>
      </div>

      {loading && teams.length === 0 ? (
        <div className="teams-loading">Loading teams...</div>
      ) : (
        <>
          {filtered.length > 0 ? (
            <div className="animated-teams-grid">
              {filtered.map((team, index) => (
                <div 
                  key={team._id} 
                  className="team-grid-item"
                  onClick={()=>navigate(`/teams/${team._id}`, { state: { team } })} 
                  style={{cursor:'pointer'}}
                >
                  <AnimatedTeamCard 
                    team={team} 
                    index={(index % 6) + 1} 
                    isAdmin={isAdmin}
                    onDelete={handleDeleteTeam}
                    isDeleting={deletingTeam === team._id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="teams-empty">No saved teams yet.</div>
          )}
          
          {/* Keep original cards as backup - hidden */}
          <div style={{display: 'none'}}>
            <div className="teams-grid">
              {filtered.map(team => (
                <div
                  key={team._id}
                  className="team-card"
                  onClick={()=>navigate(`/teams/${team._id}`, { state: { team } })}
                  style={{cursor:'pointer'}}
                >
                  <div className="team-logo">
                    <img src={team.logo || 'https://via.placeholder.com/100'} alt={`${team.name} logo`} />
                  </div>
                  <div className="team-info">
                    <h3 title={team.name}>{team.name}</h3>
                    <div className="meta">
                      <span>{team.country || '—'}</span>
                      <span>{team.city || '—'}</span>
                    </div>
                    <div className="members">
                      <span>Members: {team.members || 0} / {team.maxMembers || 0}</span>
                    </div>
                    <button
                      className="btn-join"
                      onClick={(e)=>{ e.stopPropagation(); navigate(`/teams/${team._id}`, { state: { team } }); }}
                    >
                      Join Team
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            {hasMore && (
              <button className="btn-secondary" onClick={onLoadMore} disabled={loading}>
                {loading ? 'Loading...' : 'Load more'}
              </button>
            )}
          </div>
        </>
      )}

      {openModal && (
        <div className="teams-modal-overlay" onClick={() => setOpenModal(false)}>
          <div className="teams-modal" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Team</h3>
              <button className="modal-close" onClick={()=>setOpenModal(false)}>×</button>
            </div>
            <form className="modal-body" onSubmit={onCreate}>
              <label>
                Team Name
                <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} required />
              </label>
              <div className="row">
                <label>
                  Country (ISO)
                  <input value={form.country} onChange={(e)=>setForm({...form, country: e.target.value.toUpperCase()})} placeholder="EG" required />
                </label>
                <label>
                  City
                  <input value={form.city} onChange={(e)=>setForm({...form, city: e.target.value})} placeholder="Cairo" />
                </label>
              </div>
              <div className="row">
                <label>
                  Max Members
                  <input type="number" min="1" max="50" value={form.maxMembers} onChange={(e)=>setForm({...form, maxMembers: Number(e.target.value)})} />
                </label>
                <label>
                  Logo URL
                  <input value={form.logo} onChange={(e)=>setForm({...form, logo: e.target.value})} placeholder="https://..." />
                </label>
              </div>
              {error && <div className="form-error">{error}</div>}
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={()=>setOpenModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={creating}>{creating ? 'Creating...' : 'Create Team'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

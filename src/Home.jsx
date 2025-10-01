import { useMemo, useState } from 'react';
import Hero from './Hero';
import CardContainer from './CardContainer';
import './Hero.css';
import SearchBar from './components/SearchBar';
import { data } from './cardData';
import { Link } from 'react-router-dom';

function Home() {
  const [searchGame, setSearchGame] = useState('Free Fire');
  const [searchQuery, setSearchQuery] = useState('');
  const isAuthed = !!localStorage.getItem('auth_token');

  const allCards = useMemo(() => data.flat(), []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const g = (searchGame || '').toLowerCase();
    if (!q && !g) return [];
    return allCards.filter((item) => {
      const title = (item.title || '').toLowerCase();
      const desc = Array.isArray(item.description)
        ? item.description.join(' ').toLowerCase()
        : (item.description || '').toLowerCase();
      const matchesQuery = q ? title.includes(q) || desc.includes(q) : true;
      const matchesGame = g ? title.includes(g) : true;
      return matchesQuery && matchesGame;
    });
  }, [allCards, searchQuery, searchGame]);

  const handleSearch = ({ game, query }) => {
    setSearchGame(game);
    setSearchQuery(query);
  };

  return (
    <div className="home" style={{ position: 'relative', paddingTop: '107px' }}>
      <Hero />
      <SearchBar onSearch={handleSearch} />

      {searchQuery ? (
        <section className="products">
          <h2>Search Results</h2>
          {filtered.length > 0 ? (
            <CardContainer data={filtered} />
          ) : (
            <p style={{ color: '#94a3b8', padding: '8px 16px' }}>No results found.</p>
          )}
        </section>
      ) : null}

      <section className="products" style={{ pointerEvents: isAuthed ? 'auto' : 'none', userSelect: isAuthed ? 'auto' : 'none', opacity: isAuthed ? 1 : 0.98 }}>
        <h1>Esports Tournaments & Events</h1>
        <p> Track live matches and upcoming competitions across all major gaming titles</p>
        <div className="appa">
          {data.map((group, index) => (
            <CardContainer key={index} data={group} />
          ))}
        </div>
      </section>

      {!isAuthed && (
        <div
          style={{
            position: 'fixed',
            top: '107px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(2,6,23,0.6)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          aria-hidden={!isAuthed}
        >
          <div
            style={{
              background: 'rgba(15,23,42,0.9)',
              border: '1px solid rgba(148,163,184,0.25)',
              borderRadius: 12,
              padding: '24px 28px',
              color: '#e5e7eb',
              maxWidth: 520,
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.35)'
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Please sign in to continue</h3>
            <p style={{ marginTop: 0, marginBottom: 18, color: '#94a3b8' }}>
              Create an account or sign in to browse tournaments and details.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link className="btn-primary" to="/signin" style={{ padding: '10px 18px', borderRadius: 8 }}>Sign In</Link>
              <Link className="btn-secondary" to="/signup" style={{ padding: '10px 18px', borderRadius: 8, background: '#f1f5f9', color: '#0f172a' }}>Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

import { useMemo, useState } from 'react';
import Hero from './Hero';
import CardContainer from './CardContainer';
import './Hero.css';
import SearchBar from './components/SearchBar';
import { data } from './cardData';

function Home() {
  const [searchGame, setSearchGame] = useState('Free Fire');
  const [searchQuery, setSearchQuery] = useState('');

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
    <div style={{ paddingTop: '107px' }}>
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

      <section className="products">
        <h1>Esports Tournaments & Events</h1>
        <p> Track live matches and upcoming competitions across all major gaming titles</p>
        <div className="appa">
          {data.map((group, index) => (
            <CardContainer key={index} data={group} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const GAMES = [
  "Free Fire",
  "PUBG",
  "Fortnite",
  "Apex Legends",
  "Call of Duty: Warzone",
  "Counter-Strike",
  "FC 25",
  "eFootball 25",
];

function SearchBar({ onSearch }) {
  const [game, setGame] = useState("Free Fire");
  const [query, setQuery] = useState("");
  const timerRef = useRef(null);
  const selectRef = useRef(null);
  const [selectOpen, setSelectOpen] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    onSearch?.({ game, query });
  };

  // Debounced auto-search on input changes
  useEffect(() => {
    if (!onSearch) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch({ game, query });
    }, 300);
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [game, query, onSearch]);

  const clearQuery = () => setQuery("");

  return (
    <div className="searchbar-wrapper">
      <form className="searchbar" onSubmit={submit} role="search" aria-label="Recherche sur la page d'accueil">
        <div
          className="select-wrap"
          role="button"
          tabIndex={0}
          aria-label="Choisir un jeu"
          aria-expanded={selectOpen}
          onClick={() => {
            if (selectRef.current) {
              selectRef.current.focus();
              selectRef.current.click();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (selectRef.current) {
                selectRef.current.focus();
                selectRef.current.click();
              }
            }
          }}
        >
          <select
            ref={selectRef}
            aria-label="Game"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            onFocus={() => setSelectOpen(true)}
            onBlur={() => setSelectOpen(false)}
          >
            {GAMES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <span className="chevron">▾</span>
        </div>
        <input
          type="text"
          placeholder="Que recherchez-vous ?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search query"
        />
        {query && (
          <button type="button" className="clear-btn" onClick={clearQuery} aria-label="Effacer la recherche">
            ×
          </button>
        )}
        <button type="submit" className="search-btn">
          <span>Search</span>
          <FaSearch size={14} />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

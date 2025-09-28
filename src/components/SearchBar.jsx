import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const timerRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    onSearch?.({ game: "", query });
  };

  // Debounced auto-search on input changes
  useEffect(() => {
    if (!onSearch) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch({ game: "", query });
    }, 300);
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [query, onSearch]);

  const clearQuery = () => setQuery("");

  return (
    <div className="searchbar-wrapper">
      <form className="searchbar" onSubmit={submit} role="search" aria-label="Recherche sur la page d'accueil">
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

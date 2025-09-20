
import React, { useState } from "react";
import { ChevronDown, Search, User } from "lucide-react";
import "./GamingHeader.css";

const GamingHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState("Dota 2");

  const games = [
    "Dota 2",
    "Counter-Strike 2",
    "League of Legends",
    "Valorant",
    "Apex Legends",
  ];

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className="gaming-header">
      <div className="header-container">
        <div className="dropdown">
          <button
            className={`dropdown-btn ${isDropdownOpen ? "active" : ""}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{selectedGame}</span>
            <ChevronDown
              className={`chevron ${isDropdownOpen ? "rotate" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              {games.map((game, i) => (
                <button
                  key={i}
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedGame(game);
                    setIsDropdownOpen(false);
                    console.log("Selected game:", game);
                  }}
                >
                  {game}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            <Search className="icon" />
            <span>Search</span>
          </button>
        </div>

        <div>
          <button className="login-btn">
            <User className="icon" />
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default GamingHeader;

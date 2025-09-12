import React from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import PUBGBRRegistration from "./PUBGBRRegistration";
import "./EventPage.css";

export default function EventPage() {
  const { eventName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Decode the event name from URL
  const decodedEventName = decodeURIComponent(eventName || "");
  
  // Get game data from navigation state
  const { gameImage, gameTitle, gameColor } = location.state || {};

  return (
    <section className="event-page">
      <div className="event-container">
        <Link to="/" className="event-back-link">
          Retour à l'accueil
        </Link>
        
        <div className="event-card-wrapper">
          {gameImage && (
            <div className="event-hero-image">
              <img src={gameImage} alt={gameTitle} />
              <div className="event-hero-overlay">
                <h1 className="event-hero-title">{gameTitle}</h1>
                <p className="event-hero-subtitle">Tournoi Officiel Morocco Cup 2025</p>
              </div>
            </div>
          )}
          
          <PUBGBRRegistration 
            eventName={decodedEventName} 
            onClose={() => navigate("/")} 
          />
        </div>
      </div>
    </section>
  );
}

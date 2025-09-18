import React from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import PUBGBRRegistration from "./PUBGBRRegistration";
import "./EventPage.css";




export default function EventPage() {
  const { eventName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
 
  const decodedEventName = decodeURIComponent(eventName || "");
  
 
  const { gameImage, gameTitle, gameColor } = location.state || {};

  return (
    <div style={{ paddingTop: '107px' }}>
    <section className="event-page">
      <div className="event-container">
        <Link to="/" className="event-back-link">
          Retour à l'accueil
        </Link>
        
        <div className="event-card-wrapper">
          {gameImage && (
            <div style={{ backgroundImage: `url(${gameImage})` }} className="event-hero-image">
              <div className="event-hero-overlay">
                <h1 className="event-hero-title">{gameTitle}</h1>
                <p className="event-hero-subtitle">Tournoi Officiel Morocco Cup 2025</p>
              </div>
            </div>
          )}
          
          <PUBGBRRegistration 
            eventName={decodedEventName}
            gameTitle={gameTitle}
            onClose={() => navigate("/")} 
          />
        </div>
      </div>
    </section>
    </div>
  );
}

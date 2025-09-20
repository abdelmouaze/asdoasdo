import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./GameCard.css";

function GameCard({title,description,image,color,icon}) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  
  const handleEventClick = (eventName) => {
    const encodedEventName = encodeURIComponent(eventName);
    navigate(`/event/${encodedEventName}`, { 
      state: { 
        gameImage: image, 
        gameTitle: title, 
        gameColor: color 
      } 
    });
  };

  const toggleExpand = (e) => {
    e?.stopPropagation?.();
    setExpanded((v) => !v);
  };

  const goToRegistrations = (e) => {
    e?.stopPropagation?.();
    const encodedTitle = encodeURIComponent(title);
    navigate(`/event/${encodedTitle}/registrations`, { state: { gameTitle: title } });
  };

  return (
    <div className={`game-card${expanded ? ' expanded' : ''}`}>
      <div className="card-header" style={{ backgroundImage: `url(${image})`, borderColor: color }} onClick={toggleExpand} aria-expanded={expanded} role="button">
        <h3 onClick={goToRegistrations} style={{ cursor: 'pointer' }}>{title}</h3>
        <div className="icon" style={{ backgroundColor: color }}>
          <img src={icon} alt="icon" />
        </div>
      </div>

      <ul className="card-list">
        {description.map((d)=><li key={d} className="" onClick={() => handleEventClick(d)}>{d}</li>)}
      </ul>
    </div>
  
  );
}

export default GameCard;

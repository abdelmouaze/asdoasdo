import { useNavigate } from "react-router-dom";
import "./GameCard.css";

function GameCard({title,description,image,color,icon}) {
  const navigate = useNavigate();
  
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

  return (
    <div className="game-card">
      <div className="card-header" style={{ backgroundImage: `url(${image})`, borderColor: color }}>
        <h3>{title}</h3>
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

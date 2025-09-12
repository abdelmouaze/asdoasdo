import React, { useState } from "react";
import PUBGBRRegistration from "./PUBGBRRegistration";
import "./PUBG.css";

const events = [
  "PUBG Morocco Cup 2025: BR",
  "PUBG Morocco Cup 2025: TDM",
  "PUBG Morocco Cup 2025: Domination",
  "PUBG Morocco Cup 2025: Payload",
  "PUBG Morocco Cup 2025: Arena",
  "PUBG Morocco Cup 2025: Global",
];

export default function EventCards() {
  const [openEvent, setOpenEvent] = useState(null);

  return (
    <div className="cards-container">
      {events.map((ev) => (
        <div key={ev} className="event-card" onClick={() => setOpenEvent(ev)}>
          <h3>{ev}</h3>
          <p>Click to register</p>
        </div>
      ))}

      {openEvent && (
        <div className="modal-overlay" onClick={() => setOpenEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <PUBGBRRegistration
              eventName={openEvent}
              onClose={() => setOpenEvent(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

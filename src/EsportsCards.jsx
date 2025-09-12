
import "./EsportsCards.css";

const tournaments = [
  {
    game: "Dota 2",
    color: "red",
    icon: "🎮",
    events: [
      "The International 2025",
      "The International 2025: Group Stage",
      "EPL World SEA S8",
      "The International",
      "CIS Battle 2",
    ],
    image:
      "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2.jpg",
  },
  {
    game: "Counter-Strike",
    color: "green",
    icon: "🔫",
    events: [
      "BLAST Open Fall 2025",
      "BLAST Open Fall Qual",
      "FISSURE Playground #2",
      "United21 Season 37",
      "S-Tier Tournaments",
    ],
    image:
      "https://cdn.cloudflare.steamstatic.com/apps/csgo/images/csgo_react/csgo.jpg",
  },
  {
    game: "VALORANT",
    color: "red",
    icon: "🔥",
    events: [
      "VALORANT Champions 2025",
      "VCT 2025: Pacific Stage 2",
      "VCL EMEA: Stage 3",
      "VCT 2025: Americas Stage 2",
      "VCT 2025: EMEA Stage 2",
    ],
    image:
      "https://cdn.oneesports.gg/cdn-data/2023/05/Valorant_KeyArt_Agents-1024x576.jpg",
  },
  {
    game: "Mobile Legends: Bang Bang",
    color: "blue",
    icon: "⚔️",
    events: [
      "MPL Indonesia Season 16",
      "MPL Philippines Season 16",
      "MPL ID S16: RS",
      "IESF Southeast Asia Qualifier 2025",
      "MDL Indonesia Season 12",
    ],
    image:
      "https://mlbbstarlightpass.com/wp-content/uploads/2023/07/mlbb.jpg",
  },
  {
    game: "League of Legends",
    color: "teal",
    icon: "🧙",
    events: [
      "LPL 2025 Split 3",
      "LCK 2025 Season",
      "LCK CL 2025 Season",
      "LCK CL 2025 Play-In",
      "LEC 2025 Summer",
    ],
    image:
      "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltd8d37b34eb68db64/64b1a91df1180a7b4f3f8c15/LoL_2023.jpg",
  },
  {
    game: "Rocket League",
    color: "blue",
    icon: "🚗",
    events: [
      "RLCS 2025 - Worlds",
      "Esports World Cup 2025",
      "zen",
      "List of player camera settings",
      "Nwpo",
    ],
    image:
      "https://rocketleague.media.zestyio.com/Rocket-League-Free-To-Play-Launch.jpg",
  },
];

function EsportsCards() {
  return (
    <div className="cards">
      {tournaments.map((t, i) => (
        <div key={i} className={`card ${t.color}`}>
          <img src={t.image} alt={t.game} />
          <div className="icon">{t.icon}</div>
          <h2>{t.game}</h2>
          <ul>
            {t.events.map((e, j) => (
              <li key={j}>{e}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default EsportsCards;

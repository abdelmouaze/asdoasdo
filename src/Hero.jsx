import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// function Hero() {
//   return (
//   <section className="hero">
//             <h1>Welcome to <span className="highlight">Moize</span></h1>
//             <p>Discover Premium Gaming Products</p>
//             <button className="cta-button">Shop Now</button>
//           </section>
//   )
// }
// export default Hero;

function AnimatedNumber({ value, duration = 1200, suffix = "", formatter }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let startTs = null;
    let rafId;
    const animate = (ts) => {
      if (startTs === null) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * value);
      setDisplay(current);
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [value, duration]);

  const text = formatter ? formatter(display) : `${display}${suffix}`;
  return <>{text}</>;
}
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-image hero-image-1"></div>
        <div className="hero-image hero-image-2"></div>
        <div className="hero-image hero-image-3"></div>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <span>Premium Gaming Experience</span>
        </div>
        
        <h1>
          Bienvenue chez <span className="highlight">Shadow Vortex</span>
        </h1>
        
        <p className="hero-subtitle">
          Découvrez l'excellence du gaming avec nos produits haut de gamme
        </p>
        
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number"><AnimatedNumber value={500} suffix="+" /></span>
            <span className="stat-label">Produits</span>
          </div>
          <div className="stat">
            <span className="stat-number"><AnimatedNumber value={10000} formatter={(n) => `${Math.floor(n/1000)}K+`} /></span>
            <span className="stat-label">Clients</span>
          </div>
          <div className="stat">
            <span className="stat-number"><AnimatedNumber value={24} suffix="/7" /></span>
            <span className="stat-label">Support</span>
          </div>
        </div>
        
        <div className="hero-buttons">
          <button className="cta-button primary" onClick={() => navigate('/about')}>
            <span>Découvrir</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="cta-button secondary" onClick={() => navigate('/products')}>
            <span>Nos Produits</span>
          </button>
        </div>
      </div>
      
      <div className="hero-decoration">
        <div className="floating-card card-1">
          <img src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=300&fit=crop&crop=center" alt="Gaming Setup" />
        </div>
        <div className="floating-card card-2">
          <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center" alt="Gaming Gear" />
        </div>
        <div className="floating-card card-3">
          <img src="https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=400&h=300&fit=crop&crop=center" alt="RGB Setup" />
        </div>
      </div>
    </section>
  );
}

export default Hero;

import './About.css';

function About() {
  return (
    <div style={{ paddingTop: '107px' }}>
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          <h1>About Moize Gaming</h1>
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Moize Gaming was founded with a passion for delivering the ultimate gaming experience. 
                We believe that every gamer deserves access to high-quality, cutting-edge gaming gear 
                that enhances their performance and enjoyment.
              </p>
              <p>
                From professional esports equipment to casual gaming accessories, we curate only 
                the best products from trusted brands. Our team consists of dedicated gamers who 
                understand what it takes to excel in the digital arena.
              </p>
              <h2>Our Mission</h2>
              <p>
                To empower gamers worldwide with premium gaming equipment and exceptional service, 
                helping them achieve their full potential in every game they play.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <h3>10K+</h3>
                <p>Happy Gamers</p>
              </div>
              <div className="stat-card">
                <h3>500+</h3>
                <p>Gaming Products</p>
              </div>
              <div className="stat-card">
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-card">
                <h3>24/7</h3>
                <p>Customer Support</p>
              </div>
            </div>
          </div>
        </div>
        {/* Image gallery */}
        <div className="about-gallery">
          <div className="gallery-grid">
            <img src="/PC Gaming Haute Performance.jpg" alt="PC Gaming Haute Performance" loading="lazy" />
            <img src="/Carte Graphique RTX 4090.jpg" alt="Carte Graphique RTX 4090" loading="lazy" />
            <img src="/Setup Gaming Complet.jpg" alt="Setup Gaming Complet" loading="lazy" />
            <img src="/Clavier Mécanique RGB.jpg" alt="Clavier Mécanique RGB" loading="lazy" />
            <img src="/Souris Gaming Ultra Légère.jpg" alt="Souris Gaming Ultra Légère" loading="lazy" />
            <img src="/Casque Gaming Surround.jpg" alt="Casque Gaming Surround" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;

import './Footer.css';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section">
          <div className="footer-logo">
            <img 
              src="/Abdo.png" 
              alt="Moize Gaming Logo"
              width="36"
              height="36"
            />
            <h4>Moize Gaming</h4>
          </div>
          <p>Your premier gaming gear destination</p>
         {/* <div className="social-links">
        <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
        <a href="#twitter"><i className="fab fa-twitter"></i></a>
        <a href="#instagram"><i className="fab fa-instagram"></i></a>
        <a href="#youtube"><i className="fab fa-youtube"></i></a>
        <a href="#twitch"><i className="fab fa-twitch"></i></a>
        <a href="#discord"><i className="fab fa-discord"></i></a>
        <a href="#steam"><i className="fab fa-steam"></i></a>
      </div> */}
      <div className="social-links">
        <a href="https://www.facebook.com/share/19p4zgsZzg/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
         <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com/MoizeGaming/" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/Moize_Gaming/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.youtube.com/@Moize_Gaming/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <i className="fab fa-youtube"></i>
        </a>
        <a href="https://www.twitch.tv/moize_gaming/" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
          <i className="fab fa-twitch"></i>
        </a>
        <a href="https://discord.gg/WeuPCBCm" target="_blank" rel="noopener noreferrer" aria-label="Discord">
          <i className="fab fa-discord"></i>
        </a>
        <a href="mailto:gamingmoize@gmail.com" aria-label="Email">
          <i className="fab fa-envelope"></i>
        </a>
      </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Stay Connected</h4>
          <p>Subscribe for exclusive gaming offers!</p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </div>
          {/* <div className="app-downloads">
            <Link to="#appstore"><img src="https://thumbs.dreamstime.com/z/logo-de-l-app-store-est-une-plate-forme-num%C3%A9rique-distribution-s-d%C3%A9velopp%C3%A9-et-maintenu-par-la-pomme-inc-pour-les-applications-204759434.jpg" alt="App Store" /></Link>
            <Link to="#playstore"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSga_G3oqJt0Y1BNCit6WF_mBoC14iWCjPBww&s" alt="Play Store" /></Link>
          </div> */}
        </div>

        <div className="footer-section">
          <h4>Contact </h4> 
          <div className="contact-info">
            <p><i className="fas fa-envelope"></i>gamingmoize@gmail.com</p>
            <p><i className="fas fa-phone"></i> (+212) 714257457</p>
            {/* <p><i className="fas fa-map-marker-alt"></i> 123 Gaming Street</p> */}
          </div>
          <div className="payment-methods">
            {/* <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-amex"></i>
            <i className="fab fa-bitcoin"></i>
            <i className="fab fa-apple-pay"></i> */}
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Moize Gaming. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
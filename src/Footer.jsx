import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* First section */}
        <div className="footer-section">
          <div className="footer-logo">
            <img 
              src="https://img.freepik.com/free-vector/gradient-gaming-logo-template_52683-132733.jpg?semt=ais_hybrid&w=740" 
              alt="Moize Gaming Logo" 
            />
            <h4>Moize Gaming</h4>
          </div>
          <p>Your premier gaming gear destination</p>
          <div className="social-links">
            <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#twitter"><i className="fab fa-twitter"></i></a>
            <a href="#instagram"><i className="fab fa-instagram"></i></a>
            <a href="#youtube"><i className="fab fa-youtube"></i></a>
            <a href="#twitch"><i className="fab fa-twitch"></i></a>
            <a href="#discord"><i className="fab fa-discord"></i></a>
            <a href="#steam"><i className="fab fa-steam"></i></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Stay Connected</h4>
          <p>Subscribe for exclusive gaming offers!</p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </div>
          <div className="app-downloads">
            <a href="#appstore"><img src="https://thumbs.dreamstime.com/z/logo-de-l-app-store-est-une-plate-forme-num%C3%A9rique-distribution-s-d%C3%A9velopp%C3%A9-et-maintenu-par-la-pomme-inc-pour-les-applications-204759434.jpg" alt="App Store" /></a>
            <a href="#playstore"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSga_G3oqJt0Y1BNCit6WF_mBoC14iWCjPBww&s" alt="Play Store" /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Contact & Payment</h4>
          <div className="contact-info">
            <p><i className="fas fa-envelope"></i> info@moize.com</p>
            <p><i className="fas fa-phone"></i> (123) 456-7890</p>
            <p><i className="fas fa-map-marker-alt"></i> 123 Gaming Street</p>
          </div>
          <div className="payment-methods">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-amex"></i>
            <i className="fab fa-bitcoin"></i>
            <i className="fab fa-apple-pay"></i>
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
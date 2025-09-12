function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Moize</h4>
          <p>Your premier gaming gear destination</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: gamingmoize@gmail.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Moize. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
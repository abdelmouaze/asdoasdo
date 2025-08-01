import './Nav.css';

function Nav() {
  return (
    <nav className="nav">
      <div className="logo-container">
        <img 
          src="https://img.freepik.com/free-vector/gradient-gaming-logo-template_52683-132733.jpg?semt=ais_hybrid&w=740" 
          alt="Moize Gaming Logo" 
        />
        <h2>Moize Gaming</h2>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
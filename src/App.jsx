import Card from './Card';
import Nav from './Nav';
import Footer from './Footer';
import './Card.css';
import './App.css';
import './Nav.css';
import './Footer.css';

function App() {
  const cards = [
    {
      id: 1,
      image: "https://static.vecteezy.com/system/resources/thumbnails/044/022/430/small_2x/man-with-mask-holding-joystick-game-controller-mascot-logo-design-for-badge-emblem-esport-and-t-shirt-printing-vector.jpg",
      title: "Gaming Controller",
      description: "Professional gaming controller",
      price: "$59.99",
      badge: "New"
    },
    {
      id: 2,
      image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gaming-logo-design-template-d91be991586c340507ccca2d554dc84f_screen.jpg",
      title: "Gaming Setup",
      description: "Complete gaming setup",
      price: "$1499.99",
      badge: "Popular"
    },
    {
      id: 3,
      image: "https://img.pikbest.com/origin/10/50/46/10ppIkbEsTtgD.png!w700wp",
      title: "Gaming Headset",
      description: "Professional gaming headset",
      price: "$129.99",
      badge: "Sale"
    }
  ];

  return (
    <div className="app">
      <Nav />
      <main className="main-content">
        <section className="hero">
          <h1>Welcome to <span className="highlight">Moize</span></h1>
          <p>Discover Premium Gaming Products</p>
          <button className="cta-button">Shop Now</button>
        </section>
        <section className="products">
          <h2>Featured Gaming Gear</h2>
          <div className="products-grid">
            {cards.map((card) => (
              <Card 
                key={card.id}
                image={card.image}
                title={card.title}
                description={card.description}
                price={card.price}
                badge={card.badge}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

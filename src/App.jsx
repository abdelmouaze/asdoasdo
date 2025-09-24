import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Products from './Products';
import EventPage from './EventPage';
import ProductDetails from './ProductDetails';
import Order from './Order';
import Cancel from './Cancel';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './App.css';
import './Nav.css';
import './Footer.css';
import './theme.css';
import ScrollToTop from './ScrollToTop';
import RegistrationTable from './RegistrationTable';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <ThemeProvider>
        <div className="app">
          <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <Nav />
          </header>

          <main className="main-content">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/order" element={<Order />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/event/:eventName" element={<EventPage />} />
              <Route path="/event/:eventName/registrations" element={<RegistrationTable />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

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
import Profile from './Profile';
import Admin from './Admin';
import Teams from './Teams';
import TeamsCreate from './TeamsCreate';
import TeamsDetail from './TeamsDetail';
import './App.css';
import './Nav.css';
import './Footer.css';
import './theme.css';
import ScrollToTop from './ScrollToTop';
import RegistrationTable from './RegistrationTable';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

function App() {
  const RequireAuth = ({ children }) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

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
              {/* Public routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
              <Route path="/products" element={<RequireAuth><Products /></RequireAuth>} />
              <Route path="/products/:id" element={<RequireAuth><ProductDetails /></RequireAuth>} />
              <Route path="/contact" element={<RequireAuth><Contact /></RequireAuth>} />
              <Route path="/order" element={<RequireAuth><Order /></RequireAuth>} />
              <Route path="/cancel" element={<RequireAuth><Cancel /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
              <Route path="/teams" element={<RequireAuth><Teams /></RequireAuth>} />
              <Route path="/teams/create" element={<RequireAuth><TeamsCreate /></RequireAuth>} />
              <Route path="/teams/:id" element={<RequireAuth><TeamsDetail /></RequireAuth>} />
              <Route path="/event/:eventName" element={<RequireAuth><EventPage /></RequireAuth>} />
              <Route path="/event/:eventName/registrations" element={<RequireAuth><RegistrationTable /></RequireAuth>} />
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

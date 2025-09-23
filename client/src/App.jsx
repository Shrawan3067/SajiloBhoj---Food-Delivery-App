import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Offers from './pages/Offers';
import Help from './pages/Help';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Instamart from './pages/Instamart';
import Dineout from './pages/Dineout';
import PartnerPage from './pages/PartnerPage';
import RestaurantList from './components/RestaurantList';
import MenuPage from './components/MenuPage';
import { CartProvider } from "./context/CartContext";
import Checkout from './pages/Checkout';
import './index.css';

function App() {
  const [backend, setBackend] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/ping')
      .then(r => r.json())
      .then(data => setBackend(data.message))
      .catch(() => setBackend('backend unreachable'));
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="w-full min-h-screen flex flex-col items-center">
          <NavBar />

          <div className="w-full flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/partner-with-us" element={<PartnerPage />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/help" element={<Help />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/restaurant-list" element={<RestaurantList />} />
              <Route path="/menu/:id" element={<MenuPage />} />
              <Route path="/instamart" element={<Instamart />} />
              <Route path="/dineout" element={<Dineout />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

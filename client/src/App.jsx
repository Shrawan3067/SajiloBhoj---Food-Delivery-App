import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import { AuthProvider } from "./context/AuthContext";
import Checkout from './pages/Checkout';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AddressForm from './components/AddressForm';
import OrderHistory from './pages/OrderHistory';
import OrderTracking from './pages/OrderTracking';
import OrderConfirmation from './pages/OrderConfirmation';
import Loader from './components/Loader'; // Import the loader
import './index.css';

function Layout() {
  const location = useLocation();

  // Hide footer on MenuPage and other pages where it's not needed
  const hideFooterRoutes = ['/menu', '/checkout', '/order-history', '/track-order']; 
  const shouldHideFooter = hideFooterRoutes.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <NavBar />

      <div className="w-full flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/partner-with-us" element={<PartnerPage />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/address" element={<AddressForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/restaurant-list" element={<RestaurantList />} />
          <Route path="/menu/:id" element={<MenuPage />} />
          <Route path="/instamart" element={<Instamart />} />
          <Route path="/dineout" element={<Dineout />} />
          
          {/* Protected Routes */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order-history" 
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order-confirmation" 
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="track-order/:orderId" 
            element={
              <ProtectedRoute>
                <OrderTracking />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>

      {!shouldHideFooter && <Footer />}
    </div>
  );
}

function App() {
  const [backend, setBackend] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    // Your existing backend check
    fetch(import.meta.env.VITE_API_URL + '/api/ping')
      .then(r => r.json())
      .then(data => setBackend(data.message))
      .catch(() => setBackend('backend unreachable'));

    return () => clearTimeout(loadingTimer);
  }, []);

  // Show loader while loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
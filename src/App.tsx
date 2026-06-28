import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/sonner';

// Pages
import LandingPage from '@/pages/LandingPage';
import Marketplace from '@/pages/Marketplace';
import ProductDetail from '@/pages/ProductDetail';
import CobblerProfile from '@/pages/CobblerProfile';
import CartPage from '@/pages/Cart';
import RepairServices from '@/pages/RepairServices';
import CheckoutPage from '@/pages/Checkout';
import LoginPage from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cobbler/:id" element={<CobblerProfile />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/services" element={<RepairServices />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes (Role-based logic in components) */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" closeButton />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

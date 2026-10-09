
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Profile from './pages/Profile';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Witchlist';
import SignUp from './pages/SignUp';
import Login from './pages/Login.tsx';
import OrderHistory from './pages/Orderhistory';
import OrderSummary from './pages/OrderSummary';
import CategoryPage from './components/CategoryPage';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={<Login onSignUp={() => {}} onLogin={() => {}} />}
        />

        <Route
          path="/SignUp"
          element={<SignUp onSignUp={() => {}} onLogin={() => {}} />}
        />

        {/* Protected pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/shop" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
          <Route path="/OrderSummary" element={<OrderSummary />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/category/:categoryId"
            element={<CategoryPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

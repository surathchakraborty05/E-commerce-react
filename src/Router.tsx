import { Routes, Route } from 'react-router-dom';
import App from './App';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Wishlist from './pages/Witchlist';
import SignUp from './pages/SignUp';
import Login from './pages/Login.tsx';
import OrderHistory from './pages/Orderhistory';
import OrderSummary from './pages/OrderSummary.tsx';
export default function Router() {


  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/profile" element={<Profile />} /> 
      <Route path="/OrderHistory" element={<OrderHistory />} />
      <Route path="/Wishlist" element={<Wishlist />} />
      <Route path="/OrderSummary" element={<OrderSummary/>} />
      <Route path="/SignUp" element={<SignUp onSignUp={() => {}} 
    onLogin={() => {}} />} />
      <Route path="/login" element={<Login onSignUp={() => {}} 
    onLogin={() => {}}/>} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
}

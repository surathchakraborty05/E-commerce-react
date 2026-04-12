// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Home.tsx';
// import Profile from './pages/Profile';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './pages/Profile';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Witchlist';
import SignUp from './pages/SignUp';
import Login from './pages/Login.tsx';
import OrderHistory from './pages/Orderhistory';
import OrderSummary from './pages/OrderSummary.tsx';
import CategoryPage from './components/CategoryPage.tsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
        <Route path="/OrderSummary" element={<OrderSummary/>} />
        <Route path="/SignUp" element={<SignUp onSignUp={() => {}} 
    onLogin={() => {}} />} />
        <Route path="/login" element={<Login onSignUp={() => {}} 
    onLogin={() => {}}/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:categoryId" element={<CategoryPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
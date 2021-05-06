import './index.css';
import { useState } from 'react';
import { ResponsiveNavbar } from './components';
import { Cart, Shop, Wishlist } from './pages';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <div className="App">
      <ResponsiveNavbar
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
      />
      <div
        className={`body-for-resp-nav ${
          showMobileNav
            ? '.blur-content-in-mobile overflow--hidden'
            : 'overflow--auto overflow--X--hidden'
        }`}>
        <Routes>
          <Route path="/" element={<>Welcome to Shoppin Square</>} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="*" element={<> No Route Found</>} />
        </Routes>
        {/* <p>FROM APP.js</p> */}
      </div>
    </div>
  );
}

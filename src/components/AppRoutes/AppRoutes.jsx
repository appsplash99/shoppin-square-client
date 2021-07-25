import React from 'react';
import {
  Cart,
  Shop,
  Wishlist,
  Login,
  Signup,
  ProductDetail,
  Home,
  CheckoutForm,
} from '../../pages';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '../../components';

export const AppRoutes = ({ showMobileNav }) => {
  return (
    <div
      className={`body-for-resp-nav ${
        showMobileNav
          ? '.blur-content-in-mobile overflow--hidden'
          : 'overflow--auto overflow--X--hidden'
      }`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/men" element={<Shop />} />
        <Route path="/women" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetail />} />

        <PrivateRoute path="cart" element={<Cart />} />
        <PrivateRoute path="wishlist" element={<Wishlist />} />
        <PrivateRoute path="/checkout" element={<CheckoutForm />} />

        <Route path="*" element={<> No Route Found</>} />
      </Routes>
    </div>
  );
};

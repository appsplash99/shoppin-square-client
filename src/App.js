import { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { PrivateRoute, ResponsiveNavbar } from './components';
import { BASE_URL } from './utils/apiRoutes';
import { LoaderDonutSpinner } from 'morphine-ui';
import { Routes, Route } from 'react-router-dom';
import { useCartState } from './context/cart-context';
import { getLocalCredentials } from './utils/localStorage';
import { UserProfile } from './pages/UserProfile/UserProfile';
import {
  Cart,
  Shop,
  Wishlist,
  Login,
  Signup,
  ProductDetail,
  Home,
} from './pages';
import { ToastContainer } from 'react-toastify';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { dispatch } = useCartState();
  const { token, userId } = getLocalCredentials();

  useEffect(() => {
    token && userId && setIsLoading(true);
    (async function () {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`, {
        headers: { authorization: token },
      });
      if (response.status === 200) {
        dispatch({
          type: 'LOAD_CART_ITEMS',
          payload: response.data.cart?.cartItems,
        });
      }
    })() &&
      (async function () {
        const response = await axios.get(`${BASE_URL}/wishlist/${userId}`, {
          headers: { authorization: token },
        });
        if (response.status === 200) {
          dispatch({
            type: 'LOAD_WISHLIST_ITEMS',
            payload: response.data.userWishlist.wishlistItems,
          });
        }
      })();
    setIsLoading(false);
  }, [userId, token, dispatch]);

  return (
    <div className="App">
      <div
        className="flex align-items--c justify-content--c"
        style={{
          height: 'calc(100vh - 8vh)',
          display: isLoading ? 'flex' : 'none',
        }}>
        <LoaderDonutSpinner size="xxl" variant="primary" />
      </div>
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/men" element={<Shop />} />
          <Route path="/women" element={<Shop />} />
          <Route path="/product/:productId" element={<ProductDetail />} />

          {/* PRIVATE ROUTES */}
          <PrivateRoute path="user-profile" element={<UserProfile />} />
          <PrivateRoute path="cart" element={<Cart />} />
          <PrivateRoute path="wishlist" element={<Wishlist />} />

          {/* ROUTE NOT FOUND */}
          <Route path="*" element={<> No Route Found</>} />
        </Routes>
        {/* <p>FROM APP.js</p> */}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  );
}

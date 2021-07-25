import { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { ResponsiveNavbar } from './components';
import { BASE_URL } from './utils/apiRoutes';
import { LoaderDonutSpinner } from 'morphine-ui';
import { useCartState } from './context/cart-context';
import { getLocalCredentials } from './utils/localStorage';

import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './components/AppRoutes/AppRoutes';

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

  if (isLoading) {
    return (
      <div
        className="flex align-items--c justify-content--c"
        style={{ height: '92vh' }}>
        <LoaderDonutSpinner size="xxl" variant="primary" />
      </div>
    );
  }

  return (
    <div className="App">
      <ResponsiveNavbar
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
      />
      <AppRoutes showMobileNav={showMobileNav} />
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

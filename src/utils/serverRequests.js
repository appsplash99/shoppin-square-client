import axios from 'axios';
import { toast } from 'react-toastify';
import {
  removeLocalCredentials,
  setLocalCredentials,
  getLocalCredentials,
} from './localStorage';
import {
  BASE_URL,
  CART_ROUTE,
  WISHLIST_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from './apiRoutes';
import { isProductInArray } from './array-functions';

/** PRODUCTS ROUTE HANDLERS */
export const loadProductsFromDB = async ({ url, dispatch }) => {
  try {
    dispatch({ type: 'SHOW_LOADER' });
    const { data, status } = await axios({ method: 'GET', url });
    if (status === 200 || status === 201) {
      dispatch({ type: 'LOAD_PRODUCTS', payload: data });
    }
    dispatch({ type: 'HIDE_LOADER' });
  } catch (error) {
    dispatch({ type: 'HIDE_LOADER' });
    toast.error('Unable to load products from DB');
  }
};

export const productAddToCart = async (
  e,
  dispatch,
  token,
  userId,
  productId
) => {
  e.preventDefault();
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${BASE_URL}/cart/${userId}/${productId}`,
      headers: { authorization: token },
    });
    if (data.success) {
      dispatch({
        type: 'LOAD_CART_ITEMS',
        payload: data.latestCart.cartItems,
      });
      toast.success('Product Added to cart');
    }
  } catch (error) {
    toast.error('Failed to Update Cart');
  }
};

export const productRemoveFromCart = async (
  dispatch,
  token,
  userId,
  productId
) => {
  try {
    const {
      data: { success, latestCart },
    } = await axios({
      method: 'DELETE',
      url: `${CART_ROUTE}/${userId}/${productId}`,
      headers: { authorization: token },
    });
    if (success) {
      dispatch({
        type: 'LOAD_CART_ITEMS',
        payload: latestCart?.cartItems,
      });
      toast.success('one Item removed from cart...');
    }
  } catch (error) {
    toast.error('Cart Updation failed');
  }
};

export const productRemoveFromWishlist = async (
  dispatch,
  token,
  userId,
  productId
) => {
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `${WISHLIST_ROUTE}/${userId}/${productId}`,
      headers: { authorization: token },
    });
    if (data.success) {
      dispatch({
        type: 'LOAD_WISHLIST_ITEMS',
        payload: data.latestWishlist.wishlistItems,
      });
      toast.success('one item removed from wishlist');
    }
  } catch (error) {
    toast.error('Cart Updation failed');
  }
};

export const productAddToWishlist = async (
  dispatch,
  token,
  userId,
  productId
) => {
  try {
    const {
      data: { success, latestWishlist },
    } = await axios({
      method: 'POST',
      url: `${WISHLIST_ROUTE}/${userId}/${productId}`,
      headers: { authorization: token },
    });
    if (success) {
      dispatch({
        type: 'LOAD_WISHLIST_ITEMS',
        payload: latestWishlist.wishlistItems,
      });
      toast.success('1 item added to wishlist');
    }
  } catch (error) {
    toast.error('Wishlist Updation failed');
  }
};

/** WISHLIST ROUTE HANDLERS */
export const wishlistManipulation = async (
  state,
  dispatch,
  token,
  userId,
  productId
) => {
  if (!token) {
  } else {
    if (isProductInArray(state.wishlist, { _id: productId })) {
      productRemoveFromWishlist(dispatch, token, userId, productId);
    } else {
      await productAddToWishlist(dispatch, token, userId, productId);
    }
  }
};

export const getUserWishlistItems = async ({ dispatch }) => {
  const { token, userId } = getLocalCredentials();
  try {
    dispatch({ type: 'SHOW_LOADER' });
    const {
      data: { success, userWishlist },
    } = await axios({
      method: 'GET',
      url: WISHLIST_ROUTE + `/${userId}`,
      headers: { Authorization: token },
    });
    if (success) {
      dispatch({
        type: 'LOAD_WISHLIST_ITEMS',
        payload: userWishlist.wishlistItems,
      });
    }
    dispatch({ type: 'HIDE_LOADER' });
  } catch (error) {
    dispatch({ type: 'HIDE_LOADER' });
    token && toast.error('Unable to fetch User Wishlist');
  }
};

/** CART ROUTE HANDLERS */
export const updateCartItemQtyInDb = async (
  quantity,
  dispatch,
  token,
  userId,
  productId
) => {
  try {
    const {
      data: { success, latestCartItems },
    } = await axios({
      method: 'PATCH',
      url: `${CART_ROUTE}/${userId}/${productId}`,
      data: { quantity: quantity },
      headers: { authorization: token },
    });
    if (success)
      dispatch({ type: 'LOAD_CART_ITEMS', payload: latestCartItems.cartItems });
  } catch (error) {
    toast.error('Cart Updation failed');
  }
};

export const getUserCartItems = async ({ dispatch }) => {
  const { token, userId } = getLocalCredentials();
  try {
    dispatch({ type: 'SHOW_LOADER' });
    const newResp = await axios({
      method: 'GET',
      url: CART_ROUTE + `/${userId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    dispatch({
      type: 'LOAD_CART_ITEMS',
      payload: newResp.data.cart?.cartItems,
    });
    dispatch({ type: 'HIDE_LOADER' });
  } catch (error) {
    dispatch({ type: 'HIDE_LOADER' });
    token && toast.error('Unable to get user Cart');
  }
};

/** USER ROUTE HANDLERS */
export const logOutUser = async (dispatch) => {
  removeLocalCredentials();
  dispatch({ type: 'LOG_OUT_USER' });
  toast.success('Visit Us Again!');
};

export const loginUser = async ({ dispatch, respBody, navigate }) => {
  try {
    dispatch({ type: 'SHOW_LOADER' });
    const response = await axios({
      method: 'post',
      url: LOGIN_ROUTE,
      data: respBody,
    });
    if ([400, 401, 404].includes(response.status)) {
      toast.error('Bad Response Error');
    }
    if (response.status === 200) {
      const { userId, token, userEmail } = response.data;
      // save token in local storage
      setLocalCredentials(token, userId, userEmail);
      toast.success('Login Successful');
      navigate('/cart');
    }
    dispatch({ type: 'HIDE_LOADER' });
  } catch (error) {
    dispatch({ type: 'HIDE_LOADER' });
    toast.error('Unable to login');
    dispatch({ type: 'SET_ERROR_MESSAGE', payload: error.message });
  }
};

export const signUpUser = async ({ dispatch, navigate, userData }) => {
  try {
    dispatch({ type: 'SHOW_LOADER' });
    const { name, email, password } = userData;
    const { data } = await axios({
      method: 'post',
      url: REGISTER_ROUTE,
      data: { name, email, password },
    });
    toast.success('Sign Up Successful');
    if (data.success) {
      loginUser({ dispatch, navigate, respBody: { email, password } });
    }
    dispatch({ type: 'HIDE_LOADER' });
  } catch (error) {
    dispatch({ type: 'HIDE_LOADER' });
    toast.error('Failed to Signup');
    dispatch({ type: 'SET_ERROR_MESSAGE', payload: error.message });
  }
};

export const emptyUserCart = async ({ dispatch }) => {
  const { token, userId } = getLocalCredentials();
  try {
    const { data } = await axios({
      method: 'POST',
      url: CART_ROUTE + `/empty-cart/${userId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    if (data.success) {
      dispatch({
        type: 'LOAD_CART_ITEMS',
        payload: data?.latestCart?.cartItems,
      });
      toast.success('Payment Successful!');
    }
  } catch (error) {
    console.log(error);
    toast.error('Unable to clear user Cart');
  }
};

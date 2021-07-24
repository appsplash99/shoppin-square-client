import axios from 'axios';
import {
  CART_ROUTE,
  BASE_URL,
  WISHLIST_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from './apiRoutes';
import { isProductInArray } from './array-functions';
import { removeLocalCredentials, setLocalCredentials } from './localStorage';
import { toast } from 'react-toastify';

export const loadProductsFromDB = async (url, token) => {
  const res = await axios({
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  if (res.status === 200 || res.status === 201) {
    return res;
  } else {
    throw new Error('Failed to load products from server');
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
  toast.info('Adding to cart...');
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
  toast.info('Removing from cart...');
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
  toast.info('removing from wishlist...');
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
  toast.info('adding to wishlist...');
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

export const logOutUser = async (dispatch) => {
  removeLocalCredentials();
  dispatch({ type: 'LOG_OUT_USER' });
};

export const loginUser = async ({ dispatch, respBody, navigate }) => {
  try {
    toast.info('Logging In...');
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
    toast.info('Signing You Up...');
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

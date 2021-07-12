import axios from 'axios';
import { CART_ROUTE, BASE_URL, WISHLIST_ROUTE } from './apiRoutes';
import { isProductInArray } from './array-functions';
import { hideToast } from './hideToast';
import { removeLocalCredentials } from './localStorage';

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
  dispatch({ type: 'TOGGLE_TOAST', payload: 'adding to cart...', value: true });
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${BASE_URL}/cart/${userId}/${productId}`,
      headers: { authorization: token },
    });
    console.log(JSON.stringify(data, null, 2));
    if (data.success) {
      dispatch({
        type: 'LOAD-CART-ITEMS',
        payload: data.latestCart.cartItems,
      });
      dispatch({ type: 'TOGGLE_TOAST', payload: '1 item added to cart' });
      hideToast(dispatch);
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: 'TOGGLE_TOAST', payload: 'Cart Updation failed' });
    hideToast(dispatch);
  }
};

export const productRemoveFromCart = async (
  dispatch,
  token,
  userId,
  productId
) => {
  dispatch({
    type: 'TOGGLE_TOAST',
    payload: 'removing from cart...',
    value: true,
  });
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
        type: 'LOAD-CART-ITEMS',
        payload: latestCart?.cartItems,
      });
      dispatch({
        type: 'TOGGLE_TOAST',
        payload: '1 item removed from cart',
      });
      hideToast(dispatch);
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: 'TOGGLE_TOAST', payload: 'Cart Updation failed' });
    hideToast(dispatch);
  }
};

export const productRemoveFromWishlist = async (
  dispatch,
  token,
  userId,
  productId
) => {
  dispatch({
    type: 'TOGGLE_TOAST',
    payload: 'removing from wishlist...',
    value: true,
  });
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `${WISHLIST_ROUTE}/${userId}/${productId}`,
      headers: { authorization: token },
    });
    if (data.success) {
      dispatch({
        type: 'LOAD-WISHLIST-ITEMS',
        payload: data.latestWishlist.wishlistItems,
      });
      dispatch({
        type: 'TOGGLE_TOAST',
        payload: '1 item removed from wishlist',
      });
      hideToast(dispatch);
    }
  } catch (error) {
    console.error({ error });
    dispatch({ type: 'TOGGLE_TOAST', payload: 'Cart Updation failed' });
    hideToast(dispatch);
  }
};

export const productAddToWishlist = async (
  dispatch,
  token,
  userId,
  productId
) => {
  dispatch({
    type: 'TOGGLE_TOAST',
    payload: 'adding to wishlist...',
    value: true,
  });
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${WISHLIST_ROUTE}/${userId}/${productId}`,
      headers: { authorization: token },
    });
    if (data.success === 200) {
      dispatch({
        type: 'LOAD-WISHLIST-ITEMS',
        payload: data.latestWishlist.wishlistItems,
      });
      dispatch({
        type: 'TOGGLE_TOAST',
        payload: '1 item added to wishlist',
      });
      hideToast(dispatch);
    }
  } catch (error) {
    console.error({ error });
    dispatch({ type: 'TOGGLE_TOAST', payload: 'Cart Updation failed' });
    hideToast(dispatch);
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
    dispatch({ type: 'TOGGLE_TOAST', payload: 'Login Toast' });
    hideToast(dispatch, 3000);
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
      data,
    } = await axios({
      method: 'PATCH',
      url: `${CART_ROUTE}/${userId}/${productId}`,
      data: { quantity: quantity },
      headers: { authorization: token },
    });
    console.log(JSON.stringify(data, null, 2));
    if (success)
      dispatch({ type: 'LOAD-CART-ITEMS', payload: latestCartItems.cartItems });
  } catch (error) {
    console.error({ error });
    dispatch({ type: 'TOGGLE_TOAST', payload: 'Cart Updation failed' });
    hideToast(dispatch);
  }
};

export const loginExistingUser = async (url, respBody) => {
  return await axios({ method: 'post', url, data: respBody });
};

export const logOutUser = async (dispatch) => {
  removeLocalCredentials();
  dispatch({ type: 'LOG_OUT_USER' });
};

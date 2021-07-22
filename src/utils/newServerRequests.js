import axios from 'axios';
import { CART_ROUTE, BASE_URL, WISHLIST_ROUTE } from './apiRoutes';
import { isProductInArray } from './array-functions';
import { removeLocalCredentials } from './localStorage';
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
    // console.log(JSON.stringify(data, null, 2));
    if (data.success) {
      dispatch({
        type: 'LOAD-CART-ITEMS',
        payload: data.latestCart.cartItems,
      });
      toast.success('Product Added to cart');
    }
  } catch (error) {
    console.error(error);
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
        type: 'LOAD-CART-ITEMS',
        payload: latestCart?.cartItems,
      });
      toast.success('one Item removed from cart...');
    }
  } catch (error) {
    console.error(error);
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
        type: 'LOAD-WISHLIST-ITEMS',
        payload: data.latestWishlist.wishlistItems,
      });

      toast.success('one item removed from wishlist');
    }
  } catch (error) {
    console.error({ error });
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
      toast.success('1 item added to wishlist');
    }
  } catch (error) {
    console.error({ error });
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
      // data,
    } = await axios({
      method: 'PATCH',
      url: `${CART_ROUTE}/${userId}/${productId}`,
      data: { quantity: quantity },
      headers: { authorization: token },
    });
    // console.log(JSON.stringify(data, null, 2));
    if (success)
      dispatch({ type: 'LOAD-CART-ITEMS', payload: latestCartItems.cartItems });
  } catch (error) {
    console.error({ error });
    toast.error('Cart Updation failed');
  }
};

export const loginExistingUser = async (url, respBody) => {
  return await axios({ method: 'post', url, data: respBody });
};

export const logOutUser = async (dispatch) => {
  removeLocalCredentials();
  dispatch({ type: 'LOG_OUT_USER' });
};

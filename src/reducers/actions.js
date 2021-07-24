export const shoppingProductsAction = {
  LOAD_PRODUCTS: 'LOAD_PRODUCTS',
  CHANGE_PRODUCT_CATEGORY: 'CHANGE_PRODUCT_CATEGORY',
};

export const cartActions = {
  LOAD_CART_ITEMS: 'LOAD_CART_ITEMS',
};

export const wishlistActions = {
  LOAD_WISHLIST_ITEMS: 'LOAD_WISHLIST_ITEMS',
  ADD_OR_REMOVE_FROM_WISHLIST: 'ADD_OR_REMOVE_FROM_WISHLIST',
};

export const filterActions = {
  FILTER: 'FILTER',
  TOGGLE_INVENTORY: 'TOGGLE_INVENTORY',
  TOGGLE_DELIVERY: 'TOGGLE_DELIVERY',
  SLIDER: 'SLIDER',
  TOGGLE_SLIDER: 'TOGGLE_SLIDER',
};

export const sortActions = { SORT: 'SORT' };

export const loaderActions = {
  SHOW_LOADER: 'SHOW_LOADER',
  HIDE_LOADER: 'HIDE_LOADER',
};

export const paginationActions = {
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
};

export const errorActions = { SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE' };

export const userActions = { LOG_OUT_USER: 'LOG_OUT_USER' };

export const shoppingProductsAction = {
  LOAD_PRODUCTS: 'LOAD_PRODUCTS',
};

export const cartActions = {
  LOAD_CART_ITEMS: 'LOAD_CART_ITEMS',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

export const wishlistActions = {
  LOAD_WISHLIST_ITEMS: 'LOAD_WISHLIST_ITEMS',
  ADD_OR_REMOVE_FROM_WISHLIST: 'ADD_OR_REMOVE_FROM_WISHLIST',
};

export const filterActions = {
  FILTER_IS_NEW_PRODUCT: 'FILTER_IS_NEW_PRODUCT',
  FILTER_IN_STOCK: 'FILTER_IN_STOCK',
  FILTER_SALE_ITEM: 'FILTER_SALE_ITEM',
  FILTER_FAST_DELIVERY: 'FILTER_FAST_DELIVERY',
  FILTER_CATEGORY: 'FILTER_CATEGORY',
  CLEAR_ALL_FILTERS: 'CLEAR_ALL_FILTERS',
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

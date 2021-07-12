export const BASE_URL =
  'https://shoppin-square-server.apurvchimralwar.repl.co/api';

/** PRODUCTS  */
export const ALL_PRODUCTS = BASE_URL + '/products';
export const WOMENS_PRODUCT = ALL_PRODUCTS + '?filter[category]=women';
export const MENS_PRODUCT = ALL_PRODUCTS + '?filter[category]=men';

/** PROTECTED CART ROUTES */
export const CART_ROUTE = BASE_URL + '/cart';

/** PROTECTED WISHLIST ROUTES */
export const WISHLIST_ROUTE = BASE_URL + '/wishlist';

/**LOGIN AND REGISTER */
export const LOGIN_ROUTE = BASE_URL + '/login';
export const REGISTER_ROUTE = BASE_URL + '/register';

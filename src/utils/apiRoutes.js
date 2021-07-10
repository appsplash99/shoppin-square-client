export const BASE_URL =
  'https://shoppin-square-server.apurvchimralwar.repl.co/api/';

/** PRODUCTS  */
export const ALL_PRODUCTS = BASE_URL.concat('products/');
export const WOMENS_PRODUCT = ALL_PRODUCTS.concat('?filter[category]=women');
export const MENS_PRODUCT = ALL_PRODUCTS.concat('?filter[category]=men');

export const WISHLISTROUTE = BASE_URL.concat('wishlist/');
export const CARTROUTE = BASE_URL.concat('cart/');

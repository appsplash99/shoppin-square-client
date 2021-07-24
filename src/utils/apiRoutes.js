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

/** API URL Maker */
export const makeProductsApiUrl = ({ allProductsApi, sortBy, filterObj }) => {
  const activeFilters = Object.keys(filterObj).length > 0;

  // case 1 -  when sort and filters are empty
  if (!sortBy && !activeFilters) {
    return allProductsApi;
  }

  // case 2 - When only sortBy is present
  if (sortBy && !activeFilters) {
    return `${allProductsApi}?sort=${sortBy}`;
  }

  // case 3 - when only filters are present
  if (!sortBy && activeFilters) {
    const filterObjKeysArr = Object.keys(filterObj);
    const filterString = filterObjKeysArr
      .map((key) => `filter[${key}]=${filterObj[key]}`)
      .join('&');
    return `${allProductsApi}?${filterString}`;
  }

  // case 4 - when both sortBy and filtersObj is present
  if (sortBy && activeFilters) {
    const filterObjKeysArr = Object.keys(filterObj);
    const filterString = filterObjKeysArr
      .map((key) => `filter[${key}]=${filterObj[key]}`)
      .join('&');
    return `${allProductsApi}?${filterString}&sort=${sortBy}`;
  }
};

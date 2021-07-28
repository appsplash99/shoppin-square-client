export const BASE_URL =
  'https://shoppin-square-server.apurvchimralwar.repl.co/api';

/** PRODUCTS  */
export const ALL_PRODUCTS = BASE_URL + '/products';

/** PROTECTED CART ROUTES */
export const CART_ROUTE = BASE_URL + '/cart';

/** PROTECTED WISHLIST ROUTES */
export const WISHLIST_ROUTE = BASE_URL + '/wishlist';

/**LOGIN AND REGISTER */
export const LOGIN_ROUTE = BASE_URL + '/login';
export const REGISTER_ROUTE = BASE_URL + '/register';

/** API URL Maker */
export const makeProductsApiUrl = ({
  allProductsApi,
  sortBy,
  filterObj,
  currentPage = 0,
  productsPerPage = 7,
}) => {
  const activeFilters = Object.keys(filterObj).length > 0;

  let apiUrl = '';

  // case 1 -  when sort and filters are empty
  if (!sortBy && !activeFilters) {
    apiUrl = allProductsApi;
  }

  // case 2 - When only sortBy is present
  if (sortBy && !activeFilters) {
    apiUrl = `${allProductsApi}?sort=${sortBy}`;
  }

  // case 3 - when only filters are present
  if (!sortBy && activeFilters) {
    const filterObjKeysArr = Object.keys(filterObj);
    const filterString = filterObjKeysArr
      .map((key) => `filter[${key}]=${filterObj[key]}`)
      .join('&');

    apiUrl = `${allProductsApi}?${filterString}`;
  }

  // case 4 - when both sortBy and filtersObj is present
  if (sortBy && activeFilters) {
    const filterObjKeysArr = Object.keys(filterObj);
    const filterString = filterObjKeysArr
      .map((key) => `filter[${key}]=${filterObj[key]}`)
      .join('&');

    apiUrl = `${allProductsApi}?${filterString}&sort=${sortBy}`;
  }

  // console.log({ currPageFromAPI: currentPage });
  // after all above cases add currentpage to apiUrl
  // if currentPage is present
  if (currentPage && currentPage > 0) {
    if (apiUrl.includes('?')) {
      apiUrl = `${apiUrl}&page=${currentPage}`;
    } else {
      apiUrl = `${apiUrl}?page=${currentPage}`;
    }
  }

  if (productsPerPage) {
    if (apiUrl.includes('?')) {
      apiUrl = `${apiUrl}&size=${Number(productsPerPage)}`;
    } else {
      apiUrl = `${apiUrl}?size=${Number(productsPerPage)}`;
    }
  }

  return apiUrl;
};

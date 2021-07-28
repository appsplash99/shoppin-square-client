import {
  isProductInArray,
  concatNewProduct,
  removeExistingProductFromArray,
} from '../utils/array-functions';
import {
  shoppingProductsAction,
  cartActions,
  wishlistActions,
  filterActions,
  sortActions,
  loaderActions,
  paginationActions,
  errorActions,
  userActions,
} from './actions';
import { makeProductsApiUrl, ALL_PRODUCTS } from '../utils/apiRoutes';

export const cartStateReducer = (prevState, action) => {
  switch (action.type) {
    case filterActions.CLEAR_ALL_FILTERS:
      // console.log('Dispatched from CLEAR_ALL_FILTERS');
      return {
        ...prevState,
        filterObj: {},
        currentProductsApiRoute: makeProductsApiUrl({
          allProductsApi: ALL_PRODUCTS,
          sortBy: prevState.sortBy,
          filterObj: {},
        }),
      };

    case filterActions.FILTER_CATEGORY: {
      // console.log('Dispatched from FILTER_CATEGORY');
      let newFilterObj = {};
      if (action.payload === 'all-products') {
        delete prevState.filterObj.category;
        newFilterObj = prevState.filterObj;
      } else {
        newFilterObj = { ...prevState.filterObj, category: action.payload };
      }
      return {
        ...prevState,
        // change context with new value
        filterObj: newFilterObj,
        // make new API url with new filter obj
        currentProductsApiRoute: makeProductsApiUrl({
          allProductsApi: ALL_PRODUCTS,
          sortBy: prevState.sortBy,
          filterObj: newFilterObj,
        }),
        // set current page to zero
        pagination: { ...prevState.pagination, currentPage: 0 },
      };
    }

    case filterActions.FILTER_IS_NEW_PRODUCT: {
      // console.log('Dispatched from FILTER_IS_NEW_PRODUCT');

      let newFilterObj = {};
      if (action.payload === true) {
        newFilterObj = { ...prevState.filterObj, is_new_product: true };
      } else {
        delete prevState.filterObj.is_new_product;
        newFilterObj = { ...prevState.filterObj };
      }

      return {
        ...prevState,
        // change context with new value
        filterObj: newFilterObj,
        // make new API url with new filter obj
        currentProductsApiRoute: makeProductsApiUrl({
          allProductsApi: ALL_PRODUCTS,
          sortBy: prevState.sortBy,
          filterObj: newFilterObj,
        }),
      };
    }

    case filterActions.FILTER_IN_STOCK: {
      // console.log('Dispatched from FILTER_IN_STOCK');

      let newFilterObj = {};
      if (action.payload === true) {
        newFilterObj = { ...prevState.filterObj, in_stock: true };
      } else {
        delete prevState.filterObj.in_stock;
        newFilterObj = { ...prevState.filterObj };
      }

      return {
        ...prevState,
        // change context with new value
        filterObj: newFilterObj,
        // make new API url with new filter obj
        currentProductsApiRoute: makeProductsApiUrl({
          allProductsApi: ALL_PRODUCTS,
          sortBy: prevState.sortBy,
          filterObj: newFilterObj,
        }),
      };
    }

    case filterActions.FILTER_SALE_ITEM: {
      // console.log('Dispatched from FILTER_SALE_ITEM');

      let newFilterObj = {};
      if (action.payload === true) {
        newFilterObj = { ...prevState.filterObj, sale: true };
      } else {
        delete prevState.filterObj.sale;
        newFilterObj = { ...prevState.filterObj };
      }
      return {
        ...prevState,
        // change context with new value
        filterObj: newFilterObj,
        // make new API url with new filter obj
        currentProductsApiRoute: makeProductsApiUrl({
          allProductsApi: ALL_PRODUCTS,
          sortBy: prevState.sortBy,
          filterObj: newFilterObj,
        }),
      };
    }

    case filterActions.FILTER_FAST_DELIVERY: {
      // console.log('Dispatched from FILTER_FAST_DELIVERY');

      let newFilterObj = {};
      if (action.payload === true) {
        newFilterObj = { ...prevState.filterObj, fast_delivery: true };
      } else {
        delete prevState.filterObj.fast_delivery;
        newFilterObj = { ...prevState.filterObj };
      }
      return {
        ...prevState,
        // change context with new value
        filterObj: newFilterObj,
        // make new API url with new filter obj
        currentProductsApiRoute: makeProductsApiUrl({
          allProductsApi: ALL_PRODUCTS,
          sortBy: prevState.sortBy,
          filterObj: newFilterObj,
        }),
      };
    }

    case sortActions.SORT:
      // console.log('Dispatched from SORT');
      return {
        ...prevState,
        // update context
        sortBy: action.payload,
        currentProductsApiRoute: makeProductsApiUrl({
          allProductsApi: ALL_PRODUCTS,
          // makeProductApiUrl with new SortBy value
          sortBy: action.payload,
          filterObj: { ...prevState.filterObj },
        }),
      };

    case paginationActions.SET_TOTAL_PAGES: {
      // console.log('Dispatched from SET_TOTAL_PAGES');
      return {
        ...prevState,
        pagination: {
          ...prevState.pagination,
          totalPages: action.payload.totalPages,
        },
      };
    }

    case paginationActions.SET_CURRENT_PAGE: {
      // console.log('Dispatched from SET_CURRENT_PAGE');
      return {
        ...prevState,
        pagination: {
          ...prevState.pagination,
          // update context with latest value
          currentPage: action.payload,
        },
        currentProductsApiRoute: makeProductsApiUrl({
          allProductsApi: ALL_PRODUCTS,
          filterObj: prevState.filterObj,
          sortBy: prevState.sortBy,
          // use Latest value to make api Route
          currentPage: action.payload,
          productsPerPage: prevState.pagination.productsPerPage,
        }),
      };
    }

    case paginationActions.SET_PRODUCTS_PER_PAGE: {
      // console.log('Dispatched from SET_PRODUCTS_PER_PAGE');

      return {
        ...prevState,
        pagination: {
          ...prevState.pagination,
          productsPerPage: action.payload,
        },
        currentProductsApiRoute: makeProductsApiUrl({
          allProductsApi: ALL_PRODUCTS,
          sortBy: prevState.sortBy,
          filterObj: { ...prevState.filterObj },
          productsPerPage: action.payload,
        }),

        // // TODO: remove after done
        // // CHECKING STATE
        // checkingState: {
        //   ...prevState.checkingState,
        //   fromSetProductsPerPage:
        //     prevState.checkingState.fromSetProductsPerPage + 1,
        // },
      };
    }

    case loaderActions.SHOW_LOADER:
      // console.log('Dispatched from SHOW_LOADER');

      return { ...prevState, showLoader: true };

    case loaderActions.HIDE_LOADER:
      // console.log('Dispatched from HIDE_LOADER');
      return { ...prevState, showLoader: false };

    case userActions.LOG_OUT_USER:
      // console.log('Dispatched from LOG_OUT_USER');
      return {
        ...prevState,
        shoppingItems: [],
        cartItems: [],
        wishlistItems: [],
      };

    case errorActions.SET_ERROR_MESSAGE:
      // console.log('Dispatched from SET_ERROR_MESSAGE');
      return { ...prevState, errorMessage: action.payload };

    case shoppingProductsAction.LOAD_PRODUCTS:
      // console.log('Dispatched from LOAD_PRODUCTS');
      return {
        ...prevState,
        pagination: {
          ...prevState.pagination,
          totalPages: action.payload.totalPages,
          // Added Later
          productsPerPage: action.payload.limit,
        },
        shoppingItems: action.payload.products,

        // // TODO: remove after done
        // // CHECKING STATE
        // checkingState: {
        //   ...prevState.checkingState,
        //   fromLoadProducts: prevState.checkingState.fromLoadProducts + 1,
        // },
      };

    case cartActions.LOAD_CART_ITEMS:
      // console.log('Dispatched from LOAD_CART_ITEMS');

      return { ...prevState, cartItems: action.payload };

    case cartActions.SET_CART_TOTAL:
      // console.log('Dispatched from SET_CART_TOTAL');

      return { ...prevState, cartTotal: action.payload };

    case wishlistActions.LOAD_WISHLIST_ITEMS:
      // console.log('Dispatched from LOAD_WISHLIST_ITEMS');
      return { ...prevState, wishlistItems: action.payload };

    case wishlistActions.ADD_OR_REMOVE_FROM_WISHLIST:
      // console.log('Dispatched from ADD_OR_REMOVE_FROM_WISHLIST');
      return {
        ...prevState,
        wishlistItems: !isProductInArray(
          prevState.wishlistItems,
          action.payload
        )
          ? concatNewProduct(prevState.wishlistItems, action.payload)
          : removeExistingProductFromArray(
              prevState.wishlistItems,
              action.payload
            ),
      };

    default:
      console.log(
        'You have not defined any CASE for this ACTION in cartStateReducer'
      );
      break;
  }
};

// TODO: Remove the commented code
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

export const cartStateReducer = (prevState, action) => {
  switch (action.type) {
    /** Paginated Actions */
    case paginationActions.SET_TOTAL_PAGES: {
      return {
        ...prevState,
        pagination: {
          ...prevState.pagination,
          totalPages: action.payload.totalPages,
        },
      };
    }

    case paginationActions.SET_CURRENT_PAGE: {
      console.log({ currentPage: action.payload });
      return {
        ...prevState,
        pagination: {
          ...prevState.pagination,
          currentPage: action.payload,
        },
      };
    }

    /** LOADER ACTIONS */
    case loaderActions.SHOW_LOADER:
      return { ...prevState, showLoader: true };

    case loaderActions.HIDE_LOADER:
      return { ...prevState, showLoader: false };

    /** USER ACTIONS */
    case userActions.LOG_OUT_USER:
      return {
        ...prevState,
        shoppingItems: [],
        cartItems: [],
        wishlistItems: [],
      };

    /** TOAST ACTIONS */
    case 'TOGGLE_TOAST':
      return {
        ...prevState,
        toast: { message: action.payload, value: action.payload.value },
      };

    /** ERROR ACTIONS */
    case errorActions.SET_ERROR_MESSAGE:
      console.log('Error Set');
      return { ...prevState, errorMessage: action.payload };

    /**PRODUCTS ACTIONS */
    case shoppingProductsAction.LOAD_PRODUCTS:
      console.log('products loaded');
      return {
        ...prevState,
        pagination: {
          ...prevState.pagination,
          totalPages: action.payload.totalPages,
        },
        shoppingItems: action.payload.products,
      };

    case shoppingProductsAction.CHANGE_PRODUCT_CATEGORY:
      console.log(prevState.currentProductsApiRoute);
      return {
        ...prevState,
        currentProductsApiRoute: action.payload.route,
        pagination: {
          ...prevState.pagination,
          currentPage: 0,
        },
      };

    /**CART ACTIONS */
    case cartActions.LOAD_CART_ITEMS:
      console.log('cartItems loaded');
      return { ...prevState, cartItems: action.payload };

    /**WISHLIST ACTIONS */
    case wishlistActions.LOAD_WISHLIST_ITEMS:
      console.log('wishlist Items loaded');
      return { ...prevState, wishlistItems: action.payload };

    case wishlistActions.ADD_OR_REMOVE_FROM_WISHLIST:
      console.log('toggling is wishlisted flag');
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

    /**SORT AND FILTER ACTIONS */
    case sortActions.SORT:
      return { ...prevState, sortBy: prevState.sortBy };

    case filterActions.TOGGLE_INVENTORY:
      return {
        ...prevState,
        showAllInventory: !prevState.showAllInventory,
      };
    case filterActions.TOGGLE_DELIVERY:
      return {
        ...prevState,
        showFastDeliveryOnly: !prevState.showFastDeliveryOnly,
      };

    default:
      console.log(
        'You have not defined any CASE for this ACTION in cartStateReducer'
      );
      break;
  }
};

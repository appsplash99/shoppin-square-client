import {
  isProductInArray,
  concatNewProduct,
  removeExistingProductFromArray,
  incQtyForExistingProduct,
  decQtyForExistingProduct,
} from '../utils/array-functions';

export const shoppingProductsAction = {
  LOAD_PRODUCTS: 'LOAD-PRODUCTS',
  CHANGE_PRODUCT_CATEGORY: 'CHANGE-PRODUCT-CATEGORY',
};

export const cartActions = {
  LOAD_CART_ITEMS: 'LOAD-CART-ITEMS',
  ADD_TO_CART: 'ADD-TO-CART',
  REMOVE_FROM_CART: 'REMOVE-FROM-CART',
  INCREMENT_PRODUCT_QTY_IN_CART: 'INCREMENT-PRODUCT-QTY-IN-CART',
  DECREMENT_PRODUCT_QTY_IN_CART: 'DECREMENT-PRODUCT-QTY-IN-CART',
};
export const wishlistActions = {
  LOAD_WISHLIST_ITEMS: 'LOAD-WISHLIST-ITEMS',
  ADD_OR_REMOVE_FROM_WISHLIST: 'ADD-OR-REMOVE-FROM-WISHLIST',
  REMOVE_FROM_WISHLIST: 'REMOVE-FROM-WISHLIST',
};

export const filterActions = {
  FILTER: 'FILTER',
  TOGGLE_INVENTORY: 'TOGGLE_INVENTORY',
  TOGGLE_DELIVERY: 'TOGGLE_DELIVERY',
  SLIDER: 'SLIDER',
  TOGGLE_SLIDER: 'TOGGLE_SLIDER',
};

export const sortActions = { SORT: 'SORT' };

export const errorActions = { SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE' };

export const userActions = { LOG_OUT_USER: 'LOG_OUT_USER' };

export const cartStateReducer = (prevState, action) => {
  switch (action.type) {
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
      return { ...prevState, shoppingItems: action.payload.products };

    case shoppingProductsAction.CHANGE_PRODUCT_CATEGORY:
      console.log(prevState.currentProductsApiRoute);
      return { ...prevState, currentProductsApiRoute: action.payload.route };

    /**CART ACTIONS */
    case cartActions.ADD_TO_CART:
      console.log('ITEM Added to cart');
      return { ...prevState, cartItems: action.payload };

    case cartActions.LOAD_CART_ITEMS:
      console.log('cartItems loaded');
      return { ...prevState, cartItems: action.payload };

    case cartActions.REMOVE_FROM_CART:
      console.log('ITEM removed from cart');
      // While Removing an Item from cart, show a modal for confirmation
      return {
        ...prevState,
        cartItems: removeExistingProductFromArray(
          prevState.cartItems,
          action.payload
        ),
      };
    // case cartActions.INCREMENT_PRODUCT_QTY_IN_CART:
    //   console.log('Increased Qty');
    //   return {
    //     ...prevState,
    //     cartItems: incQtyForExistingProduct(
    //       prevState.cartItems,
    //       action.payload
    //     ),
    //   };
    // case cartActions.DECREMENT_PRODUCT_QTY_IN_CART:
    //   console.log('Decreased Qty');
    //   return {
    //     ...prevState,
    //     cartItems:
    //       action.payload.qty > 1
    //         ? decQtyForExistingProduct(prevState.cartItems, action.payload)
    //         : removeExistingProductFromArray(
    //             prevState.cartItems,
    //             action.payload
    //           ),
    //   };

    /**WISHLIST ACTIONS */
    case wishlistActions.LOAD_WISHLIST_ITEMS:
      console.log('wishlist Items loaded');
      return {
        ...prevState,
        wishlistItems: action.payload,
      };

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

    case wishlistActions.REMOVE_FROM_WISHLIST:
      console.log('Item Removed from Wishlist');
      return {
        ...prevState,
        wishlistItems: removeExistingProductFromArray(
          prevState.wishlistItems,
          action.payload
        ),
      };

    /**SORT AND FILTER ACTIONS */
    case sortActions.SORT:
      return {
        ...prevState,
        sortBy: action.payload,
      };
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

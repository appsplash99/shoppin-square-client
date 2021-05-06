import { useContext, createContext, useReducer } from 'react';
// import {
//   PRODUCTSDATA
// } from "../productsDB";
import { cartStateReducer } from '../reducers/cartStateReducer';
// import { getMaxPrice, getMinPrice } from '../utils/sortAndFilterFunctions';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialState = {
    // shoppingItems: PRODUCTSDATA,
    shoppingItems: [],
    wishlistItems: [],
    cartItems: [],
    sortBy: null,
    showAllInventory: false,
    showFastDeliveryOnly: false,
    // priceRangeSlider: {
    //   status: false,
    //   min: 0,
    //   max: 1000,
    //   value: (getMaxPrice(data) - getMinPrice(data)) / 2
    // }
  };
  const [state, dispatch] = useReducer(cartStateReducer, initialState);

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {' '}
      {children}{' '}
    </CartContext.Provider>
  );
};

const useCartState = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartState };

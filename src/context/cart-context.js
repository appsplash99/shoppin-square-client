import { useContext, createContext, useReducer } from 'react';
import { cartStateReducer } from '../reducers/cartStateReducer';
import { ALL_PRODUCTS } from '../utils/apiRoutes';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialState = {
    shoppingItems: [],
    wishlistItems: [],
    cartItems: [],
    showLoader: false,
    pagination: {
      totalPages: 0,
      currentPage: 0 ,
    },
    sortBy: null,
    showAllInventory: false,
    showFastDeliveryOnly: false,
    currentProductsApiRoute: ALL_PRODUCTS,
    errorMessage: '',
    toast: {
      value: false,
      message: '',
    },
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

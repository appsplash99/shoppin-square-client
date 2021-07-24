import { useContext, createContext, useReducer } from 'react';
import { cartStateReducer } from '../reducers/cartStateReducer';
import { ALL_PRODUCTS } from '../utils/apiRoutes';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialState = {
    currentProductsApiRoute: ALL_PRODUCTS,
    sortBy: null,
    filterObj: {},
    shoppingItems: [],
    wishlistItems: [],
    cartItems: [],
    pagination: {
      totalPages: 0,
      currentPage: null,
    },
    errorMessage: '',
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

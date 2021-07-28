import React from 'react';
import { Btn } from 'morphine-ui';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCartState } from '../../context/cart-context';
import { productAddToCart } from '../../utils/serverRequests';
import { getLocalCredentials } from '../../utils/localStorage';
import { isProductInArray } from '../../utils/array-functions';

export const AddToCartBtn = ({ desiredProduct }) => {
  const { token, userId } = getLocalCredentials();
  const navigate = useNavigate();
  const {
    dispatch,
    state: { cartItems },
  } = useCartState();

  return (
    <div>
      {cartItems &&
      desiredProduct &&
      isProductInArray(cartItems, desiredProduct) ? (
        <Btn
          size="sm"
          shape="capsule"
          variant="secondary"
          onClick={() => navigate('/cart')}>
          Go To Cart
        </Btn>
      ) : (
        <Btn
          size="sm"
          shape="capsule"
          variant="primary"
          onClick={(e) => {
            if (token) {
              dispatch({ type: 'SHOW_LOADER' });
              productAddToCart(e, dispatch, token, userId, desiredProduct._id);
              dispatch({ type: 'HIDE_LOADER' });
            } else {
              toast.info('Please Login');
              navigate('/login');
            }
          }}>
          Add to Cart
        </Btn>
      )}
    </div>
  );
};

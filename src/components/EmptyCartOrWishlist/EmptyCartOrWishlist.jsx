import React from 'react';
import { Btn } from 'morphine-ui';
import { Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '../../utils/apiRoutes';
import { useCartState } from '../../context/cart-context';

export const EmptyCartOrWishlist = ({ displayText }) => {
  const { dispatch } = useCartState();
  return (
    <div
      className="mt--lg pb--lg text--dark flex flex--column justify-content--c align-items--c gap"
      style={{ height: '50vh' }}>
      <div>{displayText}</div>
      <Link
        to="/shop"
        onClick={() => {
          dispatch({
            type: 'CHANGE_PRODUCT_CATEGORY',
            payload: { route: ALL_PRODUCTS },
          });
          // console.log({ currentProductsApiRoute });
        }}>
        <Btn variant="primary" shape="capsule" size="sm">
          Shop Products
        </Btn>
      </Link>
    </div>
  );
};

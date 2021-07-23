import React from 'react';
import { Link } from 'react-router-dom';
import { Btn } from 'morphine-ui';

export const EmptyCartOrWishlist = ({ displayText }) => {
  return (
    <div
      className="mt--lg pb--lg text--dark flex flex--column justify-content--c align-items--c gap"
      style={{ height: '50vh' }}>
      <div>{displayText}</div>
      <Link to="/shop">
        <Btn variant="primary" shape="capsule" size="sm">
          Shop Products
        </Btn>
      </Link>
    </div>
  );
};

import React, { useEffect } from 'react';
import './Wishlist.css';
import {
  getUserWishlistItems,
  productRemoveFromWishlist,
} from '../../utils/serverRequests';
import { useNavigate } from 'react-router-dom';
import { Btn, LoaderDonutSpinner } from 'morphine-ui';
import { EmptyCartOrWishlist } from '../../components';
import { useCartState } from '../../context/cart-context';
import { getLocalCredentials } from '../../utils/localStorage';

export const Wishlist = () => {
  const {
    dispatch,
    state: { wishlistItems, showLoader },
  } = useCartState();
  const navigate = useNavigate();

  useEffect(() => {
    getUserWishlistItems({ dispatch });
  }, [dispatch]);

  if (showLoader) {
    return (
      <div
        className="flex align-items--c justify-content--c"
        style={{ height: '90vh' }}>
        <LoaderDonutSpinner size="xxl" variant="primary" />
      </div>
    );
  }

  if (wishlistItems && wishlistItems.length === 0 && !showLoader) {
    return (
      <EmptyCartOrWishlist displayText="Your Wishlist is Empty - Please add products" />
    );
  }

  return (
    <div className="wishlist-container">
      <div className="checkout-section flex flex--column flex-wrap--wrap gap">
        <div className="flex flex--column gap border-radius--xs">
          {wishlistItems.length > 0 &&
            wishlistItems.map(({ _id, quantity: qty, product }) => {
              return (
                <div
                  key={_id}
                  className="bg--secondary"
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    maxWidth: '28rem',
                  }}>
                  <div className="product-cardPosition flex gap">
                    <img
                      className="product__image wishlist-product-image cursor-pointer"
                      src={product && product.images[0]}
                      alt=""
                      style={{ height: '50%', width: '10rem' }}
                      onClick={() => navigate(`/product/${product._id}`)}
                    />
                    <div className="product__content flex flex--column gap--xxs p--xxs justify-content--c">
                      <div className="flex justify-content--sb">
                        <div className="text--md">
                          <div className="font-weight--600 flex">
                            {product.brandName}
                          </div>
                        </div>
                      </div>
                      <div className="flex align-items--c flex-wrap--wrap">
                        <Btn
                          variant="error"
                          size="xxs"
                          onClick={async () => {
                            const { token, userId } = getLocalCredentials();
                            productRemoveFromWishlist(
                              dispatch,
                              token,
                              userId,
                              product._id
                            );
                          }}>
                          Remove from Wishlist
                        </Btn>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

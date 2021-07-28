import React, { useEffect } from 'react';
import './Wishlist.css';
import {
  getUserWishlistItems,
  productRemoveFromWishlist,
} from '../../utils/serverRequests';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { EmptyCartOrWishlist } from '../../components';
import { BtnIcon, LoaderDonutSpinner } from 'morphine-ui';
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
    <div className="flex flex--column align-items--c justify-content--c flex-wrap--wrap gap--sm mt--sm">
      <div className="flex flex-wrap--wrap gap border-radius--xs">
        {wishlistItems.length > 0 &&
          wishlistItems.map(({ _id, quantity: qty, product }) => {
            return (
              <div
                key={_id}
                className="bg--secondary border-radius--sm"
                style={{
                  position: 'relative',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxWidth: '28rem',
                  boxShadow:
                    'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
                }}>
                <div
                  className="product-cardPosition flex gap p--sm"
                  style={{ maxWidth: '20rem' }}>
                  <img
                    className="product__image wishlist-product-image cursor--pointer border-radius--sm"
                    src={product && product.images[0]}
                    alt=""
                    style={{ height: '50%', width: '10rem' }}
                    onClick={() => navigate(`/product/${product._id}`)}
                  />
                  <div className="product__content flex flex--column gap--xxs p--xxs justify-content--c">
                    <div className="flex flex--column align-items--fs justify-content--sb">
                      <div className="text--md font-weight--600">
                        {product.brandName}
                      </div>
                      <p className="text--xs font-weight--400 text-align--l">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex align-items--c flex-wrap--wrap">
                      <BtnIcon
                        variant="error"
                        size="xl"
                        style={{
                          position: 'absolute',
                          bottom: 'var(--space-sm)',
                          right: 'var(--space-sm)',
                        }}
                        onClick={async () => {
                          const { token, userId } = getLocalCredentials();
                          productRemoveFromWishlist(
                            dispatch,
                            token,
                            userId,
                            product._id
                          );
                        }}>
                        <FaTrashAlt className="text--lg text--danger" />
                      </BtnIcon>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

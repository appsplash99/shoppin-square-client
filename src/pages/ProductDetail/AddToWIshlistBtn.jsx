import React from 'react';
import { BtnIcon, Btn } from 'morphine-ui';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCartState } from '../../context/cart-context';
import { productAddToWishlist } from '../../utils/serverRequests';
import { getLocalCredentials } from '../../utils/localStorage';
import { isProductInArray } from '../../utils/array-functions';
import { AiOutlineHeart } from 'react-icons/ai';

export const AddToWishlistBtn = ({ desiredProduct }) => {
  const { token, userId } = getLocalCredentials();
  const navigate = useNavigate();
  const {
    dispatch,
    state: { wishlistItems },
  } = useCartState();

  return (
    <div>
      {wishlistItems &&
      desiredProduct &&
      isProductInArray(wishlistItems, desiredProduct) ? (
        <Btn
          size="sm"
          shape="capsule"
          variant="error"
          onClick={() => navigate('/wishlist')}>
          Go To Wishlist
        </Btn>
      ) : (
        <BtnIcon size="xl">
          <AiOutlineHeart
            className="text--xxxl text--danger cursor--pointer"
            onClick={() => {
              if (token) {
                productAddToWishlist(
                  dispatch,
                  token,
                  userId,
                  desiredProduct._id
                );
                dispatch({
                  type: 'ADD_OR_REMOVE_FROM_WISHLIST',
                  payload: desiredProduct,
                });
              } else {
                toast.info('Please Login');
                navigate('/login');
              }
            }}
          />
        </BtnIcon>
      )}
    </div>
  );
};

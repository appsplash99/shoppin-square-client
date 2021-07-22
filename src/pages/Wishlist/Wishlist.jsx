import { useEffect, useState } from 'react';
import './Wishlist.css';
import axios from 'axios';
import { Toast } from '../../components/Toast/Toast';
import { Btn, LoaderDonutSpinner } from 'morphine-ui';
import { WISHLIST_ROUTE } from '../../utils/apiRoutes';
import { useCartState } from '../../context/cart-context';
import { Link } from 'react-router-dom';
import { getLocalCredentials } from '../../utils/localStorage';
import { productRemoveFromWishlist } from '../../utils/newServerRequests';

export const Wishlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    dispatch,
    state: { wishlistItems, toast },
  } = useCartState();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { token, userId } = getLocalCredentials();
        const newResp = await axios({
          method: 'GET',
          url: WISHLIST_ROUTE + `/${userId}`,
          headers: { Authorization: token },
        });
        console.log(JSON.stringify(newResp, null, 2));
        dispatch({
          type: 'LOAD-WISHLIST-ITEMS',
          payload: newResp.data.userWishlist.wishlistItems,
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(JSON.stringify(error, null, 2));
      }
    })();
  }, [dispatch]);

  if (wishlistItems && wishlistItems.length === 0 && !isLoading) {
    return (
      <div className="mt--lg bg--secondary pb--lg text--dark">
        <div>Your Wishlist is Empty - Please add products</div>
        <Link to="/shop">
          <Btn variant="primary" shape="capsule" size="md">
            Shop Products
          </Btn>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      {!wishlistItems ? (
        <div
          className="flex align-items--c justify-content--c"
          style={{
            height: 'calc(100vh - 8vh)',
            display: isLoading ? 'flex' : 'none',
          }}>
          <LoaderDonutSpinner size="xxl" variant="primary" />
        </div>
      ) : (
        <div
          className={`checkout-section flex flex--column flex-wrap--wrap gap ${
            isLoading && 'display--hidden'
          }`}>
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
                        className="product__image wishlist-product-image"
                        src={product && product.images[0]}
                        alt=""
                        style={{ height: '50%', width: '10rem' }}
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
      )}

      {toast.message && <Toast message={toast.message} />}
    </div>
  );
};

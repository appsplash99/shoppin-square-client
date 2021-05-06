import { useCartState } from '../../context/cart-context';
import './Wishlist.css';
import { totalProductsInArray } from '../../utils/array-functions';

import { Btn } from '../../components/morphine-ui';

export const Wishlist = () => {
  const {
    state: { wishlistItems },
    dispatch,
  } = useCartState();

  return (
    <div className="wishlist-container">
      {totalProductsInArray(wishlistItems) > 0 && (
        <div className="checkout-section flex flex-wrap--wrap gap">
          <div className="flex flex--column bg--secondary gap flex-grow--1 border-radius--xs ">
            {wishlistItems.length > 0 &&
              wishlistItems.map(({ _id, brandName, image, description }) => {
                return (
                  <div key={_id}>
                    <div className="product-cardPosition flex gap">
                      <img
                        className="product__image wishlist-product-image"
                        src={image}
                        alt=""
                      />
                      <div className="product__content flex flex--column gap--xxs p--xxs">
                        <div className="flex justify-content--sb">
                          <div className="text--md">
                            <div className="font-weight--600 flex">
                              {brandName}
                            </div>
                            <div className="text--grey text--sm">
                              {description}
                            </div>
                          </div>
                        </div>
                        <div className="flex align-items--c flex-wrap--wrap">
                          <Btn
                            styleProp={{
                              maxWidth: 'calc(5*var(--space-lg))',
                            }}
                            variant="error"
                            btnSize="xs"
                            handleOnClickProp={() =>
                              dispatch({
                                type: 'REMOVE-FROM-WISHLIST',
                                payload: { _id },
                              })
                            }>
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
    </div>
  );
};

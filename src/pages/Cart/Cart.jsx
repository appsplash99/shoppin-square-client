import React from 'react';
import axios from 'axios';
import './Cart.css';
import {
  totalProductsInArray,
  totalProductPrice,
} from '../../utils/array-functions';
import {
  productRemoveFromCart,
  updateCartItemQtyInDb,
} from '../../utils/serverRequests';
import { useEffect, useState } from 'react';
import { CART_ROUTE } from '../../utils/apiRoutes';
import { Btn, LoaderDonutSpinner } from 'morphine-ui';
import { useCartState } from '../../context/cart-context';
import { getLocalCredentials } from '../../utils/localStorage';
import { ChangeProductQtyBtn, EmptyCartOrWishlist } from '../../components/';

export const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    state: { cartItems },
    dispatch,
  } = useCartState();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { token, userId } = getLocalCredentials();
        const newResp = await axios({
          method: 'GET',
          url: CART_ROUTE + `/${userId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        // console.log(());
        console.log(JSON.stringify(newResp, null, 2));
        dispatch({
          type: 'LOAD_CART_ITEMS',
          payload: newResp.data.cart?.cartItems,
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(JSON.stringify(error, null, 2));
      }
    })();
  }, [dispatch]);

  if (cartItems && cartItems.length === 0 && !isLoading) {
    return (
      <EmptyCartOrWishlist displayText="Your Cart is Empty - Please add products" />
    );
  }

  return (
    <div className="cart-container">
      {!cartItems ? (
        <div
          className="flex align-items--c justify-content--c"
          style={{
            height: 'calc(100vh - 8vh)',
            display: isLoading ? 'flex' : 'none',
          }}>
          <LoaderDonutSpinner size="xxl" variant="primary" />
        </div>
      ) : (
        cartItems &&
        totalProductsInArray(cartItems) > 0 && (
          <div
            className={`checkout-section flex flex--column flex-wrap--wrap gap ${
              isLoading && 'display--hidden'
            }`}>
            <div className="flex align-items--c justify-content--c flex-grow--3 my">
              <div className="flex align-items--c justify-content--se flex-wrap--wrap gap">
                <div className="text--xl font-weight--600">
                  Subtotal ({totalProductsInArray(cartItems)} items): ₹{' '}
                  {totalProductPrice(cartItems).toFixed(2)}
                </div>
                {/* <BtnInverted variant="primary" shape="capsule" sm="md">
                  <div className="font-weight--500">Proceed to Checkout</div>
                </BtnInverted> */}
              </div>
            </div>
            <div className="flex flex--column gap border-radius--xs">
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map(({ _id, quantity: qty, product }) => {
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
                          className="product__image cart-product-image"
                          src={product.images[0]}
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
                          <div className="flex flex-wrap--wrap align-items--c gap--xxs">
                            <span className="font-weight--600">
                              ₹ {product.price}
                            </span>
                            <span className="text--strikethrough text--md">
                              {`₹ ${Math.round(
                                (product.price * 100) / (100 - product.price)
                              )}`}
                            </span>
                            <span className="text--themeRed font-weight--600 border-radius--xs">
                              ({product.discount} % OFF)
                            </span>
                          </div>
                          <div className="flex align-items--c flex-wrap--wrap">
                            <ChangeProductQtyBtn
                              handleRemoveCartItem={() => {
                                const { token, userId } = getLocalCredentials();
                                productRemoveFromCart(
                                  dispatch,
                                  token,
                                  userId,
                                  product._id
                                );
                              }}
                              handleIncrementQty={() => {
                                const { token, userId } = getLocalCredentials();
                                updateCartItemQtyInDb(
                                  Number(qty + 1),
                                  dispatch,
                                  token,
                                  userId,
                                  product._id
                                );
                              }}
                              handleDecrementQty={() => {
                                const { token, userId } = getLocalCredentials();
                                updateCartItemQtyInDb(
                                  Number(qty - 1),
                                  dispatch,
                                  token,
                                  userId,
                                  product._id
                                );
                              }}
                              qtyValue={qty}
                            />
                            <Btn
                              variant="error"
                              size="xxs"
                              onClick={() => {
                                const { token, userId } = getLocalCredentials();
                                productRemoveFromCart(
                                  dispatch,
                                  token,
                                  userId,
                                  product._id
                                );
                              }}>
                              Remove from Cart
                            </Btn>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )
      )}
    </div>
  );
};

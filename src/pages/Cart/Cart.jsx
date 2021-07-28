import React, { useEffect } from 'react';
import './Cart.css';
import {
  totalProductsInArray,
  totalProductPrice,
} from '../../utils/array-functions';
import {
  productRemoveFromCart,
  updateCartItemQtyInDb,
  getUserCartItems,
} from '../../utils/serverRequests';
import { useNavigate } from 'react-router-dom';
import { SiHellofresh } from 'react-icons/si';
import { FaShippingFast } from 'react-icons/fa';
import { MdEventAvailable } from 'react-icons/md';
import { AiFillDollarCircle } from 'react-icons/ai';
import { useCartState } from '../../context/cart-context';
import { getLocalCredentials } from '../../utils/localStorage';
import { Btn, LoaderDonutSpinner, BtnInverted } from 'morphine-ui';
import { ChangeProductQtyBtn, EmptyCartOrWishlist } from '../../components/';

export const Cart = () => {
  const {
    state: { cartItems, showLoader },
    dispatch,
  } = useCartState();
  const navigate = useNavigate();

  useEffect(() => {
    getUserCartItems({ dispatch });
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

  if (cartItems && cartItems.length === 0 && !showLoader) {
    return (
      <EmptyCartOrWishlist displayText="Your Cart is Empty - Please add products" />
    );
  }

  return (
    // <div className="cart-container ">
    <div className="flex flex--column align-items--c justify-content--c flex-wrap--wrap gap--sm mt--sm">
      {cartItems && totalProductsInArray(cartItems) > 0 && (
        <div className="checkout-section flex flex--column flex-wrap--wrap gap">
          <div className="flex align-items--c justify-content--c flex-grow--3 my">
            <div className="flex align-items--c justify-content--se flex-wrap--wrap gap">
              <div className="text--md font-weight--600">
                Subtotal ({totalProductsInArray(cartItems)} items): ₹{' '}
                {totalProductPrice(cartItems).toFixed(2)}
              </div>
              <BtnInverted
                variant="success"
                shape="capsule"
                sm="xs"
                onClick={() => {
                  dispatch({
                    type: 'SET_CART_TOTAL',
                    payload: totalProductPrice(cartItems).toFixed(2),
                  });
                  navigate('/checkout');
                }}>
                <h4 className="font-weight--500">Proceed to Checkout</h4>
              </BtnInverted>
            </div>
          </div>
          <div className="flex align-items--c justify-content--c flex-wrap--wrap gap mt--sm">
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map(({ _id, quantity: qty, product }) => {
                return (
                  <div
                    key={_id}
                    className="bg--secondary border-radius--sm p--sm"
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      maxWidth: '26rem',
                      boxShadow:
                        'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
                    }}>
                    <div className="product-cardPosition flex gap">
                      <img
                        className="product__image cart-product-image cursor--pointer border-radius--sm"
                        src={product.images[1]}
                        alt={product.name}
                        style={{ height: '50%', width: '10rem' }}
                        onClick={() => navigate(`/product/${product._id}`)}
                      />
                      <div className="product__content flex flex--column gap--xxs p--xxs justify-content--c align-items--fs">
                        <div className="flex justify-content--sb">
                          <div className="text--md">
                            <div className="font-weight--600 flex">
                              {product.brandName}
                            </div>
                            <p className="text-align--l text--sm">
                              {product.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap--wrap align-items--c gap--xxs">
                          <span className="font-weight--600">
                            ₹ {product.price}
                          </span>
                          <span className="text--strikethrough text--sm">
                            {`₹ ${Math.round(
                              (product.price * 100) / (100 - product.price)
                            )}`}
                          </span>
                          <span className="text--sm text--themeRed font-weight--600 border-radius--xs">
                            ({product.discount} % OFF)
                          </span>
                        </div>
                        <div className="flex align-items--c justify-self--fs gap--sm">
                          {product?.sale && (
                            <AiFillDollarCircle className="text--primary text--xl" />
                          )}
                          {product?.fastDelivery && (
                            <FaShippingFast className="text--primary text--xl" />
                          )}
                          {product?.isNewProduct && (
                            <MdEventAvailable className="text--primary text--xl" />
                          )}
                          {product?.inStock && (
                            <SiHellofresh className="text--primary text--xl" />
                          )}
                        </div>
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
                          style={
                            {
                              // justifySelf: 'flex-end',
                              // alignSelf: 'flex-end',
                            }
                          }
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
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

import { ChangeProductQtyBtn } from '../../components/Buttons';
import { useCartState } from '../../context/cart-context';
import {
  totalProductsInArray,
  totalProductPrice,
} from '../../utils/array-functions';

import './Cart.css';
import { BtnInverted, Btn } from '../../components/morphine-ui';

export const Cart = () => {
  const {
    state: { cartItems },
    dispatch,
  } = useCartState();

  return (
    <div className="cart-container">
      {/* <h1>Cart</h1> */}
      {/* <>{JSON.stringify(cartItems)}</> */}
      {totalProductsInArray(cartItems) > 0 && (
        <div className="checkout-section flex flex-wrap--wrap gap">
          <div className="flex align-items--c justify-content--c flex-grow--3 my">
            <div className="flex align-items--c justify-content--se flex-wrap--wrap gap">
              <div className="text--xl font-weight--600">
                Subtotal ({totalProductsInArray(cartItems)} items): ₹{' '}
                {totalProductPrice(cartItems).toFixed(2)}
              </div>
              <BtnInverted variant="primary" shape="capsule" btnSize="md">
                <div className="font-weight--500">Proceed to Checkout</div>
              </BtnInverted>
            </div>
          </div>
          <div className="flex flex--column bg--secondary gap flex-grow--1 border-radius--xs ">
            {cartItems.length > 0 &&
              cartItems.map(
                ({
                  _id,
                  brandName,
                  image,
                  description,
                  price,
                  discount,
                  qty,
                }) => {
                  return (
                    <div key={_id}>
                      <div className="product-cardPosition flex gap">
                        <img
                          className="product__image cart-product-image"
                          src={image}
                          alt=""
                        />
                        <div className="product__content flex flex--column gap--xxs p--xxs">
                          <div className="flex justify-content--sb">
                            <div className="text--lg">
                              <div className="font-weight--600 flex">
                                {brandName}
                              </div>
                              <div className="text--grey text--md">
                                {description}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap--wrap align-items--c gap--xxs text--md">
                            <span className="font-weight--600">₹ {price}</span>
                            <span className="text--strikethrough text--md">
                              ₹ {Math.round((price * 100) / (100 - price))}
                            </span>
                            <span className="text--themeRed font-weight--600 border-radius--xs">
                              ({discount} % OFF)
                            </span>
                          </div>
                          <div className="flex align-items--c flex-wrap--wrap">
                            <ChangeProductQtyBtn
                              handleIncrementQty={() => {
                                dispatch({
                                  type: 'INCREMENT-PRODUCT-QTY-IN-CART',
                                  payload: { _id, qty },
                                });
                              }}
                              handleDecrementQty={() => {
                                dispatch({
                                  type: 'DECREMENT-PRODUCT-QTY-IN-CART',
                                  payload: { _id, qty },
                                });
                              }}
                              qtyValue={qty}
                            />
                            <Btn
                              styleProp={{
                                maxWidth: 'calc(5*var(--space-lg))',
                              }}
                              variant="error"
                              btnSize="sm"
                              handleOnClickProp={() =>
                                dispatch({
                                  type: 'REMOVE-FROM-CART',
                                  payload: { _id },
                                })
                              }>
                              Remove from Cart
                            </Btn>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      )}
    </div>
  );
};

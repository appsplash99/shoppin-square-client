import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartState } from '../../context/cart-context';
import { menImage, womenImage, handleFilterOnChange } from '../../utils/utils';
import { AiFillDollarCircle, AiFillStar } from 'react-icons/ai';
import { FaShippingFast } from 'react-icons/fa';
import { Btn } from 'morphine-ui';

export const Home = () => {
  const {
    state: { filterObj },
    dispatch,
  } = useCartState();
  const navigate = useNavigate();

  const titleStyles = {
    borderRadius: 'var(--space-lg)',
    bottom: 'var(--space-md)',
    backgroundColor: 'black',
    position: 'absolute',
    margin: '0 auto',
    width: '70%',
    right: '0',
    left: '0',
  };

  return (
    <div className="flex flex--column flex-wrap--wrap gap--lg mt--lg mb--lg">
      <h2
        className="bg--dark text--light w--50% p--md border-radius--xl"
        style={{ margin: '0 auto' }}>
        Shop by Category
      </h2>
      <div className="flex flex-wrap--wrap align-items--c justify-content--c gap--lg">
        <div>
          <div
            className="cursor--pointer"
            style={{ position: 'relative' }}
            onClick={() => {
              dispatch({ type: 'FILTER_CATEGORY', payload: 'men' });
              navigate('/men');
            }}>
            <img className="border-radius--sm" src={menImage} alt="men" />
            <h1
              style={titleStyles}
              className="text--xxl font-weight--700 text--light p--xs--sm">
              Men
            </h1>
          </div>
        </div>
        <div>
          <div
            className="cursor--pointer"
            style={{ position: 'relative' }}
            onClick={() => {
              dispatch({ type: 'FILTER_CATEGORY', payload: 'women' });
              navigate('/women');
            }}>
            <img className="border-radius--sm" src={womenImage} alt="men" />
            <h1
              style={titleStyles}
              className="text--xxl font-weight--700 text--light p--xs--sm">
              Women
            </h1>
          </div>
        </div>
      </div>
      <div
        style={{ border: '4px solid var(--themeDark)', margin: '0 auto' }}
        className="flex flex--column align-items--c justify-content--c gap border-radius--sm">
        <h2 className="bg--dark w--100% p--sm text--light">Or Shop By</h2>
        <div className="flex align-items--c justify-content--c gap--md p ">
          <Btn
            size="sm"
            variant="light"
            onClick={() => {
              handleFilterOnChange({
                filterObj,
                filterType: 'is_new_product',
                dispatch,
                dispatchType: 'FILTER_SALE_ITEM',
                payloadForTrue: true,
                payloadforFalse: false,
              });
              navigate('/shop');
            }}
            className="border-radius--sm flex flex--column align-items--c justify-content--c gap--sm">
            <AiFillDollarCircle className="text--xxxl" />
            Sale Items
          </Btn>
          <Btn
            size="sm"
            variant="light"
            onClick={() => {
              handleFilterOnChange({
                filterObj,
                filterType: 'is_new_product',
                dispatch,
                dispatchType: 'FILTER_IS_NEW_PRODUCT',
                payloadForTrue: true,
                payloadforFalse: false,
              });
              navigate('/shop');
            }}
            className="border-radius--sm flex flex--column align-items--c justify-content--c gap--sm">
            <AiFillStar className="text--xxxl" />
            New Products
          </Btn>
          <Btn
            size="sm"
            variant="light"
            onClick={() => {
              handleFilterOnChange({
                filterObj,
                filterType: 'fastDelivery',
                dispatch,
                dispatchType: 'FILTER_FAST_DELIVERY',
                payloadForTrue: true,
                payloadforFalse: false,
              });
              navigate('/shop');
            }}
            className="border-radius--sm flex flex--column align-items--c justify-content--c gap--sm">
            <FaShippingFast className="text--xxxl" />
            Fast Delivery
          </Btn>
        </div>
      </div>
    </div>
  );
};

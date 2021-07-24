import React from 'react';
import { Link } from 'react-router-dom';
import { useCartState } from '../../context/cart-context';

export const Home = () => {
  const { dispatch } = useCartState();

  const womenImage =
    'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2021/4/19/ec68db24-422b-4755-802d-9b7cf1b4e11b1618806979607-1.jpg';

  const menImage =
    'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11067734/2019/12/10/34b589c2-80b9-4ad9-81ea-84333fbc46761575972548055-DILLINGER-Men-Tshirts-4071575972546110-1.jpg';

  return (
    <div
      style={{ height: '92vh' }}
      className="flex flex-wrap--wrap align-items--c justify-content--c gap">
      <div>
        <div style={{ position: 'relative' }}>
          <img src={menImage} alt="men" />
          <Link
            to="/men"
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '0',
              backgroundColor: 'black',
              width: '100%',
            }}
            className="text-decoration--none text--xxl font-weight--700 text--light"
            onClick={() => {
              dispatch({ type: 'FILTER_CATEGORY', payload: 'men' });
            }}>
            Men
          </Link>{' '}
        </div>
      </div>
      <div>
        <div style={{ position: 'relative' }}>
          <img src={womenImage} alt="men" />
          <Link
            to="/women"
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '0',
              backgroundColor: 'black',
              width: '100%',
            }}
            className="text-decoration--none text--xxl font-weight--700 text--light"
            onClick={() => {
              dispatch({ type: 'FILTER_CATEGORY', payload: 'women' });
            }}>
            Women
          </Link>{' '}
        </div>
      </div>
    </div>
  );
};

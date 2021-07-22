import { Link } from 'react-router-dom';
import { NavLogo } from './NavLogo';
import { UserMenu } from './UserMenu';
import { useCartState } from '../../context/cart-context';
import {
  ALL_PRODUCTS,
  MENS_PRODUCT,
  WOMENS_PRODUCT,
} from '../../utils/apiRoutes';

const OldNavbar = ({ showMobileNav, setShowMobileNav }) => {
  const {
    // state: { currentProductsApiRoute },
    dispatch: categoryDispatch,
  } = useCartState();

  return (
    <ul
      className={`resp-nav__navbar nav__list p--md ${
        showMobileNav ? ' mobile-nav--visible' : ' mobile-nav--hidden'
      }`}>
      <li className="resp-nav__navbar--item1">
        <NavLogo />
      </li>
      {/* TODO: MOVE SEARCH TO SHOP COMPONENT */}
      {/* <li className="resp-nav__navbar--item2">
        <SearchBar />
      </li> */}
      <li className="resp-nav__navbar--item3">
        <UserMenu />
      </li>
      <li className="resp-nav__navbar--item4">
        <ul className="resp-nav__shopping-menu nav__list text--md font-weight--600 gap--xxs">
          <li>
            <Link
              to="/shop"
              className="nav__link resp-nav__mobile-link text--secondary"
              onClick={() => {
                categoryDispatch({
                  type: 'CHANGE-PRODUCT-CATEGORY',
                  payload: { route: ALL_PRODUCTS },
                });
                // console.log({ currentProductsApiRoute });
              }}>
              Shop
            </Link>
            <Link
              to="/shop"
              className="nav__link resp-nav__desktop-link text--themeRed">
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/men"
              className="nav__link text--primary"
              onClick={() => {
                categoryDispatch({
                  type: 'CHANGE-PRODUCT-CATEGORY',
                  payload: { route: MENS_PRODUCT },
                });
              }}>
              Men
            </Link>
          </li>
          <li>
            <Link
              to="/women"
              className="nav__link text--primary"
              onClick={() => {
                categoryDispatch({
                  type: 'CHANGE-PRODUCT-CATEGORY',
                  payload: { route: WOMENS_PRODUCT },
                });
              }}>
              Women
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export { OldNavbar };

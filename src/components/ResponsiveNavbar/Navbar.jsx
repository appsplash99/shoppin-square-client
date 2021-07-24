import { Link } from 'react-router-dom';
import { NavLogo } from './NavLogo';
import { UserMenu } from './UserMenu';
import { useCartState } from '../../context/cart-context';

export const Navbar = ({ showMobileNav, setShowMobileNav }) => {
  const { dispatch } = useCartState();

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
                dispatch({ type: 'FILTER_CATEGORY', payload: '' });
              }}>
              Shop
            </Link>
            <Link
              to="/shop"
              className="nav__link resp-nav__desktop-link text--themeRed"
              onClick={() => {
                dispatch({ type: 'FILTER_CATEGORY', payload: '' });
              }}>
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/men"
              className="nav__link text--primary"
              onClick={() => {
                dispatch({ type: 'FILTER_CATEGORY', payload: 'men' });
              }}>
              Men
            </Link>
          </li>
          <li>
            <Link
              to="/women"
              className="nav__link text--primary"
              onClick={() => {
                dispatch({ type: 'FILTER_CATEGORY', payload: 'women' });
              }}>
              Women
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

import { Link } from 'react-router-dom';
import { NavLogo } from './NavLogo';
import { UserMenu } from './UserMenu';

const OldNavbar = ({ showMobileNav, setShowMobileNav }) => {
  return (
    <ul
      className={`resp-nav__navbar nav__list p--md ${
        showMobileNav ? ' mobile-nav--visible' : ' mobile-nav--hidden'
      }`}>
      <li
        className="resp-nav__navbar--item1"
        onClick={() => setShowMobileNav(!showMobileNav)}>
        <NavLogo />
      </li>
      {/* <li className="resp-nav__navbar--item2">
        <SearchBar />
      </li> */}
      <li className="resp-nav__navbar--item3">
        <UserMenu />
      </li>
      <li className="resp-nav__navbar--item4">
        <ul className="resp-nav__shopping-menu nav__list text--sm font-weight--600 gap--xxs">
          <li>
            <Link
              to="/login"
              className="nav__link text--primary bg--primary p--xxs text--light"
              onClick={() => setShowMobileNav(!showMobileNav)}>
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="nav__link text--primary bg--primary p--xxs text--light"
              onClick={() => setShowMobileNav(!showMobileNav)}>
              Signup
            </Link>
          </li>
          <li>
            <Link
              to="shop"
              className="nav__link resp-nav__mobile-link text--primary"
              onClick={() => setShowMobileNav(!showMobileNav)}>
              Shop
            </Link>
            <Link
              to="shop"
              className="nav__link resp-nav__desktop-link text--primary">
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/#"
              className="nav__link text--primary"
              onClick={() => setShowMobileNav(!showMobileNav)}>
              Men
            </Link>
          </li>
          <li>
            <Link
              to="/#"
              className="nav__link text--primary"
              onClick={() => setShowMobileNav(!showMobileNav)}>
              Women
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export { OldNavbar };

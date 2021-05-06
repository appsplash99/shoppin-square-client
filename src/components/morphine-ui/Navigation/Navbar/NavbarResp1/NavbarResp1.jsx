import './NavbarResp1.css';
import { FaBars, FaSquarespace, FaWindowClose } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { BtnIcon } from '../../../Button';
import {
  defaultDesktopMenuStyles,
  defaultMobileMenuStyles,
} from './navbarResp1Styles';

export const NavbarResp1 = ({
  children,
  hamburgerIcon,
  navbarLogo,
  navbarSearchIcon,
  navbarContentCenter,
  navbarDesktopContentLeft,
  navbarDesktopContentRight,
  actionButtonsContainer,
  showMobileMenu,
  handleShowMobileMenu,
  styleProp = {},
  classNameProp = '',
  desktopMenuStyleProp = {},
  mobileMenuStyleProp = {},
}) => {
  return (
    <nav className={`navbar-resp1 ${classNameProp}`} style={{ ...styleProp }}>
      <div className="navbar-resp1__desktop ">
        <div
          style={{
            backgroundColor: 'pink',
            ...defaultDesktopMenuStyles,
            ...desktopMenuStyleProp,
          }}
        >
          {navbarDesktopContentLeft || (
            <div className="flex align-items--c gap--md">
              {navbarLogo || (
                <div className="flex align-items--c gap--xxs font-weight--500">
                  <FaSquarespace className="text--primary text--xxl" />
                  <span className="text--lg">Shoppin Square</span>
                </div>
              )}
              <div className="flex gap--sm font-weight--600">{children}</div>
            </div>
          )}

          {navbarContentCenter}

          {navbarDesktopContentRight || (
            <div className="flex align-items--c gap--md">
              {actionButtonsContainer}
              {navbarSearchIcon || (
                <BtnIcon classNameProp="font-weight--400" btnSize="lg">
                  <IoIosSearch className="text--lg" />
                </BtnIcon>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={`navbar-resp1__mobile ${' fadeInDown'}`}>
        <div className="flex align-items--c justify-content--sb p--xs">
          <div className="flex flex--column align-items--c gap--xxs font-weight--500 p--xxs">
            {navbarLogo || (
              <FaSquarespace className="text--primary text--xxl" />
            )}
          </div>
          <div className="flex align-items--c gap--xxs">
            {navbarSearchIcon || (
              <BtnIcon classNameProp="font-weight--400" btnSize="lg">
                <IoIosSearch className="text--lg" />
              </BtnIcon>
            )}
            <BtnIcon btnSize="lg" handleOnClickProp={handleShowMobileMenu}>
              {hamburgerIcon || !showMobileMenu ? (
                <FaBars className="text--dark text--xl" />
              ) : (
                <FaWindowClose className="text--dark text--xl" />
              )}
            </BtnIcon>
          </div>
        </div>
        <div
          style={{
            ...defaultMobileMenuStyles,
            backgroundColor: 'tomato',
            display: showMobileMenu ? 'flex' : 'none',
            ...mobileMenuStyleProp,
          }}
        >
          <div className="flex flex--column font-weight--500 text--lg">
            {children}
          </div>
          <div className="flex flex--column gap--xs w--50%">
            {actionButtonsContainer}
          </div>
        </div>
      </div>
    </nav>
  );
};

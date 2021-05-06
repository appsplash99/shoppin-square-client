import './TopbarResp1.css';
import { FaBars } from 'react-icons/fa';
import { BtnIcon } from '../../../Button';
import {
  // topbarResp,
  // topbarRespDesktopMenu,
  // topbarRespMobileContainer,
  topbarRespMobileMenu,
} from './topbarRespBaseStyles';

export const TopbarResp1 = ({
  children,
  showMobileMenu,
  handleShowMobileMenu,
  classNameProp = '',
  styleProp = {},
  hamburgerIcon,
  desktopMenuStyleProp = {},
  mobileMenuStyleProp = {},
}) => {
  return (
    <nav
      className={`topbar-resp bg--secondary ${classNameProp}`}
      style={{ ...styleProp }}
    >
      <div className="topbar-resp__desktop">
        <div
          className="flex align-items--c justify-content--c gap--md"
          style={{ ...desktopMenuStyleProp }}
        >
          {children}
          {!children && 'defaultLink1'}
          {!children && 'defaultLink2'}
          {!children && 'defaultLink3'}
          {!children && 'defaultLink4'}
        </div>
      </div>
      <div className={`topbar-resp__mobile ${' fadeInDown'}`}>
        <BtnIcon
          btnSize="lg"
          handleOnClickProp={handleShowMobileMenu}
          // circular={false}
        >
          {hamburgerIcon || <FaBars className="text--light text--sm" />}
        </BtnIcon>
        <div
          style={{
            ...topbarRespMobileMenu,
            display: showMobileMenu ? 'flex' : 'none',
            ...mobileMenuStyleProp,
          }}
        >
          {children}
          {!children && 'defaultLink1'}
          {!children && 'defaultLink2'}
          {!children && 'defaultLink3'}
          {!children && 'defaultLink4'}
        </div>
      </div>
    </nav>
  );
};

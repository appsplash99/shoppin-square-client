import { Navbar } from './Navbar';
import { UserMenu } from './UserMenu';
import './ResponsiveNavbar.css';
import { FaSquarespace, FaWindowClose } from 'react-icons/fa';
import { Btn } from 'morphine-ui';

const ResponsiveNavbar = ({ showMobileNav, setShowMobileNav }) => {
  return (
    <div className="resp-nav__container">
      <div className="flex align-items--c gap--xs">
        <Btn
          size="xs"
          variant={!showMobileNav ? 'dark' : 'light'}
          onClick={() => setShowMobileNav(!showMobileNav)}
          className="text--xxl">
          {!showMobileNav ? (
            <FaSquarespace className="text--light text--lg" />
          ) : (
            <FaWindowClose className="text--lg" />
          )}
        </Btn>
      </div>
      <UserMenu />
      <Navbar
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
      />
    </div>
  );
};

export { ResponsiveNavbar };

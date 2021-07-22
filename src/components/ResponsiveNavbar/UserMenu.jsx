import { Link } from 'react-router-dom';
import { GiShoppingBag } from 'react-icons/gi';
// import { FcLike, FcBusinesswoman } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';
import { FaUserPlus } from 'react-icons/fa';
import { RiLoginCircleFill, RiLogoutCircleRFill } from 'react-icons/ri';
import { DataBadgeIcon, Btn, BtnInverted } from 'morphine-ui';
import { useCartState } from '../../context/cart-context';
import { getLocalCredentials } from '../../utils/localStorage';
import { logOutUser } from '../../utils/newServerRequests';

const UserMenu = () => {
  const { state, dispatch } = useCartState();
  const { token } = getLocalCredentials();

  if (!token) {
    return (
      <div className="resp-nav__user-menu flex align-items--c justify-content--c text--dark text--md flex gap--md">
        <Link to="/login" className="text-decoration--none">
          <BtnInverted
            shape="capsule"
            variant="primary"
            size="sm"
            className="flex align-items--c gap--xs"
            style={{
              padding: 'var(--space-xs) var(--space-sm)',
            }}>
            <RiLoginCircleFill className="text--md" />
            Login
          </BtnInverted>
        </Link>
        <Link to="/signup" className="text-decoration--none">
          <Btn
            shape="capsule"
            variant="primary"
            size="sm"
            className="flex align-items--c gap--xs"
            style={{
              padding: 'var(--space-xs) var(--space-sm)',
            }}>
            <FaUserPlus className="text--md" />
            Signup
          </Btn>
        </Link>
      </div>
    );
  }

  return (
    <div className="resp-nav__user-menu flex align-items--c justify-content--c text--dark text--md gap--xs">
      <Link className="nav__link text--primary" to="wishlist">
        <DataBadgeIcon
          variant="circular"
          data={state && state.wishlistItems ? state.wishlistItems.length : 0}
          icon={<FcLike className="text--xl" />}
          iconStyleProp={{ backgroundColor: 'inherit' }}
          badgeDataStyleProp={{
            top: 0,
            backgroundColor: 'var(--themeRed)',
            margin: 0,
            color: 'var(--light)',
          }}></DataBadgeIcon>
      </Link>
      <Link className="nav__link text--primary" to="cart">
        <DataBadgeIcon
          variant="circular"
          data={state && state.cartItems ? state.cartItems.length : 0}
          icon={<GiShoppingBag className="text--xl text--success" />}
          iconStyleProp={{ backgroundColor: 'inherit' }}
          badgeDataStyleProp={{
            top: 0,
            backgroundColor: 'var(--themeRed)',
            margin: 0,
            color: 'var(--light)',
          }}></DataBadgeIcon>
      </Link>
      {/* TODO: ADD USER PROFILE */}
      {/* <Link className="nav__link text--primary" to="user-profile">
        <DataBadgeIcon
          variant="circular"
          icon={<FcBusinesswoman className="text--xl" />}
          iconStyleProp={{ backgroundColor: 'inherit' }}
          badgeDataStyleProp={{
            top: 0,
            backgroundColor: 'var(--themeRed)',
            margin: 0,
            color: 'var(--light)',
          }}></DataBadgeIcon>
      </Link> */}
      <Link className="nav__link text--primary" to="/">
        <DataBadgeIcon
          variant="circular"
          data={0}
          icon={
            <RiLogoutCircleRFill
              className="text--xl"
              onClick={() => logOutUser(dispatch)}
            />
          }
          iconStyleProp={{ backgroundColor: 'inherit' }}
          badgeDataStyleProp={{
            top: 0,
            backgroundColor: 'var(--themeRed)',
            margin: 0,
            color: 'var(--light)',
          }}></DataBadgeIcon>
      </Link>
    </div>
  );
};

export { UserMenu };

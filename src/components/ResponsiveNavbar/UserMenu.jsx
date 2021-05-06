import { Link } from 'react-router-dom';
import { FaUserCircle, FaHeart, FaUser } from 'react-icons/fa';
import { DataBadgeIcon } from '../morphine-ui';
import { useCartState } from '../../context/cart-context';
import { GiShoppingBag } from 'react-icons/gi';

const UserMenu = () => {
  const {
    state: { wishlistItems, cartItems },
  } = useCartState();

  return (
    <div className="resp-nav__user-menu flex align-items--c justify-content--c text--dark text--md">
      <Link className="nav__link text--primary" to="login">
        <DataBadgeIcon
          variant="circular"
          icon={<FaUserCircle />}
          iconStyleProp={{ backgroundColor: 'inherit' }}
          badgeDataStyleProp={{
            top: 0,
            backgroundColor: 'var(--themeRed)',
            margin: 0,
            color: 'var(--light)',
          }}></DataBadgeIcon>
      </Link>
      <Link className="nav__link text--primary" to="wishlist">
        <DataBadgeIcon
          variant="circular"
          data={wishlistItems.length}
          icon={<FaHeart />}
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
          data={cartItems.length}
          icon={<GiShoppingBag />}
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

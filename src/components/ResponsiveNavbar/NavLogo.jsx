import { Link } from 'react-router-dom';
import { FaSquarespace } from 'react-icons/fa';

const NavLogo = () => {
  return (
    <Link
      to="/"
      className="resp-nav__logo-container text-decoration--none text--primary">
      <div className="flex flex--column align-items--c">
        <FaSquarespace className="text--primary text--xxxl" />
      </div>
    </Link>
  );
};

export { NavLogo };

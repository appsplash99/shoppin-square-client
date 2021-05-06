import { FaSearch } from 'react-icons/fa';
import { Btn } from '../morphine-ui';

const SearchBar = () => {
  return (
    <form className="resp-nav__search border-radius--xl text--sm">
      <input
        type="search"
        className="search__input text--sm"
        placeholder="Search for products, brands and more"
      />
      <Btn
        variant="secondary"
        btnSize="xxs"
        shape="capsule"
        classNameProp="flex flex--column align-items--c justify-content--c">
        <FaSearch />
      </Btn>
    </form>
  );
};

export { SearchBar };

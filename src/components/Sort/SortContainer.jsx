import { BtnIcon } from 'morphine-ui';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCartState } from '../../context/cart-context';
import { ALL_PRODUCTS } from '../../utils/apiRoutes';
import { loadProductsFromDB } from '../../utils/serverRequests';

export const SortContainer = ({ handleCloseSortContainer }) => {
  const {
    state: { sortBy, currentProductsApiRoute },
    state,
    dispatch,
  } = useCartState();

  const handleOnchange = async (e) => {
    const sortingValue = e.target.value;
    let url;
    if (currentProductsApiRoute === ALL_PRODUCTS) {
      url = `${currentProductsApiRoute}?sort=${sortingValue}`;
    } else {
      url = `${currentProductsApiRoute}&sort=${sortingValue}`;
    }
    console.log({ sortingValue, url });
    const { data } = await loadProductsFromDB(url);
    // TODO: getting sorted data but unable to add it to state
    console.log({ data });
    // dispatch({ type: 'SHOW_LOADER' });
    dispatch({ type: 'LOAD_PRODUCTS', payload: data });
    console.log({ state });
    // dispatch({ type: 'HIDE_LOADER' });
  };

  return (
    // <div className="sort-container">
    <div
      style={{
        position: 'absolute',
        zIndex: 'var(--zIndex--overlay)',
        minWidth: '15rem',
        backgroundColor: 'var(--themeSecondary)',
        marginTop: 'var(--space-xxs)',
        borderRadius: 'var(--space-sm)',
        left: '-70%',
      }}>
      <div className="flex flex--row-reverse p">
        <BtnIcon
          size="lg"
          onClick={handleCloseSortContainer}
          style={{ position: 'absolute', top: 0, right: 0 }}>
          <IoIosCloseCircle className="text--xl cursor--pointer" />
        </BtnIcon>
        <div className="flex flex--column gap--sm align-items--fs justify-content--c">
          {/* PRODUCTS SORTER */}
          <div>
            <label className="text--sm">
              <input
                type="radio"
                name="sort"
                value="price_asc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy}
              />
              Price (Lowest First)
            </label>
          </div>
          <div>
            <label className="text--sm">
              <input
                type="radio"
                name="sort"
                value="price_desc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy}
              />
              Price (Highest First)
            </label>
          </div>
          {/* Discount SORTER */}
          <div>
            <label className="text--sm">
              <input
                type="radio"
                name="sort"
                value="discount_asc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy}
              />
              Discount (Lowest First)
            </label>
          </div>
          <div>
            <label className="text--sm">
              <input
                type="radio"
                name="sort"
                value="discount_desc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy}
              />
              Discount (Highest First)
            </label>
          </div>
          {/* Ratings SORTER */}
          <div>
            <label className="text--sm">
              <input
                type="radio"
                name="sort"
                value="ratings_asc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy}
              />
              Ratings (Lowest First)
            </label>
          </div>
          <div>
            <label className="text--sm">
              <input
                type="radio"
                name="sort"
                value="ratings_desc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy}
              />
              Ratings (Highest First)
            </label>
          </div>
          {/* Number of Ratings SORTER */}
          <div>
            <label className="text--sm">
              <input
                type="radio"
                name="sort"
                className="mx--sm radio-btn"
                value="number_of_ratings_asc"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy}
              />
              Least Number of Ratings
            </label>
          </div>
          <div>
            <label className="text--sm">
              <input
                type="radio"
                name="sort"
                value="number_of_ratings_desc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy}
              />
              Most Number of Ratings
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

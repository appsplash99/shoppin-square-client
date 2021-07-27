import { BtnIcon, Btn } from 'morphine-ui';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCartState } from '../../context/cart-context';

export const SortContainer = ({ handleCloseSortContainer }) => {
  const {
    state: { sortBy },
    dispatch,
  } = useCartState();

  const handleOnchange = async (e) => {
    const sortingValue = e.target.value;
    dispatch({ type: 'SORT', payload: sortingValue });
  };

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 'var(--zIndex--overlay)',
        minWidth: '15rem',
        backgroundColor: 'var(--themeSecondary)',
        marginTop: 'var(--space-xxs)',
        borderRadius: 'var(--space-sm)',
        left: '-50%',
      }}>
      <div className="flex flex--column p">
        <BtnIcon
          size="lg"
          onClick={handleCloseSortContainer}
          style={{
            position: 'absolute',
            top: 'var(--space-xxxs)',
            right: 'var(--space-xxxs)',
          }}>
          <IoIosCloseCircle className="text--xl cursor--pointer" />
        </BtnIcon>
        <div className="flex flex--column gap--sm align-items--fs justify-content--fs">
          <div className="flex flex--column gap--sm align-items--fs justify-content--fs">
            {sortBy && (
              <Btn
                size="xxxs"
                variant="error"
                shape="capsule"
                onClick={() => dispatch({ type: 'SORT', payload: null })}>
                Clear Sort
              </Btn>
            )}
          </div>
          {/* PRODUCTS SORTER */}
          <div>
            <label className="text--sm cursor--pointer">
              <input
                type="radio"
                name="sort"
                value="price_asc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy === 'price_asc'}
              />
              Price (Lowest First)
            </label>
          </div>
          <div>
            <label className="text--sm cursor--pointer">
              <input
                type="radio"
                name="sort"
                value="price_desc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy === 'price_desc'}
              />
              Price (Highest First)
            </label>
          </div>
          {/* Discount SORTER */}
          <div>
            <label className="text--sm cursor--pointer">
              <input
                type="radio"
                name="sort"
                value="discount_asc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy === 'discount_asc'}
              />
              Discount (Lowest First)
            </label>
          </div>
          <div>
            <label className="text--sm cursor--pointer">
              <input
                type="radio"
                name="sort"
                value="discount_desc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy === 'discount_desc'}
              />
              Discount (Highest First)
            </label>
          </div>
          {/* Ratings SORTER */}
          <div>
            <label className="text--sm cursor--pointer">
              <input
                type="radio"
                name="sort"
                value="ratings_asc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy === 'ratings_asc'}
              />
              Ratings (Lowest First)
            </label>
          </div>
          <div>
            <label className="text--sm cursor--pointer">
              <input
                type="radio"
                name="sort"
                value="ratings_desc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy === 'ratings_desc'}
              />
              Ratings (Highest First)
            </label>
          </div>
          {/* Number of Ratings SORTER */}
          <div>
            <label className="text--sm cursor--pointer">
              <input
                type="radio"
                name="sort"
                className="mx--sm radio-btn"
                value="number_of_ratings_asc"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy === 'number_of_ratings_asc'}
              />
              Least Number of Ratings
            </label>
          </div>
          <div>
            <label className="text--sm cursor--pointer">
              <input
                type="radio"
                name="sort"
                value="number_of_ratings_desc"
                className="mx--sm radio-btn"
                onChange={async (e) => handleOnchange(e)}
                checked={sortBy === 'number_of_ratings_desc'}
              />
              Most Number of Ratings
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

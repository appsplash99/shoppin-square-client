import { BtnIcon } from 'morphine-ui';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCartState } from '../../context/cart-context';

export const NewtSortContainer = ({ handleCloseSortContainer }) => {
  const {
    state: { sortBy },
    dispatch: sorterDispatch,
  } = useCartState();

  return (
    <div className="sort-container">
      <div className="flex flex--row-reverse p">
        <BtnIcon
          size="lg"
          onClick={handleCloseSortContainer}
          style={{ position: 'absolute', top: 0, right: 0 }}>
          <IoIosCloseCircle className="text--xl" />
        </BtnIcon>
        <div lassName="flex flex--column gap align-items--c justify-content--c">
          {/* PRODUCTS SORTER */}
          <div>
            <label className="text--sm">
              <input
                type="radio"
                name="sort"
                className="m--xxs"
                onChange={() =>
                  sorterDispatch({ type: 'SORT', payload: 'PRICE_LOW_TO_HIGH' })
                }
                checked={sortBy && sortBy === 'PRICE_LOW_TO_HIGH'}
              />
              Price (Lowest First)
            </label>
          </div>
          <div>
            <label className="text--sm">
              <input
                type="radio"
                name="sort"
                className="m--xxs"
                onChange={() =>
                  sorterDispatch({ type: 'SORT', payload: 'PRICE_LOW_TO_HIGH' })
                }
                checked={sortBy && sortBy === 'PRICE_LOW_TO_HIGH'}
              />
              Price (Lowest First)
            </label>
          </div>
          {/* Discount SORTER */}
          <div>
            <label className="text--sm">
              <input type="radio" name="sort" className="m--xxs" />
              Discount (Lowest First)
            </label>
          </div>
          <div>
            <label className="text--sm">
              <input type="radio" name="sort" className="m--xxs" />
              Discount (Highest First)
            </label>
          </div>
          {/* Ratings SORTER */}
          <div>
            <label className="text--sm">
              <input type="radio" name="sort" className="m--xxs" />
              Ratings (Lowest First)
            </label>
          </div>
          <div>
            <label className="text--sm">
              <input type="radio" name="sort" className="m--xxs" />
              Ratings (Highest First)
            </label>
          </div>
          {/* Number of Ratings SORTER */}
          <div>
            <label className="text--sm">
              <input type="radio" name="sort" className="m--xxs" />
              Least Number of Ratings (Lowest First)
            </label>
          </div>
          <div>
            <label className="text--sm">
              <input type="radio" name="sort" className="m--xxs" />
              Most Number of Ratings (Highest First)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

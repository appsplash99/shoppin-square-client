import { BtnIcon, Btn } from 'morphine-ui';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCartState } from '../../context/cart-context';
import { handleFilterOnChange } from '../../utils/utils';

export const FilterContainer = ({ handleCloseFilterContainer }) => {
  const {
    state: { filterObj },
    dispatch,
  } = useCartState();
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 'var(--zIndex--overlay)',
        minWidth: '12rem',
        backgroundColor: 'var(--themeSecondary)',
        marginTop: 'var(--space-xxs)',
        borderRadius: 'var(--space-sm)',
        left: '-45%',
      }}>
      <div className="flex flex--column p">
        <BtnIcon
          size="lg"
          onClick={handleCloseFilterContainer}
          style={{
            position: 'absolute',
            top: 'var(--space-xxxs)',
            right: 'var(--space-xxxs)',
          }}>
          <IoIosCloseCircle className="text--xl cursor--pointer" />
        </BtnIcon>
        <div className="flex flex--column gap--sm align-items--fs justify-content--fs">
          {Object.keys(filterObj).length > 0 && (
            <Btn
              size="xxxs"
              variant="error"
              shape="capsule"
              onClick={() => dispatch({ type: 'CLEAR_ALL_FILTERS' })}>
              Clear all Filters
            </Btn>
          )}
          <div>
            <label className="text--sm cursor--pointer">
              <input
                type="checkbox"
                className="mx--sm check-btn"
                checked={filterObj['is_new_product'] === true}
                onChange={() =>
                  handleFilterOnChange({
                    filterObj,
                    filterType: 'is_new_product',
                    dispatch,
                    dispatchType: 'FILTER_IS_NEW_PRODUCT',
                    payloadForTrue: true,
                    payloadforFalse: false,
                  })
                }
              />
              New Products
            </label>
          </div>
          <div>
            <label className="text--sm cursor--pointer">
              <input
                type="checkbox"
                className="mx--sm check-btn"
                checked={filterObj['in_stock'] === true}
                onChange={() =>
                  handleFilterOnChange({
                    filterObj,
                    filterType: 'in_stock',
                    dispatch,
                    dispatchType: 'FILTER_IN_STOCK',
                    payloadForTrue: true,
                    payloadforFalse: false,
                  })
                }
              />
              In Stock
            </label>
          </div>
          <div>
            <label className="text--sm cursor--pointer">
              <input
                type="checkbox"
                className="mx--sm check-btn"
                checked={filterObj['sale'] === true}
                onChange={() =>
                  handleFilterOnChange({
                    filterObj,
                    filterType: 'sale',
                    dispatch,
                    dispatchType: 'FILTER_SALE_ITEM',
                    payloadForTrue: true,
                    payloadforFalse: false,
                  })
                }
              />
              Sale Item
            </label>
          </div>
          <div>
            <label className="text--sm cursor--pointer">
              <input
                type="checkbox"
                className="mx--sm check-btn"
                checked={filterObj['fast_delivery'] === true}
                onChange={() =>
                  handleFilterOnChange({
                    filterObj,
                    filterType: 'fast_delivery',
                    dispatch,
                    dispatchType: 'FILTER_FAST_DELIVERY',
                    payloadForTrue: true,
                    payloadforFalse: false,
                  })
                }
              />
              Fast Delivery
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

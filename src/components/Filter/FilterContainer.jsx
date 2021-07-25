import { BtnIcon } from 'morphine-ui';
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
        minWidth: '15rem',
        backgroundColor: 'var(--themeSecondary)',
        marginTop: 'var(--space-xxs)',
        borderRadius: 'var(--space-sm)',
        left: '-65%',
      }}>
      <div className="flex p">
        <BtnIcon
          size="lg"
          onClick={handleCloseFilterContainer}
          style={{ position: 'absolute', top: 0, right: 0 }}>
          <IoIosCloseCircle className="text--xl cursor--pointer" />
        </BtnIcon>
        <div className="flex flex--column gap--sm align-items--fs justify-content--fs">
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
                    payloadforFalse: '',
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
                    payloadforFalse: '',
                  })
                }
              />
              Exclude Out of Stock
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
                    payloadforFalse: '',
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
                checked={filterObj['fastDelivery'] === true}
                onChange={() =>
                  handleFilterOnChange({
                    filterObj,
                    filterType: 'fastDelivery',
                    dispatch,
                    dispatchType: 'FILTER_FAST_DELIVERY',
                    payloadForTrue: true,
                    payloadforFalse: '',
                  })
                }
              />
              Fast Delivery
            </label>
          </div>
          {/* TODO: ADD BELOW FILTER OR REMOVE */}
          {/* <div>
            <label className="text--sm cursor--pointer">
              <input
                type="checkbox"
                className="mx--sm check-btn"
                checked={showFastDeliveryOnly}
                onChange={() => filterDispatch({ type: 'TOGGLE_DELIVERY' })}
              />
              Offer
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

import { BtnIcon } from 'morphine-ui';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCartState } from '../../context/cart-context';

export const NewFilterContainer = ({ handleCloseFilterContainer }) => {
  const {
    state: { showAllInventory, showFastDeliveryOnly },
    dispatch: filterDispatch,
  } = useCartState();
  return (
    // <div className="filter-container" style={{}}>
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
            <label className="text--sm">
              <input
                type="checkbox"
                className="mx--sm check-btn"
                checked={showAllInventory}
                onChange={() => filterDispatch({ type: 'TOGGLE_INVENTORY' })}
              />
              Include Out of Stock
            </label>
          </div>
          <div>
            <label className="text--sm">
              <input
                type="checkbox"
                className="mx--sm check-btn"
                checked={showFastDeliveryOnly}
                onChange={() => filterDispatch({ type: 'TOGGLE_DELIVERY' })}
              />
              Sale Item
            </label>
          </div>
          <div>
            <label className="text--sm">
              <input
                type="checkbox"
                className="mx--sm check-btn"
                checked={showFastDeliveryOnly}
                onChange={() => filterDispatch({ type: 'TOGGLE_DELIVERY' })}
              />
              Include Out of Stock
            </label>
          </div>
          <div>
            <label className="text--sm">
              <input
                type="checkbox"
                className="mx--sm check-btn"
                checked={showFastDeliveryOnly}
                onChange={() => filterDispatch({ type: 'TOGGLE_DELIVERY' })}
              />
              Fast Delivery
            </label>
          </div>
          <div>
            <label className="text--sm">
              <input
                type="checkbox"
                className="mx--sm check-btn"
                checked={showFastDeliveryOnly}
                onChange={() => filterDispatch({ type: 'TOGGLE_DELIVERY' })}
              />
              Offer
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

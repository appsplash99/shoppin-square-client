import { BtnIcon } from 'morphine-ui';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCartState } from '../../context/cart-context';

export const NewFilterContainer = ({ handleCloseFilterContainer }) => {
  const {
    state: { showAllInventory, showFastDeliveryOnly },
    dispatch: filterDispatch,
  } = useCartState();
  return (
    <div className="filter-container">
      <div className="flex flex--row-reverse p">
        <BtnIcon
          size="lg"
          onClick={handleCloseFilterContainer}
          style={{ position: 'absolute', top: 0, right: 0 }}>
          <IoIosCloseCircle className="text--xl" />
        </BtnIcon>
        <div lassName="flex flex--column gap align-items--c justify-content--c">
          <div>
            <label className="text--sm">
              <input
                type="checkbox"
                className="m--xxs"
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
                className="m--xxs"
                checked={showFastDeliveryOnly}
                onChange={() => filterDispatch({ type: 'TOGGLE_DELIVERY' })}
              />
              Fast Delivery
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

import './ChangeProductQtyBtn.css';
import { BtnIcon } from 'morphine-ui';
import { FaMinusSquare, FaPlusSquare, FaTrashAlt } from 'react-icons/fa';

export const ChangeProductQtyBtn = ({
  qtyValue,
  handleIncrementQty,
  handleDecrementQty,
  handleRemoveCartItem,
}) => {
  return (
    <div className="font-weight--500 flex flex--column align-items--fs justify-content--c gap--sm">
      <div className="flex align-items--c">
        <BtnIcon size="lg" id="decrease" value="Decrease Value">
          {qtyValue !== 1 ? (
            <FaMinusSquare className="text--md" onClick={handleDecrementQty} />
          ) : (
            <FaTrashAlt
              className="text--md text--danger"
              onClick={handleRemoveCartItem}
            />
          )}
        </BtnIcon>
        <div className="qtyValue p--xs">{qtyValue}</div>
        <BtnIcon
          size="lg"
          id="increase"
          onClick={handleIncrementQty}
          value="Increase Value">
          <FaPlusSquare className="text--md" />
        </BtnIcon>
      </div>
    </div>
  );
};

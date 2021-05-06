import './ChangeProductQtyBtn.css';
import { BtnIcon } from '../../components/morphine-ui';
import { FaMinusSquare, FaPlusSquare, FaTrashAlt } from 'react-icons/fa';

export const ChangeProductQtyBtn = ({
  handleIncrementQty,
  qtyValue,
  handleDecrementQty,
}) => {
  return (
    <div className="font-weight--500 flex flex--column align-items--fs justify-content--c gap--sm p--xs">
      <div className="flex align-items--c">
        <BtnIcon
          btnSize="lg"
          id="decrease"
          handleOnClickProp={handleDecrementQty}
          value="Decrease Value">
          {qtyValue !== 1 ? (
            <FaMinusSquare className="text--md" />
          ) : (
            <FaTrashAlt className="text--md" />
          )}
        </BtnIcon>
        <div className="qtyValue p--sm">{qtyValue}</div>
        <BtnIcon
          btnSize="lg"
          id="increase"
          handleOnClickProp={handleIncrementQty}
          value="Increase Value">
          <FaPlusSquare className="text--md" />
        </BtnIcon>
      </div>
    </div>
  );
};

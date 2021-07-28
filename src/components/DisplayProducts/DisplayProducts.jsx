import React from 'react';
import { Btn } from 'morphine-ui';
import { useCartState } from '../../context/cart-context';

export const DisplayProducts = () => {
  const {
    state: {
      pagination: { productsPerPage },
    },
    dispatch,
  } = useCartState();

  const handleOnChange = (e) => {
    // TODO: Do the dispatch
    console.log(e.target.value);
    dispatch({ type: 'SET_PRODUCTS_PER_PAGE', payload: e.target.value });
  };

  return (
    <Btn
      disableRipple
      size="xs"
      variant="primary"
      className="flex align-items--c gap--sm">
      <p className="text--light text--sm">Products Per Page</p>
      <select
        value={productsPerPage}
        onChange={handleOnChange}
        className="bg--secomndary cursor--pointer">
        <option value={5} className="text--dark">
          5
        </option>
        <option value={7} className="text--dark">
          7
        </option>
        <option value={10} className="text--dark">
          10
        </option>
        <option value={15} className="text--dark">
          15
        </option>
      </select>
    </Btn>
  );
};

import React, { useState } from 'react';
import { Btn } from 'morphine-ui';
import { IoIosArrowDown, IoIosArrowBack } from 'react-icons/io';
import { NewSortContainer } from '../NewSortAndFilter/NewSortContainer';

export const Sort = () => {
  const [showSortContainer, setShowSortContainer] = useState(false);
  const handleShowSortContainer = () => {
    setShowSortContainer(!showSortContainer);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Btn
        size="sm"
        variant="primary"
        onClick={handleShowSortContainer}
        className="flex align-items--c justify-content--sb p--xs--sm gap--xs">
        <p>Sort By</p>
        {showSortContainer ? <IoIosArrowDown /> : <IoIosArrowBack />}
      </Btn>
      {showSortContainer && (
        <NewSortContainer
          handleCloseSortContainer={() => setShowSortContainer(false)}
        />
      )}
    </div>
  );
};

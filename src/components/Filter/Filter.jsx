import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowBack } from 'react-icons/io';
import { Btn } from 'morphine-ui';
import { NewFilterContainer } from '../NewSortAndFilter/NewFilterContainer';

export const Filter = () => {
  const [showFilterContainer, setShowFilterContainer] = useState(false);
  const handleShowFilterContainer = () => {
    setShowFilterContainer(!showFilterContainer);
  };
  return (
    <div style={{ position: 'relative' }}>
      <Btn
        size="sm"
        variant="primary"
        onClick={handleShowFilterContainer}
        className="flex align-items--c justify-content--sb p--xs--sm gap--xs">
        <FaFilter />
        <p>Filter</p>
        {showFilterContainer ? <IoIosArrowDown /> : <IoIosArrowBack />}
      </Btn>
      {showFilterContainer && (
        <NewFilterContainer
          handleCloseFilterContainer={() => setShowFilterContainer(false)}
        />
      )}
    </div>
  );
};

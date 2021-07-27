import React, { useState } from 'react';
import { Btn } from 'morphine-ui';
import { IoIosArrowDown, IoIosArrowBack } from 'react-icons/io';
import { MdSort } from 'react-icons/md';
import { SortContainer } from './SortContainer';

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
        <MdSort className="text--md" />
        <p>Sort By</p>
        {showSortContainer ? <IoIosArrowDown /> : <IoIosArrowBack />}
      </Btn>
      {showSortContainer && (
        <SortContainer
          handleCloseSortContainer={() => setShowSortContainer(false)}
        />
      )}
    </div>
  );
};

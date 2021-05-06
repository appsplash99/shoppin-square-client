import { NewFilterContainer } from './NewFilterContainer';
import { NewtSortContainer } from './NewSortContainer';
import { Btn } from '../morphine-ui';
import { IoIosArrowDown, IoIosArrowBack } from 'react-icons/io';
import './NewSortAndFilter.css';

export const NewSortAndFilter = ({
  showFilterContainer,
  setShowFilterContainer,
  showSortContainer,
  setShowSortContainer,
}) => {
  const handleShowSortContainer = () => {
    setShowSortContainer(!showSortContainer);
  };
  const handleShowFilterContainer = () => {
    setShowFilterContainer(!showFilterContainer);
  };
  return (
    <div className="sort-and-filter-container">
      <Btn
        btnSize="sm"
        variant="dark"
        handleOnClickProp={handleShowSortContainer}
        styleProp={{
          width: '40%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-sm)',
          padding: 'var(--space-xxs) var(--space-xxxs)',
        }}>
        <div className="text--sm">Sort</div>
        {showSortContainer ? <IoIosArrowDown /> : <IoIosArrowBack />}
      </Btn>
      {showSortContainer && (
        <NewtSortContainer
          handleCloseSortContainer={() => setShowSortContainer(false)}
        />
      )}
      <Btn
        btnSize="sm"
        variant="dark"
        handleOnClickProp={handleShowFilterContainer}
        styleProp={{
          width: '40%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-sm)',
          padding: 'var(--space-xxs) var(--space-xxxs)',
        }}>
        <div className="text--sm">Filter</div>
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

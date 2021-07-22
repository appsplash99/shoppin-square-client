import { NewFilterContainer } from './NewFilterContainer';
import { NewtSortContainer } from './NewSortContainer';
import { Btn } from 'morphine-ui';
import { IoIosArrowDown, IoIosArrowBack } from 'react-icons/io';
import './NewSortAndFilter.css';

export const NewSortAndFilter = ({
  showFilterContainer,
  setShowFilterContainer,
  showSortContainer,
  setShowSortContainer,
  setShowProductsPerPage,
  showProductsPerPage,
  numOfProducts,
  setNumOfProducts,
}) => {
  const handleShowSortContainer = () => {
    setShowSortContainer(!showSortContainer);
  };
  const handleShowFilterContainer = () => {
    setShowFilterContainer(!showFilterContainer);
  };
  const handleShowPagesDropDown = () => {
    setShowProductsPerPage(!showProductsPerPage);
  };

  return (
    <div className="sort-and-filter-container">
      <Btn
        size="sm"
        variant="primary"
        onClick={handleShowPagesDropDown}
        className="flex align-items--c justify-content--sb gap p--xs--sm"
        style={{ width: '100%' }}>
        <div className="text--sm">Products</div>
        <select
          className="text--lg px--sm"
          value={numOfProducts}
          onChange={(e) => {
            // TODO: ADD DISPATCH HERE
            setNumOfProducts(Number(e.target.value));
          }}>
          <option value="7">7</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </Btn>
      <Btn
        size="sm"
        variant="dark"
        onClick={handleShowSortContainer}
        className="flex align-items--c justify-content--sb p--xs--sm"
        style={{ width: '100%' }}>
        <div className="text--sm">Sort</div>
        {showSortContainer ? <IoIosArrowDown /> : <IoIosArrowBack />}
      </Btn>
      {showSortContainer && (
        <NewtSortContainer
          handleCloseSortContainer={() => setShowSortContainer(false)}
        />
      )}
      <Btn
        size="sm"
        variant="dark"
        onClick={handleShowFilterContainer}
        className="flex align-items--c justify-content--sb p--xs--sm"
        style={{ width: '100%' }}>
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

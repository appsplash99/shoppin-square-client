import React from 'react';

export const NoResultsFound = () => {
  return (
    <div style={{ height: '92vh' }}>
      <img
        src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
        alt="no-results-found"
      />
      <h2 className="font-weight--600 text--dark">Sorry, no results found!</h2>
      <p className="font-weight--200 text--dark">Please Change Filters</p>
    </div>
  );
};

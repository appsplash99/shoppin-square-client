import { useEffect, useState } from 'react';
import './Shop.css';
import {
  productAddToCart,
  productAddToWishlist,
} from '../../utils/newServerRequests';
import { ImEye } from 'react-icons/im';
import { FaShoppingCart } from 'react-icons/fa';
// import { hideToast } from '../../utils/hideToast';
import { Link, useNavigate } from 'react-router-dom';
import { useCartState } from '../../context/cart-context';
// TODO: REPLACE TOAST BY REACT TOASTIFY
// import { Toast } from '../../components';
import { Sort } from '../../components/Sort/Sort';
import { Filter } from '../../components/Filter/Filter';
import { getLocalCredentials } from '../../utils/localStorage';
import { isProductInArray } from '../../utils/array-functions';
import { loadProductsFromDB } from '../../utils/newServerRequests';
import { Btn, ProductCardVertical, LoaderDonutSpinner } from 'morphine-ui';
import ReactPaginate from 'react-paginate';
import { ALL_PRODUCTS } from '../../utils/apiRoutes';

export const Shop = () => {
  const navigate = useNavigate();
  const { token, userId } = getLocalCredentials();
  const [isLoading, setIsLoading] = useState(false);
  const [showProductsPerPage, setShowProductsPerPage] = useState(false);
  const [numOfProducts, setNumOfProducts] = useState(0);

  const {
    state: {
      // toast,
      // showLoader,
      // cartItems,
      shoppingItems,
      wishlistItems,
      currentProductsApiRoute,
      pagination: { totalPages },
      // sortBy,
      // showFastDeliveryOnly,
      // showAllInventory,
    },
    state,
    dispatch,
  } = useCartState();

  // pagination states
  // const [pageCount, setPageCount] = useState(0);

  const handlePageClick = async (e) => {
    setIsLoading(true);
    // dispatch({ type: 'SHOW_LOADER' });
    const selectedPage = e.selected;
    // setOffset(selectedPage + 1);

    let url = `${currentProductsApiRoute}&page=${selectedPage + 1}&limit=5`;

    if (currentProductsApiRoute === ALL_PRODUCTS) {
      url = `${currentProductsApiRoute}?page=${selectedPage + 1}&limit=5`;
    }
    // handle products of next page

    const { data } = await loadProductsFromDB(url);
    dispatch({ type: 'LOAD-PRODUCTS', payload: data });
    setIsLoading(false);
    // dispatch({ type: 'HIDE_LOADER' });
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        // dispatch({ type: 'SHOW_LOADER' });
        const { data } = await loadProductsFromDB(currentProductsApiRoute);
        dispatch({ type: 'LOAD-PRODUCTS', payload: data });
        // setPageCount(data.totalPages);
        setIsLoading(false);
        // dispatch({ type: 'HIDE_LOADER' });
        //
      } catch (error) {
        setIsLoading(false);
        // dispatch({ type: 'HIDE_LOADER' });
        console.log(error);
      }
    })();
  }, [dispatch, currentProductsApiRoute]);

  if (isLoading && !shoppingItems.length > 0) {
    // if (showLoader) {
    return (
      <div
        className="flex align-items--c justify-content--c"
        style={{
          height: 'calc(100vh - 8vh)',
          display: 'flex',
        }}>
        <LoaderDonutSpinner size="xxl" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      {/* <div
        className="flex align-items--c justify-content--c"
        style={{
          height: 'calc(100vh - 8vh)',
          display: isLoading && !shoppingItems.length > 0 ? 'flex' : 'none',
        }}>
        <LoaderDonutSpinner size="xxl" variant="primary" />
      </div> */}
      <div
        className="shop-container flex flex--column gap--sm pt--xs"
        style={{ display: !shoppingItems ? 'none' : '', margin: '0 auto' }}>
        <div
          className="paginated-sort-and-filter flex flex-wrap--wrap align-items--c justify-content--c gap--sm w--70%"
          style={{ margin: '0 auto' }}>
          {/* <Filter /> */}
          {/* TODO: add this like ajio */}
          {/* <div>Product Grid Changer</div> */}
          {/* TODO: SORTING */}
          {/* <Sort /> */}
        </div>
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={totalPages}
          marginPagesDisplayed={0}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
        {/* TODO: REplace toast with react-toastify */}
        {/* {toast.message && <Toast message={toast.message} />} */}
        <main className="flex flex-wrap--wrap align-items--c justify-content--c gap--sm">
          {shoppingItems &&
            shoppingItems.map((product) => {
              // filteredData.map((product) => {
              const {
                // _id,
                brandName,
                images,
                description,
                price,
                discount,
                ratings,
                numberOfRatings,
                offer,
                sale,
              } = product;
              return (
                <div key={product._id}>
                  <ProductCardVertical
                    name={brandName}
                    image={images[0]}
                    description={description}
                    price={price}
                    mrp={Math.round((price * 100) / (100 - price))}
                    discount={discount}
                    rating={ratings}
                    numberOfRatings={numberOfRatings}
                    offer={offer}
                    isWishlistItem={
                      wishlistItems && isProductInArray(wishlistItems, product)
                    }
                    sale={sale}
                    handleAddToWishlist={async () => {
                      productAddToWishlist(
                        dispatch,
                        token,
                        userId,
                        product._id
                      );
                      dispatch({
                        type: 'ADD-OR-REMOVE-FROM-WISHLIST',
                        payload: product,
                      });
                      if (
                        wishlistItems &&
                        isProductInArray(wishlistItems, product)
                      ) {
                        navigate('/wishlist');
                      }
                    }}
                    isCartItem={
                      state?.cartItems &&
                      isProductInArray(state?.cartItems, product)
                    }
                    handleAddToCart={async (e) => {
                      if (token) {
                        productAddToCart(
                          e,
                          dispatch,
                          token,
                          userId,
                          product._id
                        );
                        navigate('/cart');
                      } else {
                        navigate('/login');
                      }
                    }}
                    goToCartBtn={
                      <div className="flex gap--xxs align-items--c justify-content--sb">
                        <Link to="/cart">
                          <Btn
                            size="sm"
                            variant="primary"
                            shape="square"
                            style={{
                              width: '100%',
                              fontWeight: '500',
                            }}>
                            <div className="flex align-items--c justify-content--c gap">
                              <FaShoppingCart className="text--md" />
                              Go To Cart
                            </div>
                          </Btn>
                        </Link>
                        <Link to={`/product/${product._id}`}>
                          <Btn
                            size="sm"
                            variant="primary"
                            shape="square"
                            style={{
                              width: '100%',
                              fontWeight: '500',
                            }}>
                            <div className="flex align-items--c justify-content--c gap">
                              <ImEye className="text--md" />
                            </div>
                          </Btn>
                        </Link>
                      </div>
                    }
                  />
                </div>
              );
            })}
        </main>
      </div>
    </div>
  );
};

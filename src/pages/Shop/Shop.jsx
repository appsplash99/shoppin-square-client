import { useEffect } from 'react';
import './Shop.css';
import {
  productAddToCart,
  productAddToWishlist,
} from '../../utils/serverRequests';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCartState } from '../../context/cart-context';
import { isProductInArray } from '../../utils/array-functions';
import { getLocalCredentials } from '../../utils/localStorage';
import { loadProductsFromDB } from '../../utils/serverRequests';
import { Sort, Filter, NoResultsFound } from '../../components/';
import { Btn, ProductCardVertical, LoaderDonutSpinner } from 'morphine-ui';

export const Shop = () => {
  const navigate = useNavigate();
  const { token, userId } = getLocalCredentials();

  const {
    state: {
      pagination: { totalPages, currentPage },
      currentProductsApiRoute,
      shoppingItems,
      wishlistItems,
      showLoader,
      cartItems,
      filterObj,
      sortBy,
    },
    dispatch,
  } = useCartState();

  const handlePageClick = async (e) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: e.selected });
  };

  useEffect(() => {
    loadProductsFromDB({ url: currentProductsApiRoute, dispatch });
  }, [dispatch, currentProductsApiRoute, filterObj, sortBy]);

  // TODO: MOVE THE LOADER INTO SHOP COMPONENT BELOW PAGINATION LINE
  if (showLoader) {
    return (
      <div
        className="flex align-items--c justify-content--c"
        style={{ height: '90vh' }}>
        <LoaderDonutSpinner size="xxl" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <div
        className="shop-container flex flex--column gap--sm pt--xs"
        style={{
          display: !shoppingItems ? 'none' : '',
          margin: '0 auto',
        }}>
        <div
          className="paginated-sort-and-filter flex flex-wrap--wrap align-items--c justify-content--c gap--sm w--70%"
          style={{ margin: '0 auto' }}>
          <Filter />
          {/* TODO: add this like ajio */}
          {/* <div>Product Grid Changer</div> */}
          <Sort />
        </div>
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={totalPages}
          // pageCount={totalPages + 1}
          marginPagesDisplayed={0}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          initialPage={currentPage}
          forcePage={currentPage}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          disabledClassName={'disable-pagination-button'}
        />
        {/* TODO: ADD A COMPONENT WHEN FILTER RETURNS EMPTY */}
        {shoppingItems.length === 0 && <NoResultsFound />}
        <main className="flex flex-wrap--wrap align-items--c justify-content--c gap--sm">
          {shoppingItems &&
            shoppingItems.map((product) => {
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
                isNewProduct,
                fastDelivery,
                inStock,
              } = product;
              return (
                <div key={product._id}>
                  <ProductCardVertical
                    sale={sale}
                    inStock={inStock}
                    isNewProduct={isNewProduct}
                    fastDelivery={fastDelivery}
                    name={brandName}
                    image={images[0]}
                    description={description}
                    price={price}
                    mrp={Math.round((price * 100) / (100 - price))}
                    discount={discount}
                    rating={ratings}
                    numberOfRatings={numberOfRatings}
                    offer={offer}
                    handleGoToProductDetail={() =>
                      navigate(`/product/${product._id}`)
                    }
                    isWishlistItem={
                      wishlistItems && isProductInArray(wishlistItems, product)
                    }
                    handleGoToWishlist={() => navigate('/wishlist')}
                    handleAddToWishlist={async () => {
                      if (token) {
                        productAddToWishlist(
                          dispatch,
                          token,
                          userId,
                          product._id
                        );
                        dispatch({
                          type: 'ADD_OR_REMOVE_FROM_WISHLIST',
                          payload: product,
                        });
                      } else {
                        toast.info('Please Login');
                        navigate('/login');
                      }
                    }}
                    isCartItem={
                      cartItems && isProductInArray(cartItems, product)
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
                      } else {
                        toast.info('Please Login');
                        navigate('/login');
                      }
                    }}
                    goToCartBtn={
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

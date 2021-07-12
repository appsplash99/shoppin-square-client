import { useEffect, useState } from 'react';
import './Shop.css';
import {
  productAddToCart,
  productAddToWishlist,
} from '../../utils/newServerRequests';
import { FaShoppingCart } from 'react-icons/fa';
import { hideToast } from '../../utils/hideToast';
import { Link, useNavigate } from 'react-router-dom';
import { useCartState } from '../../context/cart-context';
import { Toast, NewSortAndFilter } from '../../components';
import { isProductInArray } from '../../utils/array-functions';
import { getLocalCredentials } from '../../utils/localStorage';
import { loadProductsFromDB } from '../../utils/newServerRequests';
import { Btn, ProductCardVertical, LoaderDonutSpinner } from 'morphine-ui';

export const Shop = () => {
  const navigate = useNavigate();
  const { token, userId } = getLocalCredentials();
  const [isLoading, setIsLoading] = useState(false);
  const [showSortContainer, setShowSortContainer] = useState(false);
  const [showFilterContainer, setShowFilterContainer] = useState(false);
  const {
    state: {
      toast,
      shoppingItems,
      cartItems,
      wishlistItems,
      currentProductsApiRoute,
      // sortBy,
      // showFastDeliveryOnly,
      // showAllInventory,
    },
    dispatch,
  } = useCartState();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await loadProductsFromDB(currentProductsApiRoute);
        dispatch({ type: 'LOAD-PRODUCTS', payload: data });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    })();
  }, [dispatch, currentProductsApiRoute]);

  // return new data after sorting
  // const getSortedData = (productList, sortBy) => {
  //   if (sortBy && sortBy === 'PRICE_LOW_TO_HIGH') {
  //     console.log('array sorted from L to H');
  //     return productList.sort((a, b) => a.price - b.price);
  //   }
  //   if (sortBy && sortBy === 'PRICE_HIGH_TO_LOW') {
  //     console.log('array sorted from H to L');
  //     return productList.sort((a, b) => b.price - a.price);
  //   }
  //   return productList;
  // };

  // function getFilteredData(
  //   productList,
  //   { showFastDeliveryOnly, showAllInventory }
  // ) {
  //   return productList
  //     .filter(({ fastDelivery }) =>
  //       showFastDeliveryOnly ? fastDelivery : true
  //     )
  //     .filter(({ inStock }) => (showAllInventory ? true : inStock));
  //   // .filter(({ price }) => {
  //   //   return price <= value;
  //   // });
  // }

  // const sortedProducts = getSortedData(shoppingItems, sortBy);
  // const filteredData = getFilteredData(sortedProducts, {
  //   showFastDeliveryOnly,
  //   showAllInventory,
  // });

  return (
    <div>
      <div
        className="flex align-items--c justify-content--c"
        style={{
          height: 'calc(100vh - 8vh)',
          display: isLoading && !shoppingItems.length > 0 ? 'flex' : 'none',
        }}>
        <LoaderDonutSpinner size="xxl" variant="primary" />
      </div>
      <div
        className="shop-container"
        style={{ display: !shoppingItems ? 'none' : '' }}>
        <NewSortAndFilter
          showFilterContainer={showFilterContainer}
          setShowFilterContainer={setShowFilterContainer}
          showSortContainer={showSortContainer}
          setShowSortContainer={setShowSortContainer}
        />
        {toast.message && <Toast message={toast.message} />}
        <main className="grid--gallery flex-grow--3">
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
                <Link
                  key={product._id}
                  className="cursor--pointer"
                  to={`/product/${product._id}`}>
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
                        navigate('/cart');
                      } else {
                        dispatch({
                          type: 'TOGGLE_TOAST',
                          payload: 'Login Toast',
                        });
                        hideToast(dispatch, 3000);
                        alert('Please login');
                        navigate('/login');
                      }
                    }}
                    goToCartBtn={
                      <Link to="/cart">
                        <Btn
                          size="sm"
                          shape="square"
                          variant="primary"
                          style={{ width: '100%', fontWeight: '500' }}>
                          <div className="flex align-items--c justify-content--c gap">
                            <FaShoppingCart className="text--md" />
                            Go To Cart
                          </div>
                        </Btn>
                      </Link>
                    }
                  />
                </Link>
              );
            })}
        </main>
      </div>
    </div>
  );
};

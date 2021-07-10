import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCartState } from '../../context/cart-context';
import { isProductInArray } from '../../utils/array-functions';
import { ALL_PRODUCTS } from '../../utils/apiRoutes';
import { loadProductsFromDB } from '../../utils/serverRequests';
import { NewSortAndFilter } from '../../components/NewSortAndFilter/NewSortAndFilter';
import {
  VerticalProductCard,
  LoaderDonutSpinner,
  Btn,
} from '../../components/morphine-ui';
import './Shop.css';

export const Shop = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSortContainer, setShowSortContainer] = useState(false);
  const [showFilterContainer, setShowFilterContainer] = useState(false);
  const {
    state: {
      sortBy,
      shoppingItems,
      cartItems,
      wishlistItems,
      showFastDeliveryOnly,
      showAllInventory,
    },
    dispatch,
  } = useCartState();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        // const { data } = await loadProductsFromDB(PRODUCTSROUTE);
        const { data } = await loadProductsFromDB(ALL_PRODUCTS);
        // console.log('=========', response.status === 404 && 'access denied');
        dispatch({ type: 'LOAD-PRODUCTS', payload: data });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    })();
  }, [dispatch]);

  // return new data after sorting
  const getSortedData = (productList, sortBy) => {
    if (sortBy && sortBy === 'PRICE_LOW_TO_HIGH') {
      console.log('array sorted from L to H');
      return productList.sort((a, b) => a.price - b.price);
    }
    if (sortBy && sortBy === 'PRICE_HIGH_TO_LOW') {
      console.log('array sorted from H to L');
      return productList.sort((a, b) => b.price - a.price);
    }
    return productList;
  };

  function getFilteredData(
    productList,
    { showFastDeliveryOnly, showAllInventory }
  ) {
    return productList
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showAllInventory ? true : inStock));
    // .filter(({ price }) => {
    //   return price <= value;
    // });
  }

  const sortedProducts = getSortedData(shoppingItems, sortBy);
  const filteredData = getFilteredData(sortedProducts, {
    showFastDeliveryOnly,
    showAllInventory,
  });

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
        <main className="grid--gallery flex-grow--3">
          {shoppingItems &&
            filteredData.map((product) => {
              // shoppingItems.map((product) => {
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
                <VerticalProductCard
                  name={brandName}
                  image={images[0]}
                  description={description}
                  price={price}
                  mrp={Math.round((price * 100) / (100 - price))}
                  discount={discount}
                  rating={ratings}
                  numberOfRatings={numberOfRatings}
                  offer={offer}
                  isWishlistItem={isProductInArray(wishlistItems, product)}
                  sale={sale}
                  handleAddToWishlist={() =>
                    dispatch({
                      type: 'ADD-OR-REMOVE-FROM-WISHLIST',
                      payload: product,
                    })
                  }
                  isCartItem={isProductInArray(cartItems, product)}
                  handleAddToCart={() => {
                    dispatch({ type: 'ADD-TO-CART', payload: product });
                  }}
                  goToCartBtn={
                    <Link to="/cart">
                      <Btn
                        btnSize="sm"
                        shape="square"
                        variant="primary"
                        styleProp={{ width: '100%', fontWeight: '500' }}>
                        <div className="flex align-items--c justify-content--c gap">
                          <FaShoppingCart className="text--md" />
                          Go To Cart
                        </div>
                      </Btn>
                    </Link>
                  }
                />
              );
            })}
        </main>
      </div>
    </div>
  );
};

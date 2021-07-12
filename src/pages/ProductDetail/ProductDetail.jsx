import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDetail.css';
import { FaStar } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';
import { ALL_PRODUCTS } from '../../utils/apiRoutes';
import { LoaderDonutSpinner } from 'morphine-ui';

export const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currImage, setCurrImage] = useState('');
  const [desiredProduct, setDesiredProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('scrolling to top');
  }, []);

  useEffect(() => {
    (async function () {
      const {
        data: { success, product },
      } = await axios.get(`${ALL_PRODUCTS}/${productId}`);
      if (success) {
        setDesiredProduct(product);
        setDesiredProduct((prev) => {
          setCurrImage(prev.images[0]);
          return prev;
        });
        setIsLoading(false);
      }
    })();
  }, [productId]);

  return (
    <div className="product">
      {isLoading ? (
        <div
          className="flex align-items--c justify-content--c"
          style={{
            height: 'calc(100vh - 8vh)',
          }}>
          <LoaderDonutSpinner size="xxl" variant="primary" />
        </div>
      ) : (
        <>
          <div className="product--detail">
            <div className="image--array">
              {desiredProduct &&
                desiredProduct?.images &&
                desiredProduct?.images.map((item) => (
                  <img onClick={() => setCurrImage(item)} src={item} alt="" />
                ))}
            </div>
            <div className="product--image">
              <ReactImageMagnify
                enlargedImagePosition="over"
                {...{
                  smallImage: {
                    alt: desiredProduct?.brandName,
                    isFluidWidth: true,
                    src: currImage,
                  },
                  largeImage: {
                    src: currImage,
                    width: '100%',
                    height: '100%',
                  },
                }}
              />
            </div>
            <div className="product--details">
              <h1 className="product--name">{desiredProduct?.brandName}</h1>
              {desiredProduct?.price && (
                <div className="product--price">
                  <p className="new--price">
                    <BiRupee color={'#000'} />
                    {desiredProduct?.price}
                  </p>
                  <p className="old--price">
                    <BiRupee color={'#000'} />
                    {Math.round(
                      (desiredProduct?.price * 100) /
                        (100 - desiredProduct?.price)
                    )}
                  </p>
                  <p className="discount">{desiredProduct?.discount}</p>
                </div>
              )}
              {desiredProduct?.inStock}
              <div className="product--description">
                {desiredProduct?.description}
              </div>
              <p>{desiredProduct?.fastDelivery && 'Available'}</p>
              {desiredProduct?.ratings && (
                <div className="align-self--fs text--sm font-weight--500 flex align-items--c justify-content--c gap--xs">
                  {desiredProduct?.ratings}
                  <FaStar className="text--warning align-self--c text--sm" />
                  <span className="text--sm ">|</span>
                  {desiredProduct?.numberOfRatings}
                </div>
              )}
            </div>
          </div>
          <div className="card-btn">
            {/* <div className="addToCartBtn">
              {inStock && <BiCart size={32} onClick={addToCart} />}
            </div>
            <div className="wish" onClick={handleWish}>
              {!isWish() ? <BsHeart size={26} /> : <BsHeartFill size={26} />}
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

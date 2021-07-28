import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaShippingFast } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import { MdEventAvailable } from 'react-icons/md';
import { SiHellofresh } from 'react-icons/si';
import { useParams } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';
import { ALL_PRODUCTS } from '../../utils/apiRoutes';
import { LoaderDonutSpinner, Btn } from 'morphine-ui';
import { AddToCartBtn } from './AddToCartBtn';
import { AddToWishlistBtn } from './AddToWIshlistBtn';
import { AiFillDollarCircle } from 'react-icons/ai';

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
      setIsLoading(true);
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

  if (isLoading) {
    return (
      <div
        className="flex align-items--c justify-content--c"
        style={{ height: '92vh' }}>
        <LoaderDonutSpinner size="xxl" variant="primary" />
      </div>
    );
  }

  return (
    <div className="flex flex--column align-items--c justify-content--c gap--xxl mt--xl">
      <div className="flex gap">
        <div className="flex flex--column align-items--c justify-content--fs gap mx--sm">
          {desiredProduct &&
            desiredProduct?.images &&
            desiredProduct?.images.map((item) => (
              <img
                className="cursor--pointer"
                style={{
                  height: 'var(--space-xxl)',
                  width: 'var(--space-xxl)',
                }}
                onClick={() => setCurrImage(item)}
                src={item}
                alt={desiredProduct?.brandName}
              />
            ))}
        </div>
        <div style={{ display: 'flex', width: '50%', height: 'auto' }}>
          <ReactImageMagnify
            enlargedImagePosition="over"
            style={{ width: '100%', height: 'auto' }}
            {...{
              smallImage: {
                alt: desiredProduct?.brandName,
                isFluidWidth: true,
                src: currImage,
                width: '4rem',
                height: '6rem',
              },
              largeImage: {
                src: currImage,
                width: 1200,
                height: 1800,
              },
            }}
          />
        </div>
        <div className="flex flex--column align-items--fs justify-self--fs w--70% gap--xs">
          <h1 className="font-weight--600">{desiredProduct?.brandName}</h1>
          <p className="text-align--l">{desiredProduct?.description}</p>
          {desiredProduct?.sale && (
            <div className="flex align-items--c justify-self--fs gap--sm">
              <AiFillDollarCircle className="text--primary text--xl" />
              <p>Sale Item</p>
            </div>
          )}
          {desiredProduct?.fastDelivery && (
            <div className="flex align-items--c justify-self--fs gap--sm">
              <FaShippingFast className="text--primary text--xl" />
              <p>Fast Delivery Eligible</p>
            </div>
          )}
          {desiredProduct?.isNewProduct && (
            <div className="flex align-items--c justify-self--fs gap--sm">
              <MdEventAvailable className="text--primary text--xl" />
              <p>Newest Product</p>
            </div>
          )}
          {desiredProduct?.inStock && (
            <div className="flex align-items--c justify-self--fs gap--sm">
              <SiHellofresh className="text--primary text--xl" />
              <p>Item in Stock</p>
            </div>
          )}
          {desiredProduct?.price && (
            <div className="flex justify-content--sa gap--sm">
              <p className="text--lg font-weight--600">
                <BiRupee className="text--dark" />
                {desiredProduct?.price}
              </p>
              <p className="text--xs font-weight--600 text--strikethrough">
                <BiRupee className="text--dark" />
                {Math.round(
                  (desiredProduct?.price * 100) / (100 - desiredProduct?.price)
                )}
              </p>
              <p className="bg--danger text--light p--xxs">
                {desiredProduct?.discount}% Off
              </p>
            </div>
          )}
          {desiredProduct?.ratings && (
            <div className="align-self--fs text--sm font-weight--500 flex align-items--c justify-content--c gap--xs">
              {desiredProduct?.ratings}
              <FaStar className="text--warning align-self--c text--sm" />
              <span className="text--sm ">|</span>
              {desiredProduct?.numberOfRatings}
            </div>
          )}
          <div className="flex align-items--c gap--xs">
            {desiredProduct?.inStock ? (
              <AddToCartBtn desiredProduct={desiredProduct} />
            ) : (
              <Btn size="sm" shape="capsule" style={{ cursor: 'no-drop' }}>
                Out of Stock
              </Btn>
            )}
            <AddToWishlistBtn desiredProduct={desiredProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

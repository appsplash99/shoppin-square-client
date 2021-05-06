import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from 'react-icons/fa';
import './VerticalProductCard.css';
import { BtnIcon, Btn, BtnInverted } from '../../../../Button';

export const VerticalProductCard = ({
  name,
  image,
  description,
  price,
  discount,
  rating,
  numberOfRatings,
  sale,
  mrp,
  isWishlistItem,
  handleAddToWishlist,
  isCartItem,
  addToCartBtn,
  handleAddToCart,
  goToCartBtn,
  handleGoToCart,
}) => {
  return (
    <div className="product-card">
      <div className="product-cardPosition flex flex--column">
        <img className="product__image" src={image} alt="" />
        {sale && (
          <div className="label--sale label--salePosition text--md px--md">
            SALE
          </div>
        )}
        <div className="product__content flex flex--column gap--xxs p--xs">
          <div className="flex justify-content--sb">
            <div className="text--sm">
              <div className="font-weight--600 flex">{name}</div>
              <div
                className="text--grey text--l"
                style={{
                  whiteSpace: 'nowrap',
                  width: '150px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {description}
              </div>
            </div>
            <BtnIcon handleOnClickProp={handleAddToWishlist} btnSize="lg">
              {isWishlistItem ? (
                <FaHeart className="text--danger text--xl" />
              ) : (
                <FaRegHeart className="text--danger text--xl" />
              )}
            </BtnIcon>
          </div>
          <div className="flex flex-wrap--wrap align-items--c gap--xxs text--sm">
            <span className="font-weight--600">{`₹ ${price}`}</span>
            <span className="text--strikethrough text--sm">{`₹ ${mrp}`}</span>
            <span className="text--themeRed font-weight--600 border-radius--xs">
              {`(${discount} % OFF)`}
            </span>
          </div>
          {rating && (
            <div className="align-self--fs text--sm font-weight--500 flex align-items--c justify-content--c gap--xs">
              {rating}
              <FaStar className="text--warning align-self--c text--sm" />
              <span className="text--sm ">|</span>
              {numberOfRatings}
            </div>
          )}
        </div>
      </div>
      {!isCartItem
        ? addToCartBtn || (
            <BtnInverted
              btnSize="sm"
              shape="square"
              variant="primary"
              styleProp={{ width: '100%', fontWeight: '500' }}
              handleOnClickProp={handleAddToCart}
            >
              <div className="flex align-items--c justify-content--c gap">
                <FaShoppingCart className="text--md" />
                Add to Cart
              </div>
            </BtnInverted>
          )
        : goToCartBtn || (
            <Btn
              btnSize="sm"
              shape="square"
              variant="primary"
              styleProp={{ width: '100%', fontWeight: '500' }}
              handleOnClickProp={handleGoToCart}
            >
              <div className="flex align-items--c justify-content--c gap">
                <FaShoppingCart className="text--md" />
                Go To Cart
              </div>
            </Btn>
          )}
    </div>
  );
};

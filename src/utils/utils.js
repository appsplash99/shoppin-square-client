export const handleFilterOnChange = ({
  filterObj,
  filterType,
  dispatch,
  dispatchType,
  payloadForTrue,
  payloadforFalse,
}) => {
  !filterObj[filterType]
    ? dispatch({
        type: dispatchType,
        payload: payloadForTrue,
      })
    : dispatch({
        type: dispatchType,
        payload: payloadforFalse,
      });
};

export const womenImage =
  'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2021/4/19/ec68db24-422b-4755-802d-9b7cf1b4e11b1618806979607-1.jpg';

export const menImage =
  'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11067734/2019/12/10/34b589c2-80b9-4ad9-81ea-84333fbc46761575972548055-DILLINGER-Men-Tshirts-4071575972546110-1.jpg';

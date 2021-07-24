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

export const hideToast = (dispatch, seconds = 1000) => {
  setTimeout(() => {
    dispatch({ type: 'TOGGLE_TOAST', payload: '', value: false });
  }, seconds);
};

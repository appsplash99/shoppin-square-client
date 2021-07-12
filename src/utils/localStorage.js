// get credentials of loged in user
export const getLocalCredentials = () => {
  const userId = JSON.parse(localStorage.getItem('logincredentials'))?.userId;
  const token = JSON.parse(localStorage.getItem('logincredentials'))?.token;
  const userEmail = JSON.parse(localStorage.getItem('logincredentials'))
    ?.userEmail;

  console.log({ 'consumed local token': token, userId, userEmail });
  return { userId, token, userEmail };
};

// saving logged in user's credentials in localStorage
export const setLocalCredentials = (token, userId, userEmail) => {
  console.log({ 'token set': token });
  return localStorage.setItem(
    'logincredentials',
    JSON.stringify({ token, userId, userEmail })
  );
};

// remove user credentials from localstorage
export const removeLocalCredentials = () => {
  return localStorage.removeItem('logincredentials');
};

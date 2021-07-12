export const isProductInArray = (itemsArray, product) => {
  return itemsArray.filter((item) => item._id === product._id).length > 0;
};

export const incQtyForExistingProduct = (itemsArray, payloadProduct) => {
  return itemsArray.map((product) => {
    return product._id === payloadProduct._id
      ? { ...product, qty: product.qty + 1 }
      : product;
  });
};

export const decQtyForExistingProduct = (itemsArray, payloadProduct) => {
  return itemsArray.map((product) => {
    return product._id === payloadProduct._id
      ? {
          ...product,
          qty: product.qty - 1,
        }
      : product;
  });
};

export const concatNewProduct = (itemsArray, payloadProduct) => {
  return itemsArray.concat(payloadProduct);
};

export const removeExistingProductFromArray = (itemsArray, payloadProduct) => {
  return itemsArray.filter((product) => {
    return product._id !== payloadProduct._id;
  });
};

export const totalProductPrice = (itemsArray) => {
  return itemsArray.reduce((acc, currObj) => {
    return acc + Number(currObj.quantity) * Number(currObj.product.price);
  }, 0);
};

export const totalProductsInArray = (itemsArray) => {
  return itemsArray.reduce((acc, currObj) => {
    return acc + Number(currObj.quantity);
  }, 0);
};

export const lengthOfArray = (itemsArray) => {
  return itemsArray.length;
};

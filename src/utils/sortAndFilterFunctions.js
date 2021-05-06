export const getMinPrice = (sourceData) => {
  return sourceData.reduce(
    (min, item) => (item.price < min ? item.price : min),
    sourceData[0].price
  );
}

export const getMaxPrice = (sourceData) => {
  return sourceData.reduce(
    (max, item) => (item.price > max ? item.price : max),
    sourceData[0].price
  );
}
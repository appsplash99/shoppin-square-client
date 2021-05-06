import axios from "axios";
export const loadProductsFromDB = async (url) => {
  const res = await axios({ method: "GET", url: url });

  if (res.status === 200 || res.status === 201) {
    return res;
  } else {
    throw new Error("Failed to load products from server");
  }
};

import { useEffect, useState } from "react";
// import { loadProductsFromDB } from "../utils/serverRequests";
import { PRODUCTSROUTE } from "../utils/apiRoutes";
import { useCartState } from "../context/cart-context";
import axios from "axios";

export const useGetProductsFromDB = (dispatch, PRODUCTSROUTE) => {
  useEffect(() => {
    (async () => {
      try {
        const {
          res: { products }
        } = await axios.get(PRODUCTSROUTE);
        console.log("running dispatch");
        dispatch({ type: "LOAD-PRODUCTS", payload: products });
      } catch (error) {
        console.log(error);
      }
    })();
    // (async () => {
    //   setReturnObj((prevState) => {
    //     return { ...prevState, loading: true };
    //   });
    //   try {
    //     const response = await axios.get(apiURL);
    //     // console.log("my array", { products });
    //     setReturnObj((prevState) => {
    //       return { ...prevState, data: response.data.products };
    //     });
    //   } catch (error) {
    //     setReturnObj((prevState) => {
    //       return { ...prevState, error: error };
    //     });
    //   } finally {
    //     setReturnObj((prevState) => {
    //       return { ...prevState, loading: false };
    //     });
    //   }
    // })();
  }, [dispatch, PRODUCTSROUTE]);
};

import React, { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = (apiURL) => {
  const [returnObj, setReturnObj] = useState({
    data: null,
    loading: false,
    error: false
  });

  useEffect(() => {
    // write product loading code here..
    (async () => {
      setReturnObj((prevState) => {
        return { ...prevState, loading: true };
      });
      try {
        const response = await axios.get(apiURL);
        // console.log("my array", { products });
        setReturnObj((prevState) => {
          return { ...prevState, data: response.data.products };
        });
      } catch (error) {
        setReturnObj((prevState) => {
          return { ...prevState, error: error };
        });
      } finally {
        setReturnObj((prevState) => {
          return { ...prevState, loading: false };
        });
      }
    })();
  }, [apiURL]); // run only when the apiUrl is provided as parameter

  return returnObj;
};

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import userLocalStorage from "./userLocalStorage";

export default (url) => {
  const baseUrl = `https://conduit.productionready.io/api`;
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = userLocalStorage('token');

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ''
        }
      }
    };

    if (!isLoading) {
      return
    }

    axios(baseUrl + url, requestOptions).then(res => {
      setResponse(res.data);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
      setError(err.response.data);
      setIsLoading(false);
    })
  }, [isLoading, options, url, baseUrl, token]);

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  return [{isLoading, response, error}, doFetch];
}
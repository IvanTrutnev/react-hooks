import { useEffect, useState } from "react";
import axios from "axios";

export default (url) => {
  const baseUrl = `https://conduit.productionready.io/api`;
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (!isLoading) {
      return
    }

    axios(baseUrl + url, options).then(res => {
      console.log(res);
      setResponse(res.data);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
      setError(err.response.data);
      setIsLoading(false);
    })
  }, [isLoading, options, url, baseUrl]);

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };


  return [{isLoading, response, error}, doFetch];
}
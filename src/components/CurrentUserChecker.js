import { useEffect, useContext } from "react";

import useFetch from "../hooks/useFetch";
import { CurrentUserContext } from "../context/currentUser";
import userLocalStorage from "../hooks/userLocalStorage";

const CurrentUserChecker = ({children}) => {
  const [token] = userLocalStorage('token');
  const [{response}, doFetch] = useFetch('/user');
  const [, dispatch] = useContext(CurrentUserContext);

  useEffect(() => {
    if (!token) {
      dispatch({type: 'SET_UNAUTHORIZED'});
      return
    }
    doFetch();
    dispatch({type: 'LOADING'});
  }, [token, dispatch, doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({type: 'SET_AUTHORIZED', payload: response.user})
  }, [response, dispatch]);

  return children;
};

export default CurrentUserChecker;
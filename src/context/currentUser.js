import React from 'react';
import { createContext, useReducer } from 'react';

const initialState = {
  isLoading: false,
  isLoggedIn: null,
  currentUser: null
};

const actionTypes = {
  'LOADING': (state) => ({
    ...state,
    isLoading: true
  }),
  'SET_AUTHORIZED': (state, payload) => ({
    ...state,
    isLoggedIn: true,
    isLoading: false,
    currentUser: payload
  }),
  'SET_UNAUTHORIZED': (state) => ({
    ...state,
    isLoggedIn: false,
  }),
  'DEFAULT': (state) => state
};


const reducer = (state = initialState, {type, payload}) => {
  const handler = actionTypes[type] || actionTypes['DEFAULT'];
  return handler(state, payload);
};

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
  const value = useReducer(reducer, initialState);
  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
};
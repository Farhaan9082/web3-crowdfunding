import React, { useContext, createContext } from 'react';

const StateContext = createContext({});

export const StateContextProvider = ({ children }: any) => {
  return (
    <StateContext.Provider
      value={{}}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
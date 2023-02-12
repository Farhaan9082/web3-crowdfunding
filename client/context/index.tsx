import { useContext, createContext } from "react";

const StateContext = createContext<any>({});

export const StateContextProvider = ({ children }: any) => {
  return (
    <StateContext.Provider
      value={{}}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

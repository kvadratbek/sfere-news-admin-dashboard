import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";

interface IAppProviders {
  children: JSX.Element;
}

export const StoreProvider: React.FC<IAppProviders> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

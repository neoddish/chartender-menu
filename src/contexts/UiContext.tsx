import { createContext } from "react";

interface IUiContext {
  drawerVisible: boolean;
  setDrawerVisible: (visible: boolean) => void;
}

const defaultState: IUiContext = {
  drawerVisible: false,
  setDrawerVisible: () => {},
};

export const UiContext = createContext<IUiContext>(defaultState);

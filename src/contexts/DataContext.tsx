import { createContext } from "react";

interface IDataContext {
  dataInString: string;
  setDataInString: (dataStr: string) => void;
}

const defaultState: IDataContext = {
  dataInString: "",
  setDataInString: () => {},
};

export const DataContext = createContext<IDataContext>(defaultState);

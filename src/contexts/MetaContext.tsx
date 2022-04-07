import { createContext } from "react";

import { Advice } from "@antv/chart-advisor";

interface IMetaContext {
  dataInString: string;
  setDataInString: (dataStr: string) => void;
  advicesList: Advice[];
  selectedAdviceIndex: number;
  setSelectedAdviceIndex: (index: number) => void;
}

const defaultState: IMetaContext = {
  dataInString: "",
  setDataInString: () => {},
  advicesList: [],
  selectedAdviceIndex: -1,
  setSelectedAdviceIndex: () => {},
};

export const MetaContext = createContext<IMetaContext>(defaultState);

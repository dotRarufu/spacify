import { createContext } from "react";
import { Factor } from "../utils/utils";

type GlobalContextValues = {
  factors: Factor[];
  activeFactor: Factor;
  selectValue: (n: number) => () => void;
  changeFactor: (f: Factor) => void;
  addFactor: (f: Factor) => void;
  values: number[];
  selectedValue: number | null;
};

const GlobalContext = createContext<GlobalContextValues | null>(null);

export default GlobalContext;

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Difference from "./components/Difference";
import About from "./components/About";
import { convertToRem, Factor, generateFactorValues } from "./utils/utils";
import Dropdown from "./components/Dropdown";
import { useCopyToClipboard } from "react-use";
import toast, { Toaster } from "react-hot-toast";
import useToastLimit from "./components/hooks/useToastLimit";
import GlobalContext from "./contexts/globalContext";
import Base from "./components/Base";
import Settings from "./components/Settings";
import { defaultFactors } from "./defaultFactors";
import { toastSettings } from "./toastSettings";
import Values from "./components/Values";
import Tools from "./components/Tools";

const App = () => {
  const [factor, setFactor] = useState<Factor>([10, 40]);
  const [base, setBase] = useState(16);
  const [values, setValues] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [factors, setFactors] = useState(defaultFactors);
  const [isDivisibleBy4, setIsDivisibleBy4] = useState(true);
  const [isCopiedAsRem, setIsCopiedAsRem] = useState(true);

  useToastLimit();
  const [clipboardState, copyToClipboard] = useCopyToClipboard();

  const changeBase = (n: number | null) => {
    if (!n) return;

    setBase(n);
  };
  const changeFactor = (f: Factor) => setFactor(f);
  const selectValue = (n: number) => () => {
    setSelectedValue(n);

    const value = isCopiedAsRem ? convertToRem(n, base) : n.toString();

    copyToClipboard(value);
    if (clipboardState.error) {
      toast.error("Failed to copy");

      return;
    }
    toast.success("Copied to clipboard");
  };
  const addFactor = (f: Factor) => {
    setFactors([...factors, f]);
    changeFactor(f);
  };

  const changeSettings = (isDivisibleBy4: boolean, isCopiedAsRem: boolean) => {
    setIsCopiedAsRem(isCopiedAsRem);
    setIsDivisibleBy4(isDivisibleBy4);
  };

  const globalContextValues = {
    factors,
    activeFactor: factor,
    selectValue,
    changeFactor,
    addFactor,
    values,
    selectedValue,
    base,
    changeBase,
    changeSettings,
  };

  useEffect(() => {
    setValues(generateFactorValues(factor, base, isDivisibleBy4));
  }, [base, factor, isDivisibleBy4]);

  return (
    <GlobalContext.Provider value={globalContextValues}>
      <div className="sm:p-0 mx-auto max-w-[32.5rem] p-[1rem] sm:py-[4rem]">
        <Toaster toastOptions={toastSettings} />
        <Header />
        <main className="flex flex-col gap-[2rem]">
          <Dropdown />
          <Base />
          <Settings />
          <Values />
          <Difference />
          <About />
          <Tools />
        </main>

        <footer className="mb-[1rem] mt-[8rem] flex flex-col text-center text-tertiary-text">
          <p>v.0.4.0</p>
          <p>
            by{" "}
            <a
              className="transition-colors hover:text-primary-text hover:underline"
              href="https://github.com/dotRarufu/"
            >
              dotRarufu
            </a>
          </p>
        </footer>
      </div>
    </GlobalContext.Provider>
  );
};

export default App;

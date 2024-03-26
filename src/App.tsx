import { useEffect, useState } from "react";
import Header from "./components/Header";
import Difference from "./components/Difference";
import About from "./components/About";
import { Factor, generateFactorValues } from "./utils/utils";
import Dropdown from "./components/Dropdown";
import { useCopyToClipboard } from "react-use";
import toast, { DefaultToastOptions, Toaster } from "react-hot-toast";
import useToastLimit from "./components/hooks/useToastLimit";
import GlobalContext from "./contexts/globalContext";
import Base from "./components/Base";
import { AnimatePresence, motion } from "framer-motion";

const toastSettings: DefaultToastOptions = {
  position: "bottom-center",
  style: {
    border: "1px solid #13136C",
    borderRadius: "1rem",
    background: "#131313",
    color: "#fff",
  },
};

const defaultFactors: Factor[] = [
  [30, 50],
  [20, 40],
  [10, 30],
];

const App = () => {
  const [factor, setFactor] = useState<Factor>([10, 40]);
  const [base, setBase] = useState(16);
  const [values, setValues] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [factors, setFactors] = useState(defaultFactors);

  useToastLimit();
  const [clipboardState, copyToClipboard] = useCopyToClipboard();

  const changeBase = (n: number) => setBase(n);
  const changeFactor = (f: Factor) => setFactor(f);
  const selectValue = (n: number) => () => {
    setSelectedValue(n);
    copyToClipboard(n.toString());
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
  };

  useEffect(() => {
    setValues(generateFactorValues(factor, base));
  }, [base, factor]);

  return (
    <GlobalContext.Provider value={globalContextValues}>
      <div className="sm:p-0 mx-auto max-w-[40rem] p-[1rem] sm:py-[4rem]">
        <Toaster toastOptions={toastSettings} />
        <Header />
        <main className="flex flex-col gap-[2rem]">
          <Dropdown />
          <Base />

          <div className="flex flex-col items-baseline sm:flex-row">
            <h3
              className="mb-[0.5rem] min-w-[8rem] text-secondary-text"
              children="Values"
            />

            <motion.ul
              layout="preserve-aspect"
              transition={{
                bounce: 0,
                bounceDamping: 0,
              }}
              className="flex w-full max-w-[20rem] flex-wrap overflow-clip rounded-outer bg-primary-color-900"
            >
              {values.map((v) => (
                <AnimatePresence key={v}>
                  <li
                    onClick={selectValue(v)}
                    className={
                      "min-w-[4em] cursor-pointer py-[1rem] text-center shadow-md shadow-transparent transition-transform hover:scale-110 hover:bg-primary-color-500 hover:shadow-md hover:shadow-primary-color-500" +
                      " " +
                      (selectedValue && selectedValue === v
                        ? "bg-primary-color-500"
                        : "")
                    }
                    children={v}
                  />
                </AnimatePresence>
              ))}
            </motion.ul>
          </div>
          <Difference />

          <About />
        </main>
      </div>
    </GlobalContext.Provider>
  );
};

export default App;

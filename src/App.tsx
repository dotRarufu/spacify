import { useEffect, useState } from "react";
import Header from "./components/Header";
import Difference from "./components/Difference";
import About from "./components/About";
import { Factor, generateFactorValues } from "./utils/utils";
import Dropdown from "./components/Dropdown";
import { useCopyToClipboard } from "react-use";
import toast, { DefaultToastOptions, Toaster } from "react-hot-toast";
import useToastLimit from "./components/hooks/useToastLimit";

const toastSettings: DefaultToastOptions = {
  position: "bottom-center",
  style: {
    border: "1px solid #13136C",
    borderRadius: "1rem",
    background: "#131313",
    color: "#fff",
  },
};

const App = () => {
  const [factor, setFactor] = useState<Factor>([10, 40]);
  const [baseValue] = useState(16);
  const [values, setValues] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  useToastLimit();
  const [clipboardState, copyToClipboard] = useCopyToClipboard();

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

  useEffect(() => {
    setValues(generateFactorValues(factor, baseValue));
  }, [baseValue, factor]);

  return (
    <div className="sm:p-0  mx-auto max-w-[40rem] p-[1rem] sm:py-[4rem]">
      <Toaster toastOptions={toastSettings} />
      <Header />

      <main className="flex flex-col gap-[2rem]">
        <Dropdown changeFactor={changeFactor} activeFactor={factor} />

        <Difference factor={factor} values={values} selected={selectedValue} />

        <div className="flex flex-col items-baseline sm:flex-row">
          <h3
            className="mb-[0.5rem] min-w-[8rem] text-secondary-text"
            children="Values"
          />

          <ul className="flex w-full max-w-[20rem] flex-wrap overflow-clip rounded-outer bg-primary-color-900">
            {values.map((v) => (
              <li
                onClick={selectValue(v)}
                key={v}
                className={
                  "min-w-[4em] cursor-pointer  py-[1rem] text-center shadow-md shadow-transparent hover:bg-primary-color-500 hover:shadow-md hover:shadow-primary-color-500" +
                  " " +
                  (selectedValue && selectedValue === v
                    ? "bg-primary-color-500"
                    : "")
                }
                children={v}
              />
            ))}
          </ul>
        </div>

        <About />
      </main>
    </div>
  );
};

export default App;

import { ChangeEvent, useContext, useState } from "react";
import Check from "./icons/Check";
import GlobalContext from "../contexts/globalContext";

const Base = () => {
  const [value, setValue] = useState(16);
  const { changeBase } = useContext(GlobalContext)!;
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, min, max } = event.target;
    const newValue = Math.max(
      Number(min),
      Math.min(Number(max), Number(value)),
    );

    setValue(newValue);
  };

  const handleDone = () => changeBase(value);

  return (
    <div className="flex flex-col items-baseline sm:flex-row">
      <h3
        className="mb-[0.5rem] min-w-[8rem] text-secondary-text"
        children="Base"
      />

      <div className="relative max-w-[8rem] ">
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          min={1}
          max={999}
          type="number"
          className="text-secondary w-full rounded-inner border border-primary-color-500 bg-transparent  p-[0.5rem] text-primary-text"
          value={value}
          onChange={handleChange}
        />
        <button
          className="absolute right-[0] h-full rounded-r-inner border border-primary-color-500 bg-primary-color-500 px-[1rem] hover:bg-primary-color-700"
          onClick={handleDone}
        >
          <Check />
        </button>
        {isFocused && (
          <p className="absolute -bottom-[0.25rem] left-[0] translate-y-full whitespace-nowrap text-[1rem] text-tertiary-text">
            TIP: 16 is a good start
          </p>
        )}
      </div>
    </div>
  );
};

export default Base;

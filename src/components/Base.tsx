import { ChangeEvent, useContext, useState } from "react";
import Check from "./icons/Check";
import GlobalContext from "../contexts/globalContext";
import { buttonPrimary } from "../variants/buttonPrimary";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { colors } from "../utils/theme";

const inputVariant: Variants = {
  noOutline: {
    outlineStyle: "solid",
    outlineWidth: "0px",
    outlineColor: colors["primary-color-700"],
  },
  visibleOutline: {
    outlineWidth: "1px",
    outlineColor: colors["primary-color-500"],
  },
};
const tipVariant = {
  initial: {
    opacity: 0,
    y: "0.25rem",
  },
  animate: {
    y: "0rem",
    opacity: 1,
  },
  exit: {
    opacity: 0,
    y: "0.25rem",
  },
};

const Base = () => {
  const [value, setValue] = useState<number | null>(16);
  const { changeBase } = useContext(GlobalContext)!;
  const [isFocused, setIsFocused] = useState(false);
  const [isSet, setIsSet] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, min, max } = event.target;

    setIsSet(false);

    if (value === "") {
      setValue(null);

      return;
    }

    const newValue = Math.max(
      Number(min),
      Math.min(Number(max), Number(value)),
    );

    setValue(newValue);
  };

  const handleDone = () => {
    changeBase(value);
    setIsSet(true);
  };

  return (
    <div className="flex flex-col items-baseline sm:flex-row">
      <h2
        className="mb-[0.5rem] min-w-[8rem] text-secondary-text sm:mb-[0]"
        children="Base"
      />

      <div className="relative max-w-[6rem] ">
        <label htmlFor="base" className="hidden">
          Base
        </label>
        <motion.input
          id="base"
          name="base"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          min={1}
          max={999}
          type="number"
          className="text-secondary w-full rounded-inner border border-primary-color-500 bg-transparent  p-[0.5rem] text-primary-text"
          value={value || ""}
          onChange={handleChange}
          variants={inputVariant}
          initial="noOutline"
          whileFocus="visibleOutline"
        />
        <motion.button
          className="absolute right-[0] h-full rounded-r-inner border border-l-0 border-primary-color-500 bg-primary-color-500 px-[0.75rem]"
          onClick={handleDone}
          variants={buttonPrimary}
          whileHover="hovered"
          whileTap="unhovered"
          initial="unhovered"
        >
          <Check />
        </motion.button>
        <AnimatePresence>
          {isFocused && (
            <motion.p
              className="absolute left-[0] top-full whitespace-nowrap text-[1rem] text-secondary-text"
              variants={tipVariant}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              Tip: 16 is a good start
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isFocused && !isSet && (
            <motion.p
              className="absolute left-[0] top-full whitespace-nowrap text-[1rem] text-primary-text"
              variants={tipVariant}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              Changes not set
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Base;

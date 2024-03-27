import {
  AnimatePresence,
  Variants,
  motion,
  useAnimationControls,
} from "framer-motion";
import { ChangeEvent, useEffect, useState } from "react";
import fullConfig from "../utils/theme";
import Bulb from "./icons/Bulb";

type InputProps = {
  changeValue: (value: number | null) => void;
  value: number | null;
  number: 1 | 2;
  otherValue: number | null;
};

const Input = ({ changeValue, value, number, otherValue }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const control = useAnimationControls();

  useEffect(() => {
    control.start(isFocused ? "active" : "inactive");
  }, [control, isFocused]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, min, max } = event.target;

    if (value === "") {
      changeValue(null);

      return;
    }

    const newValue = Math.max(
      Number(min),
      Math.min(Number(max), Number(value)),
    );

    changeValue(newValue);
  };

  const inputVariant: Variants = {
    inactive: {
      border: "1px solid " + fullConfig.theme.colors["primary-color-700"],
    },
    active: {
      border: "1px solid " + fullConfig.theme.colors["primary-color-500"],
    },
  };

  const tip = number === 1 ? 25 : Number(otherValue) + 25;
  const renderTip = () => {
    const content = (
      <>
        <span className="flex">
          <Bulb />
        </span>

        {">"}
        {tip}
      </>
    );

    if (number === 1) return content;

    return otherValue ? content : "";
  };

  return (
    <motion.div
      variants={inputVariant}
      initial="inactive"
      animate={control}
      className="flex gap-[1rem] overflow-clip rounded-inner bg-transparent"
    >
      <input
        type="number"
        min={-1}
        max={100}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent p-[0.5rem] text-primary-text"
        placeholder={"Value " + number}
        value={value + ""}
        onChange={handleChange}
      />

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="flex items-center gap-[0.5rem]  pr-[0.5rem] text-secondary-text"
          >
            {renderTip()}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Input;

import { useContext, useEffect, useState } from "react";
import Check from "./icons/Check";

import {
  AnimatePresence,
  Variants,
  motion,
  useAnimationControls,
} from "framer-motion";
import GlobalContext from "../contexts/globalContext";
import { colors } from "../utils/theme";

const variant: Variants = {
  invisible: {
    transition: {
      duration: 0.1,
    },
    opacity: 0,
  },
  visible: {
    transition: {
      duration: 0.1,
    },

    opacity: 1,
  },
};

const Settings = () => {
  const { changeSettings } = useContext(GlobalContext)!;
  const [isDivisibleBy4, setIsDivisibleBy4] = useState(true);
  const [isCopiedAsRem, setIsCopiedAsRem] = useState(true);
  const divisibleBy4BackgroundControl = useAnimationControls();
  const copyAsRemBackgroundControl = useAnimationControls();

  useEffect(() => {
    divisibleBy4BackgroundControl.start(
      isDivisibleBy4 ? "visible" : "invisible",
    );
    changeSettings(isDivisibleBy4, isCopiedAsRem);
  }, [
    changeSettings,
    divisibleBy4BackgroundControl,
    isCopiedAsRem,
    isDivisibleBy4,
  ]);

  useEffect(() => {
    copyAsRemBackgroundControl.start(isCopiedAsRem ? "visible" : "invisible");
    changeSettings(isDivisibleBy4, isCopiedAsRem);
  }, [
    changeSettings,
    copyAsRemBackgroundControl,
    isCopiedAsRem,
    isDivisibleBy4,
  ]);

  return (
    <div className="flex flex-col sm:flex-row">
      <h2 className="mb-[0.5rem] min-w-[8rem] text-secondary-text sm:mb-[0]">
        <div className="w-fit">Settings</div>
      </h2>

      <div className="flex flex-col gap-[0.75rem]">
        <div className="flex w-full max-w-[320px]  gap-[0.5rem]">
          <div className="relative flex h-fit items-center overflow-clip rounded-inner border border-primary-color-500">
            <motion.div
              variants={variant}
              className="border-primar-color-500 absolute left-1/2 top-1/2 -z-[1] aspect-square w-full -translate-x-1/2 -translate-y-1/2"
              animate={divisibleBy4BackgroundControl}
              style={{
                backgroundColor: isDivisibleBy4
                  ? colors["primary-color-500"]
                  : "transparent",
              }}
            />

            <input
              id="isDivisibleBy4"
              name="isDivisibleBy4"
              checked={isDivisibleBy4}
              onChange={(e) => setIsDivisibleBy4(e.currentTarget.checked)}
              className="relative z-[2] aspect-square h-[1.25rem] cursor-pointer appearance-none"
              type="checkbox"
            />
            <AnimatePresence>
              {isDivisibleBy4 && (
                <motion.span
                  variants={variant}
                  initial="invisible"
                  animate="visible"
                  exit="invisible"
                  className="absolute left-1/2 top-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2"
                >
                  <Check />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <label
            htmlFor="isDivisibleBy4"
            className="cursor-pointer transition-colors"
            style={{
              color: colors[isDivisibleBy4 ? "primary-text" : "secondary-text"],
            }}
          >
            Divisible by 4
          </label>
        </div>

        <div className="flex w-full max-w-[320px]  gap-[0.5rem]">
          <div className="relative flex h-fit items-center overflow-clip rounded-inner border border-primary-color-500">
            <motion.div
              variants={variant}
              className="border-primar-color-500 absolute left-1/2 top-1/2 -z-[1] aspect-square w-full -translate-x-1/2 -translate-y-1/2"
              animate={copyAsRemBackgroundControl}
              style={{
                backgroundColor: isCopiedAsRem
                  ? colors["primary-color-500"]
                  : "transparent",
              }}
            />

            <input
              id="isCopiedAsRem"
              name="isCopiedAsRem"
              checked={isCopiedAsRem}
              onChange={(e) => {
                const nextState = e.currentTarget.checked;
                setIsCopiedAsRem(nextState);
              }}
              className="relative z-[2] aspect-square h-[1.25rem] cursor-pointer appearance-none"
              type="checkbox"
            />
            <AnimatePresence>
              {isCopiedAsRem && (
                <motion.span
                  variants={variant}
                  initial="invisible"
                  animate="visible"
                  exit="invisible"
                  className="absolute left-1/2 top-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2"
                >
                  <Check />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <label
            htmlFor="isCopiedAsRem"
            className="cursor-pointer transition-colors"
            style={{
              color: colors[isCopiedAsRem ? "primary-text" : "secondary-text"],
            }}
          >
            Copy value as rem
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;

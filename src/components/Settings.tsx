import { useContext, useEffect, useState } from "react";
import Check from "./icons/Check";
import fullConfig from "../utils/theme";
import {
  AnimatePresence,
  Variants,
  motion,
  useAnimationControls,
} from "framer-motion";
import GlobalContext from "../contexts/globalContext";

const Settings = () => {
  const { changeSettings } = useContext(GlobalContext)!;
  const [isChecked, setIsChecked] = useState(true);
  const backgroundControl = useAnimationControls();

  useEffect(() => {
    backgroundControl.start(isChecked ? "visible" : "invisible");
    changeSettings(isChecked);
  }, [backgroundControl, changeSettings, isChecked]);

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

  return (
    <div className="flex flex-col sm:flex-row">
      <h3 className="mb-[0.5rem] min-w-[8rem] text-secondary-text sm:mb-[0]">
        <div className="w-fit">Settings</div>
      </h3>

      <div className="flex w-full max-w-[320px]  gap-[0.5rem]">
        <div className="relative flex h-fit items-center overflow-clip rounded-inner border border-primary-color-500">
          <motion.div
            variants={variant}
            className={
              "border-primar-color-500 absolute left-1/2 top-1/2  -z-[1] aspect-square w-full -translate-x-1/2 -translate-y-1/2 " +
              " "
            }
            animate={backgroundControl}
            style={{
              backgroundColor: isChecked
                ? fullConfig.theme.colors["primary-color-500"]
                : "transparent",
            }}
          />

          <input
            checked={isChecked}
            onChange={(e) => setIsChecked(e.currentTarget.checked)}
            className="relative z-[2] aspect-square h-[1.25rem] appearance-none"
            type="checkbox"
          />
          <AnimatePresence>
            {isChecked && (
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
          className="transition-colors"
          style={{
            color:
              fullConfig.theme.colors[
                isChecked ? "primary-text" : "secondary-text"
              ],
          }}
        >
          Divisible by 4
        </label>
      </div>
    </div>
  );
};

export default Settings;

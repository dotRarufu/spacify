import { useContext, useRef, useState } from "react";
import ArrowDown from "./icons/ArrowDown";
import { useClickAway } from "react-use";
import { Factor } from "../utils/utils";
import Modal from "./Modal";
import GlobalContext from "../contexts/globalContext";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { colors } from "../utils/theme";

const customItemVariant: Variants = {
  initial: {
    backgroundColor: colors["neutral"],
  },
  hoverOrTapped: {
    backgroundColor: colors["primary-color-500"],
  },
};

const itemVariant: Variants = {
  exit: { height: 0, boxShadow: "none", opacity: 0 },
  initial: {
    height: 0,
    boxShadow: "none",
    opacity: 0,
  },
  takeFullHeight: {
    height: "fit-content",
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  shadow: {
    transition: {
      delay: 0.15,
    },
    // todo: use tailwind theme instead of hardcoded like this
    boxShadow:
      "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(30, 30, 174) 0px 4px 6px -1px, rgb(30, 30, 174) 0px 2px 4px -2px",
  },
};

const Dropdown = () => {
  const { changeFactor, factors, activeFactor } = useContext(GlobalContext)!;

  const [isActive, setIsActive] = useState(false);
  const handleClick = () => setIsActive(!isActive);
  const containerRef = useRef<HTMLUListElement>(null);
  useClickAway(containerRef, () => setIsActive(false));

  const [isModalActive, setIsModalActive] = useState(false);
  const openModal = () => setIsModalActive(true);
  const closeModal = () => setIsModalActive(false);

  const changeActiveFactor = (f: Factor) => () => changeFactor(f);
  return (
    <div className="flex flex-col items-baseline sm:flex-row">
      <h2 className="mb-[0.5rem] min-w-[8rem] text-secondary-text sm:mb-[0]">
        Factor
      </h2>
      <ul
        ref={containerRef}
        className="relative h-fit min-w-[8rem] appearance-none"
        onClick={handleClick}
      >
        <motion.li
          className="flex cursor-pointer items-center justify-between gap-[0.5rem] rounded-inner border border-primary-color-500 px-[0.75rem] py-[0.5rem]"
          variants={customItemVariant}
          initial="initial"
          whileHover="hoverOrTapped"
        >
          {activeFactor[0]} - {activeFactor[1]}
          <ArrowDown />
        </motion.li>
        <AnimatePresence>
          {isActive && (
            <motion.div
              variants={itemVariant}
              initial="initial"
              exit="exit"
              animate={["takeFullHeight", "shadow"]}
              className="left-0 top-0 absolute z-[1] mt-[0.25rem] w-full overflow-clip rounded-inner border border-primary-color-700 bg-neutral"
            >
              {factors.map(([f1, f2]) => (
                <motion.li
                  variants={customItemVariant}
                  whileHover="hoverOrTapped"
                  whileTap="hoverOrTapped"
                  key={`${f1} ${f2}`}
                  onClick={changeActiveFactor([f1, f2])}
                  className="cursor-pointer px-[0.75rem] py-[0.5rem]"
                >
                  {f1} - {f2}
                </motion.li>
              ))}
              <motion.li
                variants={customItemVariant}
                initial="initial"
                whileHover="hoverOrTapped"
                whileTap="hoverOrTapped"
                className="cursor-pointer px-[0.75rem] py-[0.5rem]"
                onClick={openModal}
              >
                Custom
              </motion.li>
            </motion.div>
          )}
        </AnimatePresence>
      </ul>

      <div className="relative self-start sm:relative ">
        <Modal isActive={isModalActive} close={closeModal} />
      </div>
    </div>
  );
};

export default Dropdown;

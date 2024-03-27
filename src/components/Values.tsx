import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import GlobalContext from "../contexts/globalContext";
import { opacityVariant } from "../variants/opacityVariant";

const Values = () => {
  const { values, selectValue, selectedValue } = useContext(GlobalContext)!;

  return (
    <div className="flex flex-col items-baseline sm:flex-row">
      <h2
        className="mb-[0.5rem] min-w-[8rem] text-secondary-text sm:mb-[0]"
        children="Values"
      />

      <motion.ul
        layout="preserve-aspect"
        transition={{
          bounce: 0,
          bounceDamping: 0,
        }}
        className="flex w-fit max-w-[20rem] flex-wrap justify-center overflow-clip rounded-outer bg-primary-color-900 [@media(min-width:441px)]:justify-start"
      >
        {values.map((v) => (
          <AnimatePresence key={v}>
            <motion.li
              variants={opacityVariant}
              initial="invisible"
              exit="invisible"
              animate="visible"
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
  );
};

export default Values;

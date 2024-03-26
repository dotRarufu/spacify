import { useContext } from "react";
import GlobalContext from "../contexts/globalContext";
import { isOdd } from "../utils/math";
import { motion } from "framer-motion";

const Difference = () => {
  const {
    activeFactor: [f1, f2],
    selectedValue: selected,
    values,
  } = useContext(GlobalContext)!;

  const renderNoValue = () => {
    if (!selected)
      return (
        <div className="py-[0.5rem] text-secondary-text">No value selected</div>
      );

    return null;
  };

  const renderSelectAnother = () => {
    if (!selected) return null;

    const indexSelected = values.indexOf(selected);
    const previousValue = values[indexSelected - 1];

    if (!previousValue) {
      return <div className="py-[0.5rem]">Select another value</div>;
    }

    return null;
  };

  const renderDifference = () => {
    if (!selected) return null;

    const indexSelected = values.indexOf(selected);
    const previousValue = values[indexSelected - 1];
    const selectedIsEven = !isOdd(indexSelected);
    const increase = selectedIsEven ? f1 : f2;

    if (previousValue) {
      return (
        <>
          <motion.p
            layout
            style={{
              width: `${100 - increase}%`,
            }}
            className="rounded-inner bg-primary-color-900 px-[0.5rem] py-[0.5rem] text-end"
          >
            {previousValue}
          </motion.p>
          <p className="w-full rounded-inner bg-primary-color-900 px-[0.5rem] py-[0.5rem] text-end">
            {selected}
          </p>
          <p className="text-tertiary-text">{increase}% increase</p>
        </>
      );
    }
  };

  return (
    <motion.div
      layout="position"
      transition={{
        bounce: 0,
        bounceDamping: 0,
      }}
      className="flex flex-col items-baseline sm:flex-row"
    >
      <h3 className="mb-[0.5rem] min-w-[8rem] text-secondary-text">
        <div className="w-fit">Difference</div>
      </h3>

      <div className="flex   w-full max-w-[320px] flex-col gap-[0.5rem]">
        {renderNoValue()}

        {renderSelectAnother()}

        {renderDifference()}
      </div>
    </motion.div>
  );
};

export default Difference;

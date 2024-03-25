import { useContext } from "react";
import GlobalContext from "../contexts/globalContext";
import { isOdd } from "../utils/math";

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
    console.log("selected:", selected);
    console.log("selectedIsEven:", selectedIsEven);
    if (previousValue) {
      return (
        <>
          <p
            style={{
              width: `${100 - increase}%`,
            }}
            className="rounded-inner bg-primary-color-900 px-[0.5rem] py-[0.5rem] text-end"
          >
            {previousValue}
          </p>
          <p className="w-full rounded-inner bg-primary-color-900 px-[0.5rem] py-[0.5rem] text-end">
            {selected}
          </p>
          <p className="text-tertiary-text">{increase}% increase</p>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col items-baseline sm:flex-row">
      <h3 className="mb-[0.5rem] min-w-[8rem] text-secondary-text">
        Difference
      </h3>

      <div className="flex min-h-[5.625rem] w-full max-w-[320px] flex-col gap-[0.5rem]">
        {renderNoValue()}

        {renderSelectAnother()}

        {renderDifference()}
      </div>
    </div>
  );
};

export default Difference;

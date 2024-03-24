import { isOdd } from '../utils/math';
import { Factor } from '../utils/utils';

type DifferenceProps = {
  values: number[];
  selected: number | null;
  factor: Factor;
};

const Difference = ({
  selected,
  values,
  factor: [f1, f2],
}: DifferenceProps) => {
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
    console.log('selected:', selected);
    console.log('selectedIsEven:', selectedIsEven);
    if (previousValue) {
      return (
        <>
          <p
            style={{
              width: `${100 - increase}%`,
            }}
            className="bg-primary-color-900 rounded-inner px-[0.5rem] py-[0.5rem] text-end"
          >
            {previousValue}
          </p>
          <p className="bg-primary-color-900 rounded-inner px-[0.5rem] py-[0.5rem] w-full text-end">
            {selected}
          </p>
          <p className="text-tertiary-text">{increase}% increase</p>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-baseline">
      <h3 className="min-w-[8rem] text-secondary-text mb-[0.5rem]">
        Difference
      </h3>

      <div className="min-h-[5.625rem] flex w-full max-w-[320px] flex-col gap-[0.5rem]">
        {renderNoValue()}

        {renderSelectAnother()}

        {renderDifference()}
      </div>
    </div>
  );
};

export default Difference;

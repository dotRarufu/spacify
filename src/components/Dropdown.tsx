import { useRef, useState } from 'react';
import ArrowDown from './icons/ArrowDown';
import { useClickAway } from 'react-use';
import { Factor } from '../utils/utils';

const defaultFactors: Factor[] = [
  [30, 50],
  [20, 40],
  [10, 30],
];

type DropdownProps = {
  changeFactor: (f: Factor) => void;
  activeFactor: Factor;
};

const Dropdown = ({ changeFactor, activeFactor }: DropdownProps) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => setIsActive(!isActive);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickAway(containerRef, () => setIsActive(false));

  const changeActiveFactor = (f: Factor) => () => changeFactor(f);
  return (
    <div className="flex flex-col sm:flex-row items-baseline">
      <h2 className=" min-w-[8rem] text-secondary-text mb-[0.5rem]">Factor</h2>
      <div
        ref={containerRef}
        className="relative min-w-[8rem]"
        onClick={handleClick}
      >
        <p className="hover:bg-primary-color-500 border border-primary-color-500 rounded-inner px-[0.75rem] py-[0.5rem] flex gap-[0.5rem] justify-between cursor-pointer items-center">
          {activeFactor[0]} - {activeFactor[1]}
          <ArrowDown />
        </p>
        {isActive && (
          <div className="mt-[0.25rem] w-full border border-primary-color-700 bg-neutral  shadow-md absolute left-0 top-0 rounded-inner overflow-clip shadow-primary-color-500">
            {defaultFactors.map(([f1, f2]) => (
              <p
                key={`${f1} ${f2}`}
                onClick={changeActiveFactor([f1, f2])}
                className="px-[0.75rem] py-[0.5rem] hover:bg-primary-color-500 cursor-pointer "
              >
                {f1} - {f2}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

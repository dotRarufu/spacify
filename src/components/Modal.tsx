import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import GlobalContext from "../contexts/globalContext";
import { Factor } from "../utils/utils";
import { getLowestRatio } from "../utils/math";

type ModalProps = {
  isActive: boolean;
  close: () => void;
};

const Modal = ({ isActive, close }: ModalProps) => {
  const { addFactor } = useContext(GlobalContext)!;

  const modalRef = useRef<HTMLDialogElement>(null);

  const [value1, setValue1] = useState<number | null>(null);
  const [value2, setValue2] = useState<number | null>(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isActive) {
      modalRef.current.show();

      return;
    }
    modalRef.current.close();
  }, [isActive]);

  const clear = () => {
    setValue1(null);
    setValue2(null);
  };

  const closeModal = () => {
    clear();
    close();
  };

  useClickAway(modalRef, closeModal);

  const setNewValues = () => {
    const newFactor: Factor = [Number(value1), Number(value2)];

    addFactor(newFactor);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, input: 1 | 2) => {
    const { value, min, max } = event.target;
    const newValue = Math.max(
      Number(min),
      Math.min(Number(max), Number(value)),
    );

    if (input === 1) {
      setValue1(newValue);

      return;
    }

    setValue2(newValue);
  };

  return (
    <dialog
      ref={modalRef}
      className="absolute left-[0] top-1/2 h-fit w-screen max-w-[15.875rem] -translate-y-1/2 rounded-outer bg-neutral p-[1.5rem] shadow-2xl shadow-primary-color-500  sm:left-[1rem] sm:translate-y-[0]"
    >
      <h3 className="mb-[1rem] text-primary-text">Custom value</h3>
      <div className="flex flex-col gap-[0.5rem]">
        <input
          type="number"
          min={1}
          max={100}
          className="text-secondary rounded-inner border border-primary-color-700 bg-transparent p-[0.5rem] text-primary-text"
          placeholder="Value 1"
          value={value1 + ""}
          onChange={(e) => handleChange(e, 1)}
        />
        <input
          min={1}
          max={100}
          type="number"
          className="text-secondary rounded-inner border border-primary-color-700 bg-transparent p-[0.5rem] text-primary-text"
          placeholder="Value 2"
          value={value2 + ""}
          onChange={(e) => handleChange(e, 2)}
        />
      </div>
      <div className="mt-[1rem] flex justify-between">
        <label className="text-secondary-text">Ratio</label>

        <p className="text-primary-text">
          {value1 && value2 ? getLowestRatio(value1, value2) : "?"}
        </p>
      </div>

      <div className="mt-[1.5rem] flex flex-col gap-[0.5rem]">
        <button
          onClick={closeModal}
          className="rounded-inner p-[0.5rem] uppercase text-secondary-text hover:text-primary-text"
        >
          Close
        </button>
        <button
          className="rounded-inner border border-primary-color-500 p-[0.5rem] uppercase text-secondary-text hover:bg-primary-color-500 hover:text-primary-text"
          onClick={() => {
            setNewValues();
            closeModal();
          }}
        >
          Done
        </button>
      </div>
    </dialog>
  );
};

export default Modal;

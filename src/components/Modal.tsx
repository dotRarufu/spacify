import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import GlobalContext from "../contexts/globalContext";
import { Factor } from "../utils/utils";
import { getLowestRatio } from "../utils/math";
import { Variants, motion, useAnimationControls } from "framer-motion";
import { buttonPrimary } from "../variants/buttonPrimary";

import Input from "./Input";
import { colors } from "../utils/theme";

type ModalProps = {
  isActive: boolean;
  close: () => void;
};

const buttonTertiary: Variants = {
  unhovered: {
    color: colors["secondary-text"],
  },
  hovered: {
    color: colors["primary-text"],
  },
};

const Modal = ({ isActive, close }: ModalProps) => {
  const { addFactor } = useContext(GlobalContext)!;
  const dialogControl = useAnimationControls();
  const modalRef = useRef<HTMLDialogElement>(null);

  const [value1, setValue1] = useState<number | null>(null);
  const [value2, setValue2] = useState<number | null>(null);

  const closeModal = useCallback(async () => {
    if (!modalRef.current) return;
    await dialogControl.start("exit");
    setValue1(null);
    setValue2(null);
    close();
    modalRef.current.close();
  }, [close, dialogControl]);

  const showModal = useCallback(() => {
    if (!modalRef.current) return;

    modalRef.current.show();
    dialogControl.start(["takeFullHeight", "shadow"]);
  }, [dialogControl]);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isActive) {
      showModal();
      modalRef.current.show();

      return;
    }

    dialogControl.start("exit");
    modalRef.current.close();
  }, [dialogControl, isActive, showModal]);

  useClickAway(modalRef, closeModal);

  const setNewValues = () => {
    const newFactor: Factor = [Number(value1), Number(value2)];

    addFactor(newFactor);
  };

  const changeValue = (input: 1 | 2) => (value: number | null) => {
    if (input === 1) {
      setValue1(value);

      return;
    }

    setValue2(value);
  };

  const buttonControl = useAnimationControls();

  useEffect(() => {
    const valuesAreFilled = value1 && value2;

    if (!valuesAreFilled) {
      buttonControl.start("unhovered");
      return;
    }

    buttonControl.start("hovered");
  }, [buttonControl, value1, value2]);

  return (
    <motion.dialog
      ref={modalRef}
      className="absolute left-[0] top-[1rem] z-[2] m-[0] w-screen max-w-[15.875rem] overflow-clip rounded-outer border border-primary-color-700 bg-neutral p-[1rem] shadow-md shadow-primary-color-500 sm:left-[1rem] sm:top-[0] sm:translate-y-[0]"
      animate={dialogControl}
      transition={{ duration: 0.2 }}
      variants={{
        takeFullHeight: {
          height: "fit-content",
          opacity: 1,
        },

        initial: {
          opacity: 0,
          height: 0,
        },
        exit: {
          opacity: 0,
          height: 0,
        },
      }}
    >
      <h3 className="mb-[1rem] text-primary-text">Custom value</h3>
      <div className="flex flex-col gap-[0.5rem]">
        <Input
          value={value1}
          changeValue={changeValue(1)}
          number={1}
          otherValue={value2}
        />
        <Input
          value={value2}
          changeValue={changeValue(2)}
          number={2}
          otherValue={value1}
        />
      </div>
      <div className="mt-[1rem] flex justify-between">
        <p className="text-secondary-text">Ratio</p>

        <p
          style={{
            color: colors[value1 && value2 ? "primary-text" : "secondary-text"],
          }}
        >
          {value1 && value2 ? getLowestRatio(value1, value2) : ""}
        </p>
      </div>

      <motion.div className="mt-[1.5rem] flex flex-col gap-[0.5rem]">
        <motion.button
          onClick={closeModal}
          className="rounded-inner p-[0.5rem] uppercase"
          variants={buttonTertiary}
          whileHover="hovered"
          whileTap="hovered"
          initial="unhovered"
        >
          Close
        </motion.button>
        <motion.button
          className="rounded-inner border border-primary-color-500 p-[0.5rem] uppercase text-secondary-text "
          onClick={() => {
            setNewValues();
            closeModal();
          }}
          animate={buttonControl}
          variants={buttonPrimary}
          whileHover="hovered"
          whileTap="hovered"
          initial="unhovered"
        >
          Done
        </motion.button>
      </motion.div>
    </motion.dialog>
  );
};

export default Modal;

import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClickAway } from "react-use";
import GlobalContext from "../contexts/globalContext";
import { Factor } from "../utils/utils";
import { getLowestRatio } from "../utils/math";
import { Variants, motion, useAnimationControls } from "framer-motion";
import fullConfig from "../utils/theme";
import { buttonPrimary } from "../variants/buttonPrimary";

type ModalProps = {
  isActive: boolean;
  close: () => void;
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
      // dialogControl.start(["takeFullHeight", "shadow"]);

      modalRef.current.show();

      return;
    }

    dialogControl.start("exit");
    modalRef.current.close();
    // closeModal();
  }, [dialogControl, isActive, showModal]);

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

  const inputVariant: Variants = {
    noOutline: {
      outlineStyle: "solid",
      outlineWidth: "0px",
      outlineColor: fullConfig.theme.colors["primary-color-700"],
    },
    visibleOutline: {
      outlineWidth: "1px",
      outlineColor: fullConfig.theme.colors["primary-color-500"],
    },
  };

  const buttonTertiary: Variants = {
    unhovered: {
      color: fullConfig.theme.colors["secondary-text"],
    },
    hovered: {
      color: fullConfig.theme.colors["primary-text"],
    },
  };

  return (
    <motion.dialog
      ref={modalRef}
      className="absolute left-[0] top-[1rem] z-[2] m-[0] w-screen max-w-[15.875rem] overflow-clip rounded-outer border border-primary-color-700 bg-neutral p-[1rem] sm:left-[1rem] sm:top-[0] sm:translate-y-[0]"
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
          boxShadow: "none",
        },
        exit: {
          opacity: 0,
          height: 0,
          boxShadow: "none",
        },
      }}
    >
      <h3 className="mb-[1rem] text-primary-text">Custom value</h3>
      <div className="flex flex-col gap-[0.5rem]">
        <motion.input
          type="number"
          min={1}
          max={100}
          className="text-secondary rounded-inner border border-primary-color-700 bg-transparent p-[0.5rem] text-primary-text"
          placeholder="Value 1"
          value={value1 + ""}
          onChange={(e) => handleChange(e, 1)}
          variants={inputVariant}
          initial="noOutline"
          whileFocus="visibleOutline"
        />
        <motion.input
          min={1}
          max={100}
          type="number"
          className="text-secondary rounded-inner border border-primary-color-700 bg-transparent p-[0.5rem] text-primary-text"
          placeholder="Value 2"
          value={value2 + ""}
          onChange={(e) => handleChange(e, 2)}
          variants={inputVariant}
          initial="noOutline"
          whileFocus="visibleOutline"
        />
      </div>
      <div className="mt-[1rem] flex justify-between">
        <label className="text-secondary-text">Ratio</label>

        <p className="text-primary-text">
          {value1 && value2 ? getLowestRatio(value1, value2) : "?"}
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
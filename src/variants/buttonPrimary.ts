import { Variants } from "framer-motion";
import { colors } from "../utils/theme";

export const buttonPrimary: Variants = {
  unhovered: {
    background: colors["neutral"],
  },
  hovered: {
    background: colors["primary-color-500"],
    color: colors["primary-text"],
  },
};

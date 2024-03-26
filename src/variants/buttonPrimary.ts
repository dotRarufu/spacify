import { Variants } from "framer-motion";
import fullConfig from "../utils/theme";

export const buttonPrimary: Variants = {
  unhovered: {
    background: fullConfig.theme.colors["neutral"],
  },
  hovered: {
    background: fullConfig.theme.colors["primary-color-500"],
    color: fullConfig.theme.colors["primary-text"],
  },
};

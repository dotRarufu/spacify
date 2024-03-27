import { DefaultToastOptions } from "react-hot-toast";
import { colors } from "./utils/theme";

export const toastSettings: DefaultToastOptions = {
  position: "bottom-center",
  style: {
    border: "1px solid" + colors["primary-color-700"],
    borderRadius: "1rem",
    background: colors["neutral"],
    color: colors["primary-text"],
  },
};

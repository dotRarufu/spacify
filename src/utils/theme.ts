import resolveConfig from "tailwindcss/resolveConfig";
// @ts-expect-error i don't know how to fix this type error, but it works so
import tailwindConfig from "../../tailwind.config.js";

const fullConfig = resolveConfig(tailwindConfig);

export const { colors } = fullConfig.theme;

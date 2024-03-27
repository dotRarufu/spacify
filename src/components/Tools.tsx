import { motion } from "framer-motion";
import { colors } from "../utils/theme";

const realtimeColors = "https://www.realtimecolors.com";
const typescale = "https://typescale.com/";

const Tools = () => {
  return (
    <motion.div
      layout="position"
      className="flex flex-col sm:flex-row sm:items-center"
    >
      <h2 className="mb-[0.5rem] w-fit min-w-[8rem] pr-[2rem] text-secondary-text sm:mb-[0]">
        More tools
      </h2>
      <ul className="flex w-full flex-wrap gap-x-[1rem] gap-y-[0.5rem]">
        <motion.li
          whileHover={{
            backgroundColor: colors["primary-color-500"],
          }}
          className="cursor-pointer rounded-inner border border-primary-color-700 px-[0.5rem] py-[0.5rem]"
        >
          <a
            href={realtimeColors}
            target="_blank"
            className="flex items-center gap-[0.5rem]"
          >
            <img
              src="/realtime-colors-logo.png"
              alt="Realtime Colors"
              className="aspect-square w-[1.5rem]"
            />
            Realtime Colors
          </a>
        </motion.li>

        <motion.li
          whileHover={{
            backgroundColor: colors["primary-color-500"],
          }}
          className="cursor-pointer rounded-inner border border-primary-color-700 px-[0.5rem] py-[0.5rem]"
        >
          <a
            href={typescale}
            target="_blank"
            className="flex items-center gap-[0.5rem]"
          >
            <img
              src="/typescale-logo.jpg"
              alt="Typescale"
              className="aspect-square w-[1.5rem] rounded-inner"
            />
            Typescale
          </a>
        </motion.li>
      </ul>
    </motion.div>
  );
};

export default Tools;

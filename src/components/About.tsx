import { motion } from "framer-motion";

export const repoLink = "https://github.com/dotRarufu/spacify";
const About = () => {
  return (
    <motion.div
      layout="position"
      className="flex flex-col items-baseline sm:flex-row"
    >
      <h2 className="mb-[0.5rem] min-w-[8rem] pr-[2rem] text-secondary-text sm:mb-[0]">
        What is this for?
      </h2>
      <div className="w-full">
        <p className="max-w-[30ch] leading-[1.7]">
          Stop thinking about how much far should element A be from element B.
          Spacify is a spacing and sizing system. It generates values that you
          can just copy and paste to your design.{" "}
          <a className="hover:underline" href={repoLink}>
            Read more
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default About;

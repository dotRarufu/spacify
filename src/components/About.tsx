const About = () => {
  const repoLink = "https://github.com/dotRarufu/spacify";

  return (
    <div className="flex flex-col items-baseline sm:flex-row">
      <h3 className="mb-[0.5rem] min-w-[8rem] pr-[2rem] text-secondary-text">
        What is this for?
      </h3>
      <div className="w-full">
        <p className="max-w-[30ch] ">
          Stop thinking about how much far should element A be from element B.
          Spacify is a spacing and sizing system. It generates values that you
          can just copy and paste to your design.{" "}
          <a className="hover:underline" href={repoLink}>
            Read more
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;

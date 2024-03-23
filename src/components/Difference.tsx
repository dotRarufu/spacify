const Difference = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <h2 className="min-w-[8rem] text-secondary-text mb-[0.5rem]">
        Difference
      </h2>
      <div className="flex w-full max-w-[320px] flex-col gap-[0.5rem]">
        <p className="bg-primary-color-700 rounded-inner px-[0.5rem] py-[0.5rem] w-[70%] text-end">
          8
        </p>
        <p className="bg-primary-color-700 rounded-inner px-[0.5rem] py-[0.5rem] w-full text-end">
          16
        </p>
        <p className="hidden">50% increase</p>
      </div>
    </div>
  );
};

export default Difference;

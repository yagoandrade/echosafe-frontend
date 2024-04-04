import { ArrowRight } from "lucide-react";

const TopBar = () => {
  return (
    <div className="flex w-full justify-between bg-[#1433d6] px-4 py-1.5 font-light lg:px-12 xl:px-32 2xl:gap-x-12 2xl:px-80">
      <span className="flex items-center gap-x-1">
        <p>NVIDIA H100 GPUs are now available, for as low as $9.90</p>
        <ArrowRight size="1.2rem" strokeWidth={2} />
      </span>
    </div>
  );
};

export default TopBar;

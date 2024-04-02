import { Star } from "lucide-react";
import Laurel from "@/../public/assets/svg/laurel.svg";
import Image, { type StaticImageData } from "next/image";

const LaurelRatings = () => {
  return (
    <div className="relative table invert dark:text-black">
      <Image
        priority
        src={Laurel as StaticImageData}
        alt="Laurel"
        width={195}
        height={195}
      />

      <div className="absolute top-0 w-full space-y-0.5 text-center">
        <p className="w-full text-sm">#1 Tech Community</p>
        <span className="flex w-full justify-center gap-x-1">
          <Star color="black" fill="black" size="1.2rem" />
          <Star color="black" fill="black" size="1.2rem" />
          <Star color="black" fill="black" size="1.2rem" />
          <Star color="black" fill="black" size="1.2rem" />
          <Star color="black" fill="black" size="1.2rem" />
        </span>
        <p className="w-full text-[10px] uppercase">Since 2022</p>
      </div>
    </div>
  );
};

export default LaurelRatings;

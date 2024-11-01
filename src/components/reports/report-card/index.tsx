import Link from "next/link";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { statuses, type Statuses } from "@/data/data";

export interface ReportCardTypes {
  id?: string;
  status: Statuses;
  username: string;
  reportClass: string;
  date: Date;
  categories: string[];
}

const ReportCard = ({
  id,
  status,
  username,
  reportClass,
  date,
  categories,
}: ReportCardTypes) => {
  return (
    <Link
      href={`report?=${id}`}
      className="xs:grid-cols-2 pointer-events-none grid w-full min-w-full grid-cols-1 justify-start gap-4 overflow-x-auto rounded p-6 text-base transition duration-100 hover:bg-[#fbfbfb]  md:pointer-events-auto md:min-w-[40rem] md:grid-cols-4 md:items-center md:gap-x-4 md:py-12 md:text-sm"
    >
      <Badge
        variant={statuses[status].value}
        className="xs:w-fit xs:justify-start h-fit w-full items-center justify-center gap-x-2 self-center text-base sm:text-sm md:w-fit"
      >
        <span className="flex size-4 items-center justify-center rounded-full text-xs font-black">
          {statuses[status].icon()}
        </span>
        <p>{statuses[status].label}</p>
      </Badge>
      <div>
        <h1 className="font-bold">{username}</h1>
        <p className="font-medium text-[#71717A]">{reportClass}</p>
      </div>
      <div>
        <h1 className="font-bold">Received at</h1>
        <p className="font-medium text-[#71717A]">
          {new Date(date).toLocaleDateString("en-US")}
        </p>
      </div>
      <div>
        <h1 className="font-bold">Categories</h1>
        <p className="font-medium text-[#71717A]">
          {(categories ?? []).map((category, index) => {
            if (index === categories.length - 1) return category;
            return `${category}, `;
          })}
        </p>
      </div>
      <Button
        variant="outline"
        className="xs:col-span-2 pointer-events-auto flex items-center justify-center gap-x-1 font-medium hover:underline md:hidden"
      >
        <p className="font-medium ">Acompanhar denúncia</p>
      </Button>
    </Link>
  );
};

export default ReportCard;

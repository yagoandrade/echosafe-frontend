import { Complaint } from "@/app/reports/components/complaints-table/types";
import Link from "next/link";
import { Button } from "../button";
import { Badge } from "../ui/badge";
import { getColorFromCode, getIconFromCode, getStatusFromCode } from "./utils";

type Status = Complaint["status"];

interface ReportCardTypes {
  id?: string;
  status: Status;
  username: string;
  reportClass: string;
  date: Date;
  reportType: string[];
  onClickComplaint?: () => void;
}

const ReportCard = (complaint: ReportCardTypes) => {
  const {
    id,
    status,
    username,
    reportClass,
    date,
    reportType,
    onClickComplaint,
  } = complaint;

  return (
    <Link
      href={`report?=${id}`}
      onClick={() => {
        onClickComplaint?.();
      }}
      className="pointer-events-none grid w-full min-w-full grid-cols-1 justify-start gap-4 overflow-x-auto rounded p-6 text-base transition duration-100 hover:bg-[#fbfbfb] xs:grid-cols-2 md:pointer-events-auto md:min-w-[40rem] md:grid-cols-4 md:items-center md:gap-x-4 md:py-12 md:text-sm"
    >
      <Badge
        variant={status}
        className={`h-fit w-full items-center justify-center gap-x-2 self-center text-base xs:w-fit xs:justify-start sm:text-sm`}
      >
        <span
          className="flex size-4 items-center justify-center rounded-full text-xs font-black"
          style={{ backgroundColor: getColorFromCode(status) }}
        >
          {getIconFromCode(status)}
        </span>
        <p>{getStatusFromCode(status)}</p>
      </Badge>
      <div>
        <h1 className="font-bold">{username}</h1>
        <p className="font-medium text-[#71717A]">{reportClass}</p>
      </div>
      <div>
        <h1 className="font-bold">Recebido em</h1>
        <p className="font-medium text-[#71717A]">
          {new Date(date).toLocaleDateString()}
        </p>
      </div>
      <div>
        <h1 className="font-bold">Categoria(s)</h1>
        <p className="font-medium text-[#71717A]">
          {reportType.map((category) => category + " ")}
        </p>
      </div>
      <Button
        variant="outline"
        className="pointer-events-auto flex items-center justify-center gap-x-1 font-medium hover:underline xs:col-span-2 md:hidden"
      >
        <p className="font-medium ">Acompanhar denúncia</p>
      </Button>
    </Link>
  );
};

export default ReportCard;

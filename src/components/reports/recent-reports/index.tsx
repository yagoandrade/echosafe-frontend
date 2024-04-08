import { cn } from "@/lib/utils";
import { ChevronRight, Sticker } from "lucide-react";
import Link from "next/link";
import ReportCard, { type ReportCardTypes } from "../report-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

const RecentReports = () => {
  const complaints: ReportCardTypes[] = [
    {
      id: "1",
      status: "open",
      username: "John Doe",
      reportClass: "Class 1",
      date: new Date(),
      categories: ["Harassment", "Bullying"],
    },
    {
      id: "2",
      status: "under_review",
      username: "Jane Doe",
      reportClass: "Class 2",
      date: new Date(),
      categories: ["Harassment", "Bullying"],
    },
    {
      id: "3",
      status: "requires_action",
      username: "John Doe",
      reportClass: "Class 3",
      date: new Date(),
      categories: ["Harassment", "Bullying"],
    },
    {
      id: "4",
      status: "solved",
      username: "Jane Doe",
      reportClass: "Class 4",
      date: new Date(),
      categories: ["Harassment", "Bullying"],
    },
  ];

  const renderComplaintRow = (complaint: ReportCardTypes, index: React.Key) => (
    <div
      className={cn(
        "w-fit min-w-full border border-x-0 border-t-0 border-transparent",
        index !== complaints.length - 1 &&
          "border-b border-[#e4e4e7] dark:border-[#303146]",
      )}
      key={complaint.id}
    >
      <ReportCard
        date={new Date()}
        reportClass={""}
        categories={complaint.categories}
        status={complaint.status}
        username={"Anonymous Student"}
        id={complaint.id}
      />
    </div>
  );

  const ShowComplaints = complaints?.slice().reverse()?.map(renderComplaintRow);

  return (
    <Card className="flex flex-col border border-[#e4e4e7] dark:border-[#303146]">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>Recent Reports</CardTitle>
          <Link
            href="/reports"
            className="flex items-center gap-x-1 text-sm font-medium hover:underline"
          >
            See all reports
            <ChevronRight size="1rem" className="min-w-fit" />
          </Link>
        </div>
        <CardDescription className="hidden md:flex">
          {/* TODO: Update this text */}
          {true
            ? "Keep track of complaints received by your institution."
            : "Keep track of the reports you have made."}
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          complaints.length
            ? "flex flex-col overflow-x-auto p-0"
            : "h-full min-h-[200px]",
        )}
      >
        {complaints.length ? (
          ShowComplaints
        ) : (
          <div className="flex size-full flex-col items-center justify-center space-y-3">
            <Sticker size="5rem" strokeWidth={1.5} />
            <h3 className="font-bold leading-none tracking-tight">
              Nada pra mostrar aqui
            </h3>
            <p className="text-sm text-muted-foreground">
              Vamos te atualizar quando houver chamados.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentReports;

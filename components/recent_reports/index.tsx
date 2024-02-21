import { useReportStore } from "@/app/hooks/reports/store";
import { cn } from "@/lib/utils";
import { useCurrentUserStore } from "@/store/currentUser";
import { ChevronRight, Sticker } from "lucide-react";
import Link from "next/link";
import ReportCard from "../report_card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Complaint } from "@/app/reports/components/complaints-table/types";
import { useCurrentReportStore } from "@/store/currentReport";

const RecentReports = () => {
  const { complaints } = useReportStore();
  const { userData } = useCurrentUserStore();
  const { setCurrentComplaint } = useCurrentReportStore();

  const renderComplaintRow = (complaint: Complaint, index: React.Key) => (
    <div
      className={cn(
        "border border-x-0 border-t-0 border-transparent min-w-full w-fit",
        index !== complaints.length && "border-b border-[#e4e4e7]"
      )}
      key={complaint.id}
    >
      <ReportCard
        date={new Date(complaint.receivedDate)}
        reportClass={complaint.classGroup}
        reportType={JSON.parse(complaint.category) ?? complaint.category}
        status={complaint.status}
        username={complaint.sender === userData.uid ? "Você" : "Aluno Anônimo"}
        id={complaint.id}
        onClickComplaint={() => setCurrentComplaint(complaint)}
      />
    </div>
  );

  const ShowComplaints = complaints?.slice().reverse()?.map(renderComplaintRow);

  return (
    <Card className="flex size-full flex-col">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>Chamados Recentes</CardTitle>
          <Link
            href="/reports"
            className="flex items-center gap-x-1 text-sm font-medium text-[#4F46E5] hover:underline"
          >
            Ver Todos os Chamados
            <ChevronRight size="1rem" className="min-w-fit" />
          </Link>
        </div>
        <CardDescription className="hidden md:flex">
          {userData.role === "school"
            ? "Acompanhe as denúncias recebidas pela sua instituição"
            : "Acompanhe as denúncias que você realizou"}
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          complaints.length
            ? "p-0 flex flex-col overflow-x-auto"
            : "min-h-[200px] h-full"
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

"use client";

import { useReportStore } from "@/app/hooks/reports/store";
import { Button } from "@/components/button";
import { CardTitle } from "@/components/ui/card";
import { FileDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { monthlyData } from "../../mock";
import { useDashStore } from "../../store";
import { groupReportsByDay } from "../chart/utils";

const BullyingDashboard = () => {
  const { push } = useRouter();
  const { setDashInfo } = useDashStore();
  const { complaints } = useReportStore();

  const data = groupReportsByDay(complaints);

  console.log(data, "chart");
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigateToMonthCases = () => {
    push(`dashboard/month_cases`);
  };

  const setCasesByMonth = (month: string) => {
    const data = monthlyData.find((data) => data.month === month);
    setDashInfo(data ?? { cases: [], month: "" });
    handleNavigateToMonthCases();
  };

  const handleDivDownload = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/generatePDF", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // TODO: Change the URL example below to something dynamic and only accessible via the API route
        body: JSON.stringify({
          url: "https://echosafe.org/export/pdf/example",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF.");
      }

      const pdfBlob = await response.blob();
      const blobUrl = URL.createObjectURL(pdfBlob);

      const date = new Date();
      const fileName = `relatorio_echosafe_${date.toLocaleDateString()}_${date.toLocaleTimeString()}.pdf`;

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Erro durante a geração ou download do PDF:", error);

      if ((error as Error).name === "TypeError") {
        toast.error(
          "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente."
        );
      } else if ((error as Error).message.includes("NetworkError")) {
        toast.error(
          "Ocorreu um erro de rede. Por favor, verifique sua conexão com a internet e tente novamente."
        );
      } else {
        toast.error(
          "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  return (
    <section className="space-y-2">
      <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle>Denúncias em 2023</CardTitle>
        <Button
          className="hidden gap-x-2 lg:flex"
          variant="outline"
          onClick={handleDivDownload}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin duration-1000" />
              Estamos preparando seu relatório...
            </>
          ) : (
            <>
              <FileDown />
              Exportar em PDF
            </>
          )}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-1 xs:grid-cols-2 lg:w-fit lg:grid-cols-4">
        <Button variant="ghost" className="w-full lg:w-fit">
          7 Dias
        </Button>
        <Button variant="ghost" className="w-full lg:w-fit">
          30 Dias
        </Button>
        <Button variant="ghost" className="w-full lg:w-fit">
          6 Meses
        </Button>
        <Button variant="outline" className="w-full lg:w-fit">
          12 Meses
        </Button>
      </div>
      <div className="w-full overflow-x-auto">
        <ResponsiveContainer height={300} width="100%" minWidth={780}>
          <LineChart
            data={data.sort(
              (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
            )}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            onClick={({ activeLabel }) =>
              setCasesByMonth(
                typeof activeLabel === "string" ? activeLabel : ""
              )
            }
            className="-ml-8 text-xs"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Button
        className="flex w-full gap-x-2 lg:hidden"
        variant="outline"
        onClick={handleDivDownload}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin duration-1000" />
            Estamos preparando seu relatório...
          </>
        ) : (
          <>
            <FileDown />
            Exportar em PDF
          </>
        )}
      </Button>
    </section>
  );
};

export default BullyingDashboard;

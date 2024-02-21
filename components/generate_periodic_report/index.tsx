"use client";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useCallback, useState } from "react";
import Select, { GroupBase, StylesConfig } from "react-select";
import { FileDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import HelpTooltip from "../help_tooltip";

interface GeneratePeriodicReportProps {
  children: React.ReactNode;
}

export function GeneratePeriodicReport({
  children,
}: Readonly<GeneratePeriodicReportProps>) {
  const [date, setDate] = useState<any>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  type MyOptionType = {
    value: string;
    label: string;
  };

  type IsMulti = true;

  const filterByReportType = [
    { value: "racism", label: "Racismo" },
    { value: "homophobia", label: "Homofobia" },
    { value: "transphobia", label: "Transfobia" },
    { value: "harassment", label: "Assédio" },
  ];

  const customSelectStyles: StylesConfig<
    MyOptionType,
    IsMulti,
    GroupBase<MyOptionType>
  > = {
    option: (styles) => ({
      ...styles,
      cursor: "pointer",
    }),
    control: (styles) => ({
      ...styles,
      cursor: "pointer",
    }),
  };

  // TODO: Código repetido em app/dashboard/components/bullying_dashboard/index.tsx, extrair para um hook
  const handleDivDownload = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Remover necessidade de passar a imagem para o backend
      // TODO: Rever o código abaixo, pois não faz sentido
      const formData = new FormData();
      formData.append("file", "");

      const response = await fetch("/api/generatePDF", {
        method: "POST",
        body: formData,
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

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error during PDF generation or download:", error);
      toast.error(
        "Tivemos um erro na hora de exportar seu relatório. Por favor, tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Emitir relatório</DialogTitle>
          <DialogDescription>
            Escolha o período de denúncias que deseja incluir no relatório.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full gap-4 py-4">
          <Label htmlFor="time" className="flex items-center gap-x-1">
            Período{" "}
            <HelpTooltip content="Escolha o dia inicial e dia final que quer receber as denúncias" />
          </Label>
          <Calendar
            showOutsideDays={false}
            mode="range"
            selected={date}
            onSelect={setDate}
            className="w-fit rounded-md border"
          />
          <Label htmlFor="filter" className="flex items-center gap-x-1">
            Filtro{" "}
            <HelpTooltip content="Receba um relatório contendo somente as denúncias com as categorias escolhidas." />
          </Label>
          <Select
            placeholder="Filtrar por tipo de denúncia..."
            options={filterByReportType}
            styles={customSelectStyles}
            className="w-full"
            isMulti
            defaultValue={filterByReportType[0]}
          />
        </div>
        <DialogFooter>
          <Button
            className="hidden gap-x-2 lg:flex"
            variant="outline"
            type="submit"
            size="fullWidth"
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

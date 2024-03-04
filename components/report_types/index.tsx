"use client";

import { useReportStore } from "@/app/hooks/reports/store";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

type MyOptionType = {
  value: string;
  label: string;
};

type IsMulti = false;

const ReportTypes = () => {
  const { complaints } = useReportStore();

  const categories: { name: string; count: number }[] = complaints.reduce(
    (acc: { name: string; count: number }[], complaint) => {
      const complaintCategories = complaint.categories || ["Machismo"];
      complaintCategories.forEach((categoryName) => {
        const existingCategory = acc.find((cat) => cat.name === categoryName);

        if (existingCategory) {
          existingCategory.count += 1;
        } else {
          acc.push({ name: categoryName, count: 1 });
        }
      });

      return acc;
    },
    []
  );

  /*
    TODO: Readicionar essa variável quando o select voltar
  const reportTypeOptions = [
    { value: "last_week", label: "Últimos 7 Dias" },
    { value: "last_month", label: "Últimos 30 Dias" },
    { value: "last_semester", label: "Últimos 6 Meses" },
    { value: "last_year", label: "Últimos 12 Meses" },
  ]; */

  const maximumReports = 10;

  const getPercentageOfReports = (reports: number) => {
    return reports * maximumReports;
  };

  /*
  TODO: Readicionar essa variável quando o select voltar
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
  }; */

  return (
    <Card className="h-full">
      <CardHeader>
        {/* TODO: Remover o mb-4 ao readicionar o Select */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <CardTitle>Tipos de Denúncia</CardTitle>
          {/*
          TODO: Readicionar para o marco 2
          <Select
            options={reportTypeOptions}
            styles={customSelectStyles}
            className="text-xs w-full sm:w-fit"
            defaultValue={reportTypeOptions[0]}
          /> */}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6">
        {categories.map((category) => (
          <div
            className="flex flex-col gap-y-3 text-sm"
            key={category.name.replace(/[\[\]"]/g, "")}
          >
            <span className="flex w-full justify-between">
              <p className="font-medium">
                {category.name.replace(/[\[\]"]/g, "")}
              </p>
              <p className="font-medium">{category.count}</p>
            </span>
            <Progress value={getPercentageOfReports(category.count)} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ReportTypes;

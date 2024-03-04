import { Complaint } from "@/app/reports/components/complaints-table/types";

export const filterReportsByTime = (reports: Complaint[], days: number) => {
  const filteredReports = reports.filter((report) => {
    if (typeof report.createdAt === "undefined") {
      return false;
    }
    const reportDate = new Date(report.createdAt);
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - days);
    return reportDate >= limitDate;
  });

  return filteredReports;
};

export const groupReportsByDay = (reports: Complaint[]) => {
  const countPerDay = reports.reduce((acc: any, report) => {
    const stringDate = `${report.createdAt}`;
    const date = stringDate.split("T")[0];
    // Incrementar a contagem para esta data
    if (!acc[date]) {
      acc[date] = 1;
    } else {
      acc[date]++;
    }
    return acc;
  }, {});

  // Converter para o formato esperado pelo Recharts
  return Object.keys(countPerDay).map((date) => ({
    date,
    count: countPerDay[date],
  }));
};

export const mock = [
  {
    id: 181,
    description: "Descrição do report 701",
    victim: false,
    status: "open",
    endosers: [
      "Ana",
      "Hector",
      "Bruno",
      "Gabriela",
      "Fábio",
      "Carla",
      "Eliane",
      "David",
    ],
    categories: ["Homofobia", "Cyberbullying", "Preconceito"],
    createdAt: new Date(2024, 2, 15),
  },
  {
    id: 730,
    description: "Descrição do report 428",
    victim: true,
    status: "open",
    endosers: ["David"],
    categories: ["Preconceito", "Cyberbullying", "Racismo"],
    createdAt: new Date(2024, 1, 15),
  },
  {
    id: 147,
    description: "Descrição do report 369",
    victim: false,
    status: "closed",
    endosers: [
      "Carla",
      "Hector",
      "Bruno",
      "Gabriela",
      "Eliane",
      "Fábio",
      "Ana",
      "David",
    ],
    categories: ["Preconceito", "Cyberbullying", "Homofobia"],
    createdAt: new Date(2024, 2, 1),
  },
  {
    id: 403,
    description: "Descrição do report 604",
    victim: false,
    status: "closed",
    endosers: ["David", "Bruno"],
    categories: ["Cyberbullying", "Homofobia", "Racismo"],
    createdAt: new Date(2024, 1, 2),
  },
  {
    id: 544,
    description: "Descrição do report 293",
    victim: false,
    status: "closed",
    endosers: [
      "David",
      "Bruno",
      "Fábio",
      "Hector",
      "Eliane",
      "Gabriela",
      "Ana",
    ],
    categories: ["Racismo", "Cyberbullying", "Homofobia"],
    createdAt: new Date(2024, 1, 2),
  },
  {
    id: 801,
    description: "Descrição do report 315",
    victim: false,
    status: "open",
    endosers: ["Gabriela"],
    categories: ["Racismo", "Homofobia", "Preconceito", "Cyberbullying"],
    createdAt: new Date(2024, 2, 26),
  },
  {
    id: 259,
    description: "Descrição do report 628",
    victim: false,
    status: "closed",
    endosers: ["David", "Hector", "Carla", "Bruno", "Ana"],
    categories: ["Homofobia", "Preconceito", "Cyberbullying"],
    createdAt: new Date(2024, 1, 28),
  },
  {
    id: 183,
    description: "Descrição do report 398",
    victim: true,
    status: "closed",
    endosers: ["David", "Hector", "Carla", "Bruno", "Ana"],
    categories: ["Racismo", "Cyberbullying", "Preconceito", "Homofobia"],
    createdAt: new Date(2024, 1, 24),
  },
  {
    id: 471,
    description: "Descrição do report 435",
    victim: false,
    status: "open",
    endosers: [
      "David",
      "Hector",
      "Fábio",
      "Gabriela",
      "Bruno",
      "Ana",
      "Eliane",
    ],
    categories: ["Preconceito", "Homofobia"],
    createdAt: new Date(2024, 2, 1),
  },
  {
    id: 503,
    description: "Descrição do report 573",
    victim: true,
    status: "open",
    endosers: ["Fábio", "Eliane"],
    categories: ["Preconceito", "Racismo", "Homofobia"],
    createdAt: new Date(2024, 2, 4),
  },
];

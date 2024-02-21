import { monthlyData } from "./mock";

export const monthlyCounts = monthlyData.map((monthData) => ({
  month: monthData.month,
  totalCases: monthData.cases.length,
}));

export const filterByDateInterval = (
  interval: "12m" | "3m" | "1m" | "7d" = "12m"
) => {
  const currentDate = new Date();
  let intervalDate = new Date();

  switch (interval) {
    case "12m":
      intervalDate.setFullYear(currentDate.getFullYear() - 1);
      break;
    case "3m":
      intervalDate.setMonth(currentDate.getMonth() - 3);
      break;
    case "1m":
      intervalDate.setMonth(currentDate.getMonth() - 1);
      break;
    case "7d":
      intervalDate.setDate(currentDate.getDate() - 7);
      break;
  }

  return monthlyData.flatMap(({ cases }) =>
    cases.filter(({ date }) => new Date(date) >= intervalDate)
  );
};

export function base64ToArrayBuffer(base64: string) {
  const binaryString = window.atob(base64);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

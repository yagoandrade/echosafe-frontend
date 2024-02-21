"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

export const options = {
  responsive: true,
  plugins: {
    tooltip: {
      displayColors: false,
      backgroundColor: "#fff",
      titleColor: "#71717A",
      titleFont: {
        size: 14,
        weight: "500",
      },
      bodyColor: "#000",
      bodyFont: {
        size: 14,
        weight: "700",
      },
      padding: 10,
      borderColor: "#71717A",
      borderWidth: 0.5,
      xAlign: "center",
      titleAlign: "center",
      bodyAlign: "center",
      callbacks: {
        label: function (context: { parsed: { y: string } }) {
          return context.parsed.y + " denúncias";
        },
      },
    },
  },
};

const labels = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

/*
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
*/

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Denúncias",
      data: [1, 2, 4, 8, 3, 5, 12, 1, 2, 3, 10, 7],
      borderColor: "#4F46E5",
      backgroundColor: "#F7F9FF",
    },
  ],
};
const Chart = () => {
  return <Line options={options as any} data={data} />;
};

export default Chart;

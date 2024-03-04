import React from "react";
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
import { monthlyData } from "./mock";

const BullyingDashboard: React.FC = () => {
  const monthlyCounts = monthlyData.map((monthData) => ({
    month: monthData.month,
    totalCases: monthData.cases.length,
  }));

  return (
    <div>
      <h1>Dashboard de Denúncias de Bullying</h1>
      <div>
        <h2>Quantidade de Casos por Mês</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={monthlyCounts}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalCases"
              name="Casos"
              stroke="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2>Denúncias por Mês</h2>
        {monthlyData.map((monthData) => (
          <div key={monthData.month}>
            <h3>{monthData.month}</h3>
            <ul>
              {monthData.cases.map((caseData, index) => (
                <li key={index}>
                  <strong>Tipo:</strong> {caseData.type}
                  <br />
                  <strong>Descrição:</strong> {caseData.description}
                  <br />
                  <strong>Data:</strong> {caseData.date}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BullyingDashboard;

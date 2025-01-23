import React from "react";
import Layor from "../layout/layor.tsx"; // Import Layout component
import DashboardCard from "./Card.tsx";
import { FaHouse, FaMicrophone, FaTv } from "react-icons/fa6";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "react-google-charts";

// ลงทะเบียน Chart.js elements
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const Dashboo: React.FC = () => {
  // ข้อมูลและตัวเลือกของ Bar Chart
  const chartData = {
    labels: ["จำนวนการแจ้งซ่อม", "จำนวนห้องประชุม", "จำนวน PC"],
    datasets: [
      {
        label: "จำนวน",
        data: [16, 15, 100],
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF"],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  // ข้อมูลและตัวเลือกของ Google Pie Chart
  const googleChartData = [
    ["Resource", "Count"],
    ["จำนวนการแจ้งซ่อม", 16],
    ["จำนวนห้องประชุม", 15],
    ["จำนวน PC", 100],
  ];

  const googleChartOptions = {
    title: "ข้อมูลทรัพยากร (Pie Chart)",
    pieHole: 0.4,
    is3D: false,
    legend: { position: "bottom" },
  };

  return (
    <Layor>
      <h2>แดชบอร์ดอุปกรณ์การแจ้งซ่อมภายในห้องประชุม</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "10px",
          padding: "20px",
          alignItems: "center",
        }}
      >
        <DashboardCard title="จำนวนการแจ้งซ่อม" description="16" icon={<FaHouse />} />
        <DashboardCard title="จำนวนห้องประชุม" description="15" icon={<FaMicrophone />} />
        <DashboardCard title="จำนวน PC" description="100" icon={<FaTv />} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "16px",
          padding: "10px",
          height: "auto",
        }}
      >
        {/* Bar Chart */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "16px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "100%",
            textAlign: "center",
          }}
        >
          <Bar
            data={chartData}
            options={barChartOptions}
            style={{ width: "600px", height: "600px", margin: "auto", textAlign: "center" }}
          />
        </div>

        {/* Google Pie Chart */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "16px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Chart chartType="PieChart" data={googleChartData} options={googleChartOptions} width="100%" height="400px" />
        </div>
      </div>
    </Layor>
  );
};

export default Dashboo;

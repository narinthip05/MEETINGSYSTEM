import React, { useState, useEffect } from "react";
import Layer from "../layout/layer";
import DashboardCard from "./Card";
import { Bar } from "react-chartjs-2";
import { FaHouse, FaMicrophone, FaTv, FaPeopleRoof, FaComputer } from "react-icons/fa6";
import { Chart } from "react-google-charts";


// ฟังก์ชันสมมติข้อมูล
const mockFetchRoomDetails = () => {
    return Promise.resolve({
        rooms: 60,
        microphones: 200,
        screens: 50,
        moniters: 100,
        PC:100,
    });
};

// Google Chart Data & Options
const googleChartData = [
    ["Resource", "Count"],
    ["ห้องประชุม", 60],
    ["ไมโครโฟน", 200],
    ["จอ", 50],
    ["จอคอมพิวเตอร์", 100],
    ["เครื่อง PC", 100],
];
const googleChartOptions = {
    title: "ข้อมูลทรัพยากร",
    pieHole: 0.4,
    is3D: false,
};

const Dashboard: React.FC = () => {
    const [detailsData, setDetailsData] = useState({
        rooms: 0,
        microphones: 0,
        screens: 0,
        moniters: 0,
        PC:0,
    });

    useEffect(() => {
        mockFetchRoomDetails().then((data) => setDetailsData(data));
    }, []);

    const chartData = {
        labels: ["จำนวนห้องประชุม", "ไมโครโฟน", "จอ", "ความจุ"],
        datasets: [
            {
                label: "จำนวน",
                data: [
                    detailsData.rooms,
                    detailsData.microphones,
                    detailsData.screens,
                    detailsData.moniters,
                    detailsData.PC,
                ],
                backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#F1C40F"],
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" as const },
        },
        scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
        },
    };

    return (
        <Layer>
            {/* Card Section */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "10px",
                    padding: "20px",
                }}
            >
                <DashboardCard
                    title="จำนวนห้องประชุม"
                    description={`${detailsData.rooms} ห้อง`}
                    icon={<FaHouse />}
                />
                <DashboardCard
                    title="ไมโครโฟน"
                    description={`${detailsData.microphones} ตัว`}
                    icon={<FaMicrophone />}
                />
                <DashboardCard
                    title="จอ"
                    description={`${detailsData.screens} ตัว`}
                    icon={<FaTv />}
                />
                <DashboardCard
                    title="จอคอมพิวเตอร์"
                    description={`${detailsData.moniters} ตัว`}
                    icon={<FaPeopleRoof />}
                />
                 <DashboardCard
                    title="PC"
                    description={`${detailsData.PC} เครื่อง`}
                    icon={<FaComputer />}
                />
            </div>

            {/* Chart Section */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
                    gap: "16px",
                    padding: "10px",
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
                    }}
                >
                    <h2>ข้อมูลทรัพยากร (Bar Chart)</h2>
                    <Bar data={chartData} options={barChartOptions} />
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
                    <h2>ข้อมูลทรัพยากร (Pie Chart)</h2>
                    <Chart
                        chartType="PieChart"
                        data={googleChartData}
                        options={googleChartOptions}
                        width="100%"
                        height="400px"
                    />
                </div>
            </div>
        </Layer>
    );
};

export default Dashboard;

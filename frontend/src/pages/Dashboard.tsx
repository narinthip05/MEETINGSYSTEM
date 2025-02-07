import React, { useState, useEffect, useCallback } from "react";
import Layer from "../layout/layer";
import DashboardCard from "./Card";
import { Bar } from "react-chartjs-2";
import { FaHouse, FaMicrophone, FaTv, FaPeopleRoof, FaComputer } from "react-icons/fa6";
import { Chart } from "react-google-charts";
import { getAllMeetingRoom } from "../api/api.tsx";
import { Meetingroom } from "../interface/IMeetingroom.ts";

const Dashboard: React.FC = () => {
    const [detailsData, setDetailsData] = useState({
        rooms: 0,
        capacity: 0,
        microphones: 0,
        screens: 0,
        PC: 0,
    });

    const [meetingRoom, setMeetingRoom] = useState<Meetingroom[]>([]);

    const fetchMeetingRooms = useCallback(async () => {
        try {
            const response = await getAllMeetingRoom();
            if (response.status) {
                const data = response.data;
                console.log("Meeting Room Data:", data); // ✅ ตรวจสอบข้อมูลที่ได้จาก API
                setMeetingRoom(data);
                
                const roomCount = data.length;
                const microphoneCount = data.reduce((sum, room) => sum + Number(room.Microphone || 0), 0); 
                const capacityCount = data.reduce((sum, room) => sum + Number(room.Capacity || 0), 0);
                const screenCount = data.reduce((sum, room) => sum + Number(room.Screen || 0), 0);
                const pcCount = data.reduce((sum, room) => sum + Number(room.PC || 0), 0); // ✅ ใช้ Number() ป้องกันข้อผิดพลาด
    
                setDetailsData({
                    rooms: roomCount,
                    microphones: microphoneCount, 
                    capacity: capacityCount,
                    screens: screenCount,
                    PC: pcCount,
                });
            } else {
                console.error("Error fetching meeting rooms:", response.message);
            }
        } catch (error) {
            console.error("Error fetching meeting rooms:", error);
        }
    }, []);

    useEffect(() => {
        fetchMeetingRooms();
    }, [fetchMeetingRooms]);

    const getTotalPCCount = (selectedRequest: Meetingroom | null) => {
        return selectedRequest?.AdditionalRows?.length || 0;
    };

    const chartData = {
        labels: ["จำนวนห้องประชุม","ความจุ", "ไมโครโฟน", "จอ TV", "จอคอมพิวเตอร์/PC"],
        datasets: [
            {
                label: "จำนวน",
                data: [
                    detailsData.rooms, 
                    detailsData.capacity,
                    detailsData.microphones,
                    detailsData.screens,
                    detailsData.PC,
                ],
                backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD"],
            },
        ],
    };

    const googleChartData = [
        ["Resource", "Count"],
        ["ห้องประชุม", detailsData.rooms],
        ["ความจุ", detailsData.capacity],
        ["ไมโครโฟน", detailsData.microphones],
        ["จอ TY", detailsData.screens],
        ["เครื่อง PC", detailsData.PC],
    ];

    const googleChartOptions = {
        title: "ข้อมูลทรัพยากร",
        pieHole: 0.4,
        is3D: false,
    };

    return (
        <Layer>
            <h2>แดชบอร์ดอุปกรณ์ภายในห้องประชุม</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "10px", padding: "20px" }}>
                <DashboardCard title="จำนวนห้องประชุม" description={`${detailsData.rooms} ห้อง`} icon={<FaHouse />} />
                <DashboardCard title="ความจุ" description={`${detailsData.capacity} คน`} icon={<FaPeopleRoof />} />
                <DashboardCard title="ไมโครโฟน" description={`${detailsData.microphones} ตัว`} icon={<FaMicrophone />} />
                <DashboardCard title="จอ TY" description={`${detailsData.screens} ตัว`} icon={<FaTv />} />
                <DashboardCard title="PC" description={`${detailsData.PC} เครื่อง`} icon={<FaComputer />} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "16px", padding: "10px" }}>
                <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "16px", backgroundColor: "#fff" }}>
                    <Bar data={chartData} />
                </div>
                <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "16px", backgroundColor: "#fff" }}>
                    <Chart chartType="PieChart" data={googleChartData} options={googleChartOptions} width="100%" height="400px" />
                </div>
            </div>

            <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "16px", backgroundColor: "#fff", marginTop: "20px", overflowX: "auto" }}>
                <h3>รายการอุปกรณ์</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อห้องประชุม</th>
                            <th>ความจุ</th>
                            <th>ไมโครโฟน</th>
                            <th>จอ TV</th>
                            <th>จอคอมพิวเตอร์/PC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetingRoom.length > 0 ? (
                            meetingRoom.map((request, index) => (
                                <tr key={request.Roomid}>
                                    <td>{index + 1}</td>
                                    <td>{request.Roomname || '-'} </td>
                                    <td>{request.Capacity || '-'} </td>
                                    <td>{request.Microphone || '-'} </td>
                                    <td>{request.Screen || '-'} </td>
                                    <td>{getTotalPCCount(request)} </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center' }}>ไม่พบข้อมูล</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layer>
    );
};

export default Dashboard;

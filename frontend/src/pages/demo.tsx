import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaFile } from "react-icons/fa";
import Layer from "../layout/layer.tsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Demo: React.FC = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([
        { id: 1, date: "2024-01-01", name: "อเนกประสงค์", capacity: 50, microphones: 10, screens: 2, Location: "อาคาร 3 ชั้น 2", moniters: 5, pc: 5, brand: "DELL Optiplex 7020", contract: "บ.30/2558" },
        { id: 2, date: "2024-01-01", name: "ห้องประชุม 2", capacity: 30, microphones: 5, screens: 1, Location: "อาคาร 1 ชั้น 4", moniters: 12, pc: 10, brand: "DELL Optiplex 3060 ", contract: "บ.17/2562" },
    ]);

    const [searchTerm, setSearchTerm] = useState(""); // คำค้นหาที่ผู้ใช้ป้อน
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // คำค้นหาหลัง debounce

    // ใช้ useEffect สำหรับ debounce คำค้นหา
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm); // อัปเดตค่า debouncedSearchTerm หลังจาก delay
        }, 300); // หน่วงเวลา 300 มิลลิวินาที

        return () => clearTimeout(handler); // เคลียร์ timeout ถ้าคำค้นหามีการเปลี่ยนแปลง
    }, [searchTerm]);

    // ฟังก์ชันกรองข้อมูลในตาราง
    const filteredRooms = rooms.filter((room) =>
        room.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    const handleDeleteRoom = (id: number) => {
        const roomToDelete = rooms.find((room) => room.id === id);

        if (!roomToDelete) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: "ไม่พบข้อมูลห้องประชุมที่ต้องการลบ",
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
            });
            return;
        }
        Swal.fire({
            title: "ยืนยันการลบ?",
            text: `คุณต้องการลบห้อง "${roomToDelete.name}" หรือไม่?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ลบข้อมูล",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
                Swal.fire({
                    title: "ลบข้อมูลสำเร็จ!",
                    text: `ข้อมูลห้อง "${roomToDelete.name}" ถูกลบเรียบร้อยแล้ว`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        });
    };

    return (
        <Layer>
            <div style={{ fontFamily: "Arial, sans-serif" }}>
                <main style={{ marginLeft: "5px", padding: "30px 10px 40px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button className="button-add">เพิ่มข้อมูล</button>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#fff",
                                padding: "5px 10px",
                                borderRadius: "8px",
                                border: "1px solid #333",
                            }}
                        >
                            <FaSearch style={{ marginRight: "10px", color: "#333" }} />
                            <input
                                type="text"
                                placeholder="ค้นหาชื่อห้องประชุม"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    border: "none",
                                    outline: "none",
                                    flex: 1,
                                    fontSize: "16px",
                                    backgroundColor: "transparent",
                                }}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
                            gap: "16px",
                            padding: "30px",
                            alignItems: "center",
                            backgroundColor: "white",
                            borderRadius: "5px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อห้องประชุม</th>
                                    <th>ความจุ</th>
                                    <th>ไมโครโฟน</th>
                                    <th>จอทีวี</th>
                                    <th>จอคอมพิวเตอร์</th>
                                    <th>PC</th>
                                    <th>รายละเอียด</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRooms.map((room, index) => (
                                    <tr key={room.id}>
                                        <td>{index + 1}</td>
                                        <td>{room.name}</td>
                                        <td>{room.capacity}</td>
                                        <td>{room.microphones}</td>
                                        <td>{room.screens}</td>
                                        <td>{room.moniters}</td>
                                        <td>{room.pc}</td>
                                        <td>
                                            <FaFile
                                                style={{ margin: "0 10px", cursor: "pointer", color: "#007bff" }}
                                                onClick={() => navigate("details", { state: { room } })}
                                            />
                                        </td>
                                        <td>
                                            <FaEdit
                                                style={{ margin: "0 10px", cursor: "pointer", color: "#ffc107" }}
                                            />
                                            <FaTrash
                                                style={{ margin: "0 10px", cursor: "pointer", color: "#dc3545" }}
                                                onClick={() => handleDeleteRoom(room.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </Layer>
    );
};

export default Demo;

import React, { useState } from "react";
import { FaEdit, FaTrash, FaSearch, FaFile } from "react-icons/fa";
import Layer from "../layout/layer.tsx";
import Swal from "sweetalert2";
import { FormControl, FormGroup, FormLabel } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Details: React.FC = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([
        { id: 1, date: "2024-01-01", name: "อเนกประสงค์", capacity: 50, microphones: 10, screens: 2, Location: "อาคาร 3 ชั้น 2", moniters: 5, pc: 5, brand: "DELL Optiplex 7020", contract: "บ.30/2558" },
        { id: 2, date: "2024-01-01", name: "ห้องประชุม 2", capacity: 30, microphones: 5, screens: 1, Location: "อาคาร 1 ชั้น 4", moniters: 12, pc: 10, brand: "DELL Optiplex 3060 ", contract: "บ.17/2562" },
    ]);
    const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
    const [modalType, setModalType] = useState<"details" | "edit" | "add" | "confirmDelete" | null>(null);
    const [searchTerm, setSearchTerm] = useState(""); // ตัวแปรสำหรับเก็บข้อความค้นหา


    // ฟังก์ชันกรองข้อมูลในตาราง
    const filteredRooms = rooms.filter((room) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddRoom = () => {
        setSelectedRoom({
            number: rooms.length + 1,
            id: rooms.length + 1,
            name: "",
            date: "", 
        });
        setModalType("add");
    };
    const handleDeleteRoom = (id: number) => {
        const roomToDelete = rooms.find((room) => room.id === id);
        setSelectedRoom(roomToDelete); // กำหนดห้องที่ต้องการลบ

        if (!roomToDelete) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: "ไม่พบข้อมูลห้องประชุมที่ต้องการลบ",
                icon: "error",
                timer: 2000, // แสดงข้อความเพียงชั่วครู่
                showConfirmButton: false, // ไม่แสดงปุ่ม OK
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
                // ถ้าผู้ใช้กดยืนยันการลบ
                setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
                Swal.fire({
                    title: "ลบข้อมูลสำเร็จ!",
                    text: `ข้อมูลห้อง "${roomToDelete.name}" ถูกลบเรียบร้อยแล้ว`,
                    icon: "success",
                    timer: 2000, // แสดงข้อความเพียงชั่วครู่
                    showConfirmButton: false, // ไม่แสดงปุ่ม OK
                });
            }
        });
    };
    const handleShowDetails = (room: any) => {
        setSelectedRoom(room);
        setModalType("details"); // Show the details modal
    };
    const handleEditRoom = (room: any) => {
        setSelectedRoom(room);
        setModalType("edit"); // Show the edit modal
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedRoom(null);
    };
    return (
        <Layer>
            <h2>อุปกรณ์ภายในห้องประชุม</h2>
            <div style={{ fontFamily: "Arial, sans-serif" }}>
                <main style={{ marginLeft: "5px", padding: "30px 10px 40px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button className="button-add" onClick={handleAddRoom}>
                            เพิ่มข้อมูล
                        </button>
                        {/* กล่องค้นหาพร้อมไอคอน */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#fff",
                                padding: "5px 10px",
                                borderRadius: "8px",
                                border: "1px solid #333",
                                /*width: "300px",*/
                            }}
                        >
                            <FaSearch
                                style={{ marginRight: "10px", color: "#333" }} />
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
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                            gap: '16px',
                            padding: '30px',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
                                    <th>จอคอมพิวเตอร์/PC</th>
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
                                        <td>{room.pc}</td>
                                        <td>
                                            <FaFile
                                                style={{ margin: "0 10px", cursor: "pointer", color: "#007bff" }}
                                                onClick={() => handleShowDetails(room)}
                                            />
                                        </td>
                                        <td>
                                            <FaEdit
                                                style={{ margin: "0 10px", cursor: "pointer", color: "#ffc107" }}
                                                onClick={() => handleEditRoom(room)}
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
                {(modalType === "details" || modalType === "edit" || modalType === "add") && selectedRoom && (
                    <div className="modal-overlay"
                        onClick={(e) => {
                            // ตรวจสอบว่าคลิกเกิดขึ้นนอก modal-container
                            if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
                                closeModal();
                            }
                        }}
                    >
                        <div className="modal-container">
                            {/* ปุ่มกากะบาด */}
                            <button className="close-button" onClick={closeModal}>
                                ✖
                            </button>
                            <div className={`modal-header ${modalType}`}>
                                <p style={{ margin: 20 }}>
                                    {modalType === "edit"
                                        ? "แก้ไขข้อมูลอุปกรณ์ห้องประชุม"
                                        : modalType === "add"
                                            ? "เพิ่มข้อมูลอุปกรณ์ห้องประชุม"
                                            : "รายละเอียดข้อมูลอุปกรณ์ห้องประชุม"}
                                </p>
                            </div>
                            <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                                <FormGroup>
                                    <FormLabel>วันที่ :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="date"
                                            value={selectedRoom.date}
                                            readOnly={modalType === "details"} // ปิดการแก้ไขในโหมดรายละเอียด
                                            onChange={(e) =>
                                                modalType !== "details" &&
                                                setSelectedRoom({ ...selectedRoom, date: e.target.value })
                                            }
                                        />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>ชื่อห้องประชุม :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="text"
                                            value={selectedRoom.name}

                                            onChange={(e) =>

                                                setSelectedRoom({ ...selectedRoom, name: e.target.value })
                                            }
                                        />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>ที่ตั้ง :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="text"
                                            value={selectedRoom.Location}
                                            onChange={(e) =>
                                                setSelectedRoom({ ...selectedRoom, Location: e.target.value })
                                            }
                                        />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>ความจุ :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="number"
                                            value={selectedRoom.capacity}
                                            onChange={(e) =>
                                                setSelectedRoom({ ...selectedRoom, capacity: Number(e.target.value) })
                                            }
                                        />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>ไมโครโฟน :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="number"
                                            value={selectedRoom.microphones}
                                            onChange={(e) =>
                                                setSelectedRoom({ ...selectedRoom, microphones: Number(e.target.value) })
                                            }
                                        />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>จอ TV :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="number"
                                            value={selectedRoom.screens}
                                            onChange={(e) =>
                                                setSelectedRoom({ ...selectedRoom, screens: Number(e.target.value) })
                                            }
                                        />
                                    </FormControl>
                                </FormGroup>
                                <h4>อุปกรณ์จอคอมพิวเตอร์/PC</h4>
                                {selectedRoom.additionalRows?.map((row, index) => (
                                    <div key={index}>
                                        <FormGroup>
                                            <FormLabel>จอคอมพิวเตอร์/PC :</FormLabel>
                                            <FormControl>
                                                <input
                                                    className="input-field"
                                                    type="text"
                                                    value={row.pc}
                                                    onChange={(e) =>
                                                        setSelectedRoom({
                                                            ...selectedRoom,
                                                            additionalRows: selectedRoom.additionalRows.map((r, i) =>
                                                                i === index ? { ...r, pc: String(e.target.value) } : r
                                                            ),
                                                        })
                                                    }
                                                />
                                            </FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>ยี่ห้อ/รุ่น :</FormLabel>
                                            <FormControl>
                                                <input
                                                    className="input-field"
                                                    type="text"
                                                    value={row.brand}
                                                    onChange={(e) =>
                                                        setSelectedRoom({
                                                            ...selectedRoom,
                                                            additionalRows: selectedRoom.additionalRows.map((r, i) =>
                                                                i === index ? { ...r, brand: e.target.value } : r
                                                            ),
                                                        })
                                                    }
                                                />
                                            </FormControl>
                                        </FormGroup>
                                        <FormGroup >
                                            <FormLabel>เลขที่สัญญา :</FormLabel>
                                            <FormControl>
                                                <input
                                                    className="input-field"
                                                    type="text"
                                                    value={row.contract}
                                                    onChange={(e) =>
                                                        setSelectedRoom({
                                                            ...selectedRoom,
                                                            additionalRows: selectedRoom.additionalRows.map((r, i) =>
                                                                i === index ? { ...r, contract: e.target.value } : r
                                                            ),
                                                        })
                                                    }
                                                />
                                            </FormControl>
                                        </FormGroup>
                                        {/* ปุ่มลบแถว */}
                                        <div style={{marginTop: "10px"}}>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    setSelectedRoom({
                                                        ...selectedRoom,
                                                        additionalRows: selectedRoom.additionalRows.filter(
                                                            (_, i) => i !== index
                                                        ),
                                                    })
                                                }
                                            >
                                                ลบ
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {/* ปุ่มเพิ่มแถว */}
                                <div>
                                    <div className="text-end">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() =>
                                                setSelectedRoom((prev) => ({
                                                    ...prev,
                                                    additionalRows: [
                                                        ...(prev.additionalRows || []),
                                                        { pc: "", brand: "", contract: "" },

                                                    ],
                                                }))
                                            }
                                        >
                                            เพิ่ม
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="button-close" onClick={closeModal}>
                                    ปิด
                                </button>
                                {modalType !== "details" && (
                                    <button
                                        className="button-save"
                                        type="button"
                                        onClick={() => {
                                            if (modalType === "add") {
                                                // เพิ่มข้อมูลใหม่
                                                setRooms((prevRooms) => [...prevRooms, selectedRoom]);
                                                Swal.fire({
                                                    title: "เพิ่มข้อมูลสำเร็จ!",
                                                    text: `ข้อมูลห้อง "${selectedRoom.name}" ถูกเพิ่มเรียบร้อยแล้ว`,
                                                    icon: "success",
                                                    timer: 2000,
                                                    showConfirmButton: false,
                                                });
                                            } else if (modalType === "edit") {
                                                // แก้ไขข้อมูล
                                                setRooms((prevRooms) =>
                                                    prevRooms.map((room) =>
                                                        room.id === selectedRoom.id ? selectedRoom : room
                                                    )
                                                );
                                                Swal.fire({
                                                    title: "แก้ไขข้อมูลสำเร็จ!",
                                                    text: `ข้อมูลห้อง "${selectedRoom.name}" ถูกแก้ไขเรียบร้อยแล้ว`,
                                                    icon: "success",
                                                    timer: 2000,
                                                    showConfirmButton: false,
                                                });
                                            }
                                            closeModal();
                                        }}
                                    >
                                        บันทึก
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layer>
    );
};
export default Details;

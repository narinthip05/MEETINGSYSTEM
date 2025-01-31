import React, { useState } from "react";
import { FaEdit, FaTrash, FaSearch, FaFile } from "react-icons/fa";
import Layor from "../layout/layor.tsx";
import Swal from "sweetalert2";
import { FormControl, FormGroup, FormLabel } from '@mui/material';

const Management: React.FC = () => {
    const [rooms, setRooms] = useState([
        { id: 1, date: "111", roomname: "ห้องประชุม 1", Location: "อาคาร 3 ชั้น 2", name: "1111", department: "กรย.", computername: "E3NPR", machinetype: "PC", model: "dell", contractyear: "บร/2568", harddisk: "ssd", ram: "....", problemneed: "จอฟ้า", resolution: "........." },
        { id: 2, date: "111", roomname: "ห้องประชุม 2", Location: "อาคาร 3 ชั้น 2", name: "narinthip", department: "บช.", computername: "E3NPR", machinetype: "Printer", model: "Samsung", contractyear: "บร/2568", harddisk: "ssd", ram: "....", problemneed: "จอมืด", resolution: "........." },
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
            roomname: "",
            date: "", // ฟิลด์ใหม่
            department: "",
            computername: "",
            machinetype: "",
            model: "",
            contractyear: "",
            harddisk: "",
            ram: "",
            problemNeed: "",
            resolution: "",

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
        <Layor>
            <h2>อุปกรณ์แจ้งซ่อม</h2>
            <div style={{ fontFamily: "Arial, sans-serif" }}>
                <main style={{ marginLeft: "10px", padding: "10px 10px 10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button className="button-add" onClick={handleAddRoom}>
                            เพิ่มข้อมูล
                        </button>
                        <div
                        >
                            <input
                                type="text"
                                placeholder="ค้นหาชื่อผู้ใช้งาน"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <button className="search-btn">ค้นหา</button>
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
                                    <th>ชื่อผู้ใช้/รหัสพนักงาน</th>
                                    <th>แผนก</th>
                                    <th>ชื่อคอมพิวเตอร์</th>
                                    <th>ประเภทเครื่อง</th>
                                    <th>รุ่น</th>
                                    <th>เลขที่สัญญา</th>
                                    <th>รายละเอียด</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRooms.map((room, index) => (
                                    <tr key={room.id}>
                                        <td>{index + 1}</td>
                                        <td>{room.roomname}</td>
                                        <td>{room.name}</td>
                                        <td>{room.department}</td>
                                        <td>{room.computername}</td>
                                        <td>{room.machinetype}</td>
                                        <td>{room.model}</td>
                                        <td>{room.contractyear}</td>
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
                        <div className="modal-container-d">
                            {/* ปุ่มกากะบาด */}
                            <button className="close-button" onClick={closeModal}>
                                ✖
                            </button>
                            <div className={`modal-header ${modalType}`}>
                                <h3>
                                    {modalType === "edit"
                                        ? "แก้ไขข้อมูลการแจ้งซ่อม"
                                        : modalType === "add"
                                            ? "เพิ่มข้อมูลการแจ้งซ่อม"
                                            : "รายละเอียดข้อมูลแจ้งซ่อม"}
                                </h3>
                            </div>
                            <div className="modal-body">
                                <FormGroup className="mb-3">
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
                                <FormGroup className="mb-3">
                                    <FormLabel>ชื่อห้องประชุม :</FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRoom.roomname}
                                        onChange={(e) =>
                                            setSelectedRoom({ ...selectedRoom, roomname: e.target.value })
                                        }
                                    /></FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ที่ตั้ง :</FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRoom.Location}
                                        onChange={(e) =>
                                            setSelectedRoom({ ...selectedRoom, Location: e.target.value })
                                        }
                                    /></FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ชื่อผู้ใช้/รหัสพนักงาน :</FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRoom.name}
                                        onChange={(e) =>
                                            setSelectedRoom({ ...selectedRoom, name: e.target.value })
                                        }
                                    /></FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>แผนก : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRoom.department}
                                        onChange={(e) =>
                                            setSelectedRoom({ ...selectedRoom, department: e.target.value }) // แก้ไขจาก depertment เป็น department
                                        }
                                    /></FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ชื่อคอมพิวเตอร์ : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRoom.computername}
                                        onChange={(e) =>
                                            setSelectedRoom({ ...selectedRoom, computername: e.target.value })
                                        }
                                    /></FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ประเภทเครื่อง : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRoom.machinetype}
                                        onChange={(e) =>
                                            setSelectedRoom({ ...selectedRoom, machinetype: e.target.value })
                                        }
                                    /></FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>รุ่น : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRoom.model}
                                        onChange={(e) =>
                                            setSelectedRoom({ ...selectedRoom, model: e.target.value })
                                        }
                                    /></FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>เลขที่สัญญา : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRoom.contractyear}
                                        onChange={(e) =>
                                            setSelectedRoom({ ...selectedRoom, contractyear: e.target.value })
                                        }
                                    /></FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ฮาร์ดดิส (Hard disk) : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRoom.harddisk}
                                        onChange={(e) =>
                                            setSelectedRoom({ ...selectedRoom, harddisk: e.target.value })
                                        }
                                    /></FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>แรม (RAM) : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRoom.ram}
                                        onChange={(e) =>
                                            setSelectedRoom({ ...selectedRoom, ram: e.target.value })
                                        }
                                    /></FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ปัญหา/ความต้องการ : </FormLabel>
                                    <textarea
                                        className="input-field"
                                        value={selectedRoom.problemneed}
                                        onChange={(e) =>
                                            setSelectedRoom({ ...selectedRoom, problemneed: e.target.value })
                                        }
                                    />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>วิธีการแก้ไข : </FormLabel>
                                    <textarea
                                        className="input-field"
                                        value={selectedRoom.resolution}
                                        onChange={(e) =>
                                            setSelectedRoom({ ...selectedRoom, resolution: e.target.value })
                                        }
                                    />
                                </FormGroup>
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
        </Layor>
    );
};

export default Management;

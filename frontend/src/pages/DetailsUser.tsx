import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaFile } from "react-icons/fa";
import Layoutb from "../layout/layoutB";
import Swal from "sweetalert2";
import { FormControl, FormGroup, FormLabel } from "@mui/material";
import { getAllMeetingRoom } from "../api/api.tsx";
import { Meetingroom } from "../interface/IMeetingroom.ts";

const DetailsUser: React.FC = () => {
    const [meetingRoom, setMeetingRoom] = useState<Meetingroom[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<Meetingroom | null>(null);
    const [modalType, setModalType] = useState<"details" | "edit" | "add" | "confirmDelete" | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    type AdditionalRow = {
        Pc: string;
        Brand: string;
        Contract: string;
    };
    const handleInputChange = (index: number, field: keyof AdditionalRow, value: string) => {
        setSelectedRequest((prev) => {
            if (!prev) return prev; // ป้องกัน null หรือ undefined
            const updatedRows = prev.AdditionalRows.map((row, i) =>
                i === index ? { ...row, [field]: value } : row
            );
            return { ...prev, AdditionalRows: updatedRows };
        });
    };


    // ✅ ฟังก์ชันเพิ่มข้อมูล
    const handleAddAdditionalRow = () => {
        setSelectedRequest((prev) => {
            if (!prev) return prev;
            const newRow = { Pc: "", Brand: "", Contract: "" };
            return { ...prev, AdditionalRows: [...prev.AdditionalRows, newRow] };
        });
    };

    // ✅ ฟังก์ชันคำนวณจำนวนเครื่อง
    const getTotalPCCount = () => selectedRequest?.AdditionalRows.length || 0;
    // ✅ ฟังก์ชันคำนวณจำนวนรายการที่สมบูรณ์ (ที่มีค่าครบทุกช่อง)
    const getCompleteItemCount = () => {
        return selectedRequest?.AdditionalRows.filter(
            (row) => row.Pc.trim() && row.Brand.trim() && row.Contract.trim()
        ).length || 0;
    };

    useEffect(() => {
        getAllMeetingRoom()
            .then((data) => {
                if (Array.isArray(data)) {
                    setMeetingRoom(data);
                } else {
                    console.error("Data is not an array");
                    setMeetingRoom([]);
                }
            })
            .catch((error) => {
                console.error("Error loading meeting rooms:", error);
                setMeetingRoom([]);
            });
    }, []);

    // ✅ Correct filtering logic
    const filteredRequests = meetingRoom.filter((request) =>
        request.Roomname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.Location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ✅ Correct pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleAddRequest = () => {
        setSelectedRequest({
            Roomid: meetingRoom.length + 1,
            Roomdate: new Date().toISOString().split("T")[0],
            Roomname: "",
            Location: "",
            Capacity: 0,
            Microphone: 0,
            Screen: 0,
            AdditionalRows: [{ Pc: "", Brand: "", Contract: "" }], // ✅ ใช้งานได้แล้ว
        });

        setModalType("add");
    };



    // ✅ Fixed delete function
    const handleDeleteRequest = (id: number) => {
        const requestToDelete = meetingRoom.find((request) => request.Roomid === id);
        setSelectedRequest(requestToDelete || null);

        if (!requestToDelete) {
            Swal.fire("เกิดข้อผิดพลาด", "ไม่พบข้อมูลอุปกรณ์ที่ต้องการลบ", "error");
            return;
        }
        Swal.fire({
            title: "ยืนยันการลบ?",
            text: `คุณต้องการลบรายการอุปกรณ์ห้องประชุม ${requestToDelete.Roomname} หรือไม่?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ลบข้อมูล",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                setMeetingRoom(meetingRoom.filter((request) => request.Roomid !== id));
                Swal.fire("ลบข้อมูลสำเร็จ!", "ข้อมูลถูกลบเรียบร้อยแล้ว", "success");
            }
        });
    };

    const handleShowDetails = (room: any) => {
        setSelectedRequest(room);
        setModalType("details"); // Show the details modal
    };
    const handleEditRequest = (room) => {
        setSelectedRequest({ ...room, additionalRows: room.additionalRows || [] });
        setModalType("edit");
    };
    const closeModal = () => {
        setModalType(null);
        setSelectedRequest(null);
    };

    return (
        <Layoutb>
            <h2>อุปกรณ์ภายในห้องประชุม</h2>
            <div style={{ fontFamily: "Arial, sans-serif" }}>
                <main style={{ marginLeft: "20px", padding: "10px 10px 10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button className="button-add" onClick={handleAddRequest}>
                            เพิ่มข้อมูล
                        </button>
                        <div
                        >
                            <div>
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
                        {/* ปุ่มค้นหา */}

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
                                {filteredRequests.length > 0 ? (
                                    filteredRequests.map((request, index) => (
                                        <tr key={request.Roomid}>
                                            <td>{index + 1}</td>
                                            <td>{request.Roomname || '-'}</td>
                                            <td>{request.Capacity || '-'}</td>
                                            <td>{request.Microphone || '-'}</td>
                                            <td>{request.Screen || '-'}</td>

                                            {/* ✅ จำนวนจอคอมพิวเตอร์/PC */}
                                            <td>{request.AdditionalRows?.length || 0}</td>
                                            <td>

                                                <FaFile
                                                    style={{ margin: "0 10px", cursor: "pointer", color: "#007bff" }}
                                                    onClick={() => handleShowDetails(request)}
                                                />
                                            </td>
                                            <td>
                                                <FaEdit
                                                    style={{ margin: "0 10px", cursor: "pointer", color: "#ffc107" }}
                                                    onClick={() => handleEditRequest(request)}
                                                />
                                                <FaTrash
                                                    style={{ margin: "0 10px", cursor: "pointer", color: "#dc3545" }}
                                                    onClick={() => handleDeleteRequest(request.Roomid)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: 'center' }}>
                                            ไม่พบข้อมูล
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
                            disabled={currentPage === 1}
                        >
                            ก่อนหน้า
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`page-btn ${currentPage === totalPages ? "disabled" : ""}`}
                            disabled={currentPage === totalPages}
                        >
                            ถัดไป
                        </button>
                    </div>
                </main>
                {/* Model หน้ารายละเอียด */}
                {modalType === "details" && selectedRequest && (
                    <div className="modal-overlay" onClick={(e) => {
                        if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
                            closeModal();
                        }
                    }}>
                        <div
                            className="modal-container"
                            style={{
                                maxHeight: "80vh",
                                overflowY: "auto",
                                padding: "20px", // ✅ เพิ่ม padding ไม่ให้ติดขอบ
                                textAlign: "left"
                            }}
                        >
                            <button className="close-button" onClick={closeModal}>✖</button>
                            <h2 style={{ textAlign: "center" }}>รายละเอียดห้องประชุม</h2> {/* ✅ ให้หัวข้ออยู่ตรงกลาง */}
                            <p><strong>ชื่อห้องประชุม:</strong> {selectedRequest.Roomname}</p>
                            <p><strong>ความจุ:</strong> {selectedRequest.Capacity} คน</p>
                            <p><strong>ไมโครโฟน:</strong> {selectedRequest.Microphone} ตัว</p>
                            <p><strong>จอทีวี:</strong> {selectedRequest.Screen} จอ</p>
                            <p><strong>จำนวนจอคอมพิวเตอร์ / PC:</strong> {selectedRequest.AdditionalRows?.length || 0} เครื่อง</p>


                            {selectedRequest.AdditionalRows?.length > 0 ? (
                                <ul style={{ paddingLeft: "20px", paddingRight: "20px" }}> {/* ✅ กำหนด padding ไม่ให้ติดขอบ */}
                                    {selectedRequest.AdditionalRows.map((row, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                gap: "15px", // ✅ เว้นระยะห่างระหว่างข้อมูล
                                                padding: "10px 0", // ✅ เพิ่มช่องว่างแต่ละแถว
                                                borderBottom: "1px solid #ddd" // ✅ เพิ่มเส้นคั่นให้ดูเป็นระเบียบ
                                            }}
                                        >
                                            <td>{index + 1}</td>
                                            <span><strong>จอคอมพิวเตอร์/PC:</strong> {row.Pc || "-"}</span>
                                            <span><strong>ยี่ห้อ/รุ่น:</strong> {row.Brand || "-"}</span>
                                            <span><strong>เลขที่สัญญา:</strong> {row.Contract || "-"}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ textAlign: "center" }}>ไม่มีข้อมูลจอคอมพิวเตอร์ / PC</p>
                            )}

                            <button onClick={closeModal} style={{ display: "block", margin: "20px auto", backgroundColor: "#ccc" }}>ปิด</button> {/* ✅ ปุ่มปิดอยู่ตรงกลาง */}
                        </div>
                    </div>
                )}
                {(modalType === "edit" || modalType === "add") && setSelectedRequest && (
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
                            <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                                <FormGroup className="mb-3">
                                    <FormLabel>วันที่ :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="date"
                                            value={selectedRequest?.Roomdate || ""}
                                            onChange={(e) => {
                                                if (selectedRequest) {
                                                    setSelectedRequest({ ...selectedRequest, Roomdate: e.target.value });
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel>ชื่อห้องประชุม :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="text"
                                            placeholder="กรอกชื่อห้อง"
                                            value={selectedRequest?.Roomname || ""}
                                            onChange={(e) => {
                                                if (selectedRequest) {
                                                    setSelectedRequest({ ...selectedRequest, Roomname: e.target.value });
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel>ที่ตั้ง :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="text"
                                            placeholder="กรอกที่ตั้ง"
                                            value={selectedRequest?.Location || ""}
                                            onChange={(e) => {
                                                if (selectedRequest) {
                                                    setSelectedRequest({ ...selectedRequest, Location: e.target.value });
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel>ความจุ :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="number"
                                            placeholder="จำนวน"
                                            value={selectedRequest?.Capacity || 0}
                                            onChange={(e) => {
                                                if (selectedRequest) {
                                                    setSelectedRequest({ ...selectedRequest, Capacity: Number(e.target.value) });
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel>ไมโครโฟน :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="number"
                                            placeholder="จำนวนไมโครโฟน"
                                            value={selectedRequest?.Microphone || 0}
                                            onChange={(e) => {
                                                if (selectedRequest) {
                                                    setSelectedRequest({ ...selectedRequest, Microphone: Number(e.target.value) });
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel>จอ TV :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="number"
                                            placeholder="จำนวนจอ TV"
                                            value={selectedRequest?.Screen || 0}
                                            onChange={(e) => {
                                                if (selectedRequest) {
                                                    setSelectedRequest({ ...selectedRequest, Screen: Number(e.target.value) });
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormGroup>

                                {/* ✅ แสดงจำนวนเครื่อง */}
                                <p>จำนวนจอคอมพิวเตอร์ / PC ทั้งหมด: {getTotalPCCount()} เครื่อง</p>
                                {/* ✅ แสดงรายการ PC/จอคอมพิวเตอร์ */}
                                {selectedRequest?.AdditionalRows?.map((row, index) => (
                                    <div key={index}>
                                        <FormGroup>
                                            <FormLabel>จอคอมพิวเตอร์/PC :</FormLabel>
                                            <FormControl>
                                                <input
                                                    className="input-field"
                                                    type="text"
                                                    value={row.Pc || ""}
                                                    onChange={(e) => handleInputChange(index, "Pc", e.target.value)}
                                                />
                                            </FormControl>
                                        </FormGroup>

                                        <FormGroup>
                                            <FormLabel>ยี่ห้อ/รุ่น :</FormLabel>
                                            <FormControl>
                                                <input
                                                    className="input-field"
                                                    type="text"
                                                    value={row.Brand || ""}
                                                    onChange={(e) => handleInputChange(index, "Brand", e.target.value)}
                                                />
                                            </FormControl>
                                        </FormGroup>

                                        <FormGroup>
                                            <FormLabel>เลขที่สัญญา :</FormLabel>
                                            <FormControl>
                                                <input
                                                    className="input-field"
                                                    type="text"
                                                    value={row.Contract || ""}
                                                    onChange={(e) => handleInputChange(index, "Contract", e.target.value)}
                                                />
                                            </FormControl>
                                        </FormGroup>

                                        {/* ปุ่มลบแถว */}
                                        <div style={{ marginTop: "10px" }}>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    setSelectedRequest({
                                                        ...selectedRequest,
                                                        AdditionalRows: selectedRequest.AdditionalRows.filter((_, i) => i !== index),
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
                                            className="btnbtn"
                                            onClick={() =>
                                                setSelectedRequest((prev) => ({
                                                    ...((prev as Meetingroom) ?? {}), // บังคับให้ prev เป็น Meetingroom
                                                    AdditionalRows: [
                                                        ...(prev?.AdditionalRows ?? []),
                                                        { Pc: "", Brand: "", Contract: "" }
                                                    ]
                                                }))
                                            }
                                        >
                                            เพิ่ม
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="button-close" onClick={closeModal}>ปิด</button>
                                {selectedRequest && (
                                    <button
                                        className="button-save"
                                        type="button"
                                        onClick={() => {
                                            if (modalType === "add") {
                                                setMeetingRoom((prevRequests) => [
                                                    ...prevRequests,
                                                    { ...selectedRequest } // ✅ ป้องกัน null
                                                ]);
                                                Swal.fire({
                                                    title: "เพิ่มข้อมูลสำเร็จ!",
                                                    text: `ข้อมูลห้อง "${selectedRequest.Roomname}" ถูกเพิ่มเรียบร้อยแล้ว`,
                                                    icon: "success",
                                                    timer: 2000,
                                                    showConfirmButton: false,
                                                });

                                            } else if (modalType === "edit") {
                                                setMeetingRoom((prevRequests) =>
                                                    prevRequests.map((request) =>
                                                        request.Roomid === selectedRequest.Roomid ? { ...selectedRequest } : request
                                                    )
                                                );
                                                Swal.fire({
                                                    title: "แก้ไขข้อมูลสำเร็จ!",
                                                    text: `ข้อมูลห้อง "${selectedRequest.Roomname}" ถูกแก้ไขเรียบร้อยแล้ว`,
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
        </Layoutb>
    );
};
export default DetailsUser;

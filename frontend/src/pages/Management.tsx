import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaFile } from "react-icons/fa";
import Layor from "../layout/layor.tsx";
import Swal from "sweetalert2";
import { FormControl, FormGroup, FormLabel } from '@mui/material';
import { getAllRepairRequest } from "../api/api.tsx"; // ตรวจสอบเส้นทางให้ถูกต้อง
import { Repairrequests } from "../interface/IRepairrequests.ts"


const Management: React.FC = () => {
    const [repairRequests, setRepairRequests] = useState<Repairrequests[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<Repairrequests | null>(null);
    const [modalType, setModalType] = useState<"details" | "edit" | "add" | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // แสดงข้อมูล 10 แถวต่อหน้า

    useEffect(() => {
        getAllRepairRequest()
            .then((data) => {
                if (Array.isArray(data)) {
                    setRepairRequests(data);
                } else {
                    console.error("Data is not an array");
                    setRepairRequests([]);
                }
            })
            .catch((error) => {
                console.error("Error loading repair requests:", error);
                setRepairRequests([]);
            });
    }, []);

    const filteredRequests = repairRequests.filter((request) =>
        request.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.Roomname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.Machinename.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // คำนวณช่วงข้อมูลที่ต้องแสดงในหน้าปัจจุบัน
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    const handleAddRequest = () => {
        setSelectedRequest({
            Requestid: repairRequests.length + 1,
            Requestdate: new Date().toISOString().split("T")[0],
            Roomname: "",
            Location: "",
            Username: "",
            Machinename: "",
            Equipmenttype: "",
            Model: "",
            Contractyear: "",
            Harddisk: "",
            Ram: "",
            Problemneed: "",
            Resolution: "",
        });
        setModalType("add");
    };

    const handleDeleteRequest = (id: number) => {
        const requestToDelete = repairRequests.find((request) => request.Requestid === id);
        setSelectedRequest(requestToDelete || null);

        if (!requestToDelete) {
            Swal.fire("เกิดข้อผิดพลาด", "ไม่พบข้อมูลแจ้งซ่อมที่ต้องการลบ", "error");
            return;
        }
        Swal.fire({
            title: "ยืนยันการลบ?",
            text: `คุณต้องการลบรายการแจ้งซ่อมของ ${requestToDelete.Username} หรือไม่?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ลบข้อมูล",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                setRepairRequests(repairRequests.filter((request) => request.Requestid !== id));
                Swal.fire("ลบข้อมูลสำเร็จ!", "ข้อมูลถูกลบเรียบร้อยแล้ว", "success");
            }
        });
    };

    const handleShowDetails = (request: Repairrequests) => {
        setSelectedRequest(request);
        setModalType("details");
    };

    const handleEditRequest = (request: Repairrequests) => {
        setSelectedRequest(request);
        setModalType("edit");
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedRequest(null);
    };

    return (
        <Layor>
            <h2>อุปกรณ์แจ้งซ่อม</h2>
            <div style={{ fontFamily: "Arial, sans-serif" }}>
                <main style={{ marginLeft: "10px", padding: "10px 10px 10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button className="button-add" onClick={handleAddRequest}>
                            เพิ่มข้อมูล
                        </button>
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
                                    <th>ชื่อคอมพิวเตอร์</th>
                                    <th>ประเภทเครื่อง</th>
                                    <th>รุ่น</th>
                                    <th>เลขที่สัญญา</th>
                                    <th>รายละเอียด</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.length > 0 ? (
                                    filteredRequests.map((request, index) => (
                                        <tr key={request.Requestid}>
                                            <td>{index + 1}</td>
                                            <td>{request.Roomname || '-'}</td>
                                            <td>{request.Username || '-'}</td>
                                            <td>{request.Machinename || '-'}</td>
                                            <td>{request.Equipmenttype || '-'}</td>
                                            <td>{request.Model || '-'}</td>
                                            <td>{request.Contractyear || '-'}</td>
                                            <td>
                                                <FaFile
                                                    style={{ margin: "0 10px", cursor: "pointer", color: "#007bff" }}
                                                    onClick={() => handleShowDetails(request)} />
                                            </td>
                                            <td>
                                                <FaEdit
                                                    style={{ margin: "0 10px", cursor: "pointer", color: "#ffc107" }}
                                                    onClick={() => handleEditRequest(request)} />
                                                <FaTrash
                                                    style={{ margin: "0 10px", cursor: "pointer", color: "#dc3545" }}
                                                    onClick={() => handleDeleteRequest(request.Requestid)} />
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
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
                                disabled={currentPage === 1}
                            >
                                ก่อนหน้า
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className={`page-btn ${currentPage === totalPages ? "disabled" : ""}`}
                                disabled={currentPage === totalPages}
                            >
                                ถัดไป
                            </button>
                        </div>
                </main>
                {(modalType === "details" || modalType === "edit" || modalType === "add") && selectedRequest && (
                    <div className="modal-overlay" onClick={(e) => {
                        if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
                            closeModal();
                        }
                    }}>
                        <div className="modal-container-d">
                            <button className="close-button" onClick={closeModal}>✖</button>
                            <div className={`modal-header ${modalType}`}>
                                <h3>
                                    {modalType === "edit" ? "แก้ไขข้อมูลการแจ้งซ่อม" :
                                        modalType === "add" ? "เพิ่มข้อมูลการแจ้งซ่อม" : "รายละเอียดข้อมูลแจ้งซ่อม"}
                                </h3>
                            </div>
                            <div className="modal-body">
                                <FormGroup className="mb-3">
                                    <FormLabel>วันที่ :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="date"
                                            value={selectedRequest?.Requestdate}
                                            readOnly={modalType === "details"}
                                            onChange={(e) => modalType !== "details" && setSelectedRequest({
                                                ...selectedRequest, Requestdate: e.target.value
                                            })}
                                        />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ชื่อห้องประชุม :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="text"
                                            value={selectedRequest?.Roomname}
                                            readOnly={modalType === "details"}
                                            onChange={(e) => modalType !== "details" && setSelectedRequest({
                                                ...selectedRequest, Roomname: e.target.value
                                            })}
                                        />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ที่ตั้ง :</FormLabel>
                                    <FormControl>
                                        <input
                                            className="input-field"
                                            type="text"
                                            value={selectedRequest?.Location}
                                            readOnly={modalType === "details"}
                                            onChange={(e) => modalType !== "details" && setSelectedRequest({
                                                ...selectedRequest, Location: e.target.value
                                            })}
                                        />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ชื่อผู้ใช้/รหัสพนักงาน :</FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRequest?.Username}
                                        onChange={(e) => modalType !== "details" && setSelectedRequest({
                                            ...selectedRequest, Username: e.target.value
                                        })}
                                    />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ชื่อคอมพิวเตอร์ : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRequest?.Machinename}
                                        onChange={(e) => modalType !== "details" && setSelectedRequest({
                                            ...selectedRequest, Machinename: e.target.value
                                        })}
                                    />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ประเภทเครื่อง : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRequest?.Equipmenttype}
                                        onChange={(e) => modalType !== "details" && setSelectedRequest({
                                            ...selectedRequest, Equipmenttype: e.target.value
                                        })}
                                    />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>รุ่น : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRequest?.Model}
                                        onChange={(e) => modalType !== "details" && setSelectedRequest({
                                            ...selectedRequest, Model: e.target.value
                                        })}
                                    />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>เลขที่สัญญา : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRequest?.Contractyear}
                                        onChange={(e) => modalType !== "details" && setSelectedRequest({
                                            ...selectedRequest, Contractyear: e.target.value
                                        })}
                                    />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ฮาร์ดดิส (Hard disk) : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRequest?.Harddisk}
                                        onChange={(e) => modalType !== "details" && setSelectedRequest({
                                            ...selectedRequest, Harddisk: e.target.value
                                        })}
                                    />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>แรม (RAM) : </FormLabel>
                                    <FormControl><input
                                        className="input-field"
                                        type="text"
                                        value={selectedRequest?.Ram}
                                        onChange={(e) => modalType !== "details" && setSelectedRequest({
                                            ...selectedRequest, Ram: e.target.value
                                        })}
                                    />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>ปัญหา/ความต้องการ : </FormLabel>
                                    <textarea
                                        className="input-field"
                                        value={selectedRequest?.Problemneed}
                                        onChange={(e) => modalType !== "details" && setSelectedRequest({
                                            ...selectedRequest, Problemneed: e.target.value
                                        })}
                                    />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>วิธีการแก้ไข : </FormLabel>
                                    <textarea
                                        className="input-field"
                                        value={selectedRequest?.Resolution}
                                        onChange={(e) => modalType !== "details" && setSelectedRequest({
                                            ...selectedRequest, Resolution: e.target.value
                                        })}
                                    />
                                </FormGroup>
                            </div>
                            <div className="modal-footer">
                                <button className="button-close" onClick={closeModal}>ปิด</button>
                                {modalType !== "details" && (
                                    <button
                                        className="button-save"
                                        type="button"
                                        onClick={() => {
                                            if (modalType === "add") {
                                                setRepairRequests((prevRequests) => [...prevRequests, selectedRequest]);
                                                Swal.fire({
                                                    title: "เพิ่มข้อมูลสำเร็จ!",
                                                    text: `ข้อมูลห้อง "${selectedRequest?.Roomname}" ถูกเพิ่มเรียบร้อยแล้ว`,
                                                    icon: "success",
                                                    timer: 2000,
                                                    showConfirmButton: false,
                                                });
                                            } else if (modalType === "edit") {
                                                setRepairRequests((prevRequests) =>
                                                    prevRequests.map((request) =>
                                                        request.Requestid === selectedRequest?.Requestid ? selectedRequest : request
                                                    )
                                                );
                                                Swal.fire({
                                                    title: "แก้ไขข้อมูลสำเร็จ!",
                                                    text: `ข้อมูลห้อง "${selectedRequest?.Roomname}" ถูกแก้ไขเรียบร้อยแล้ว`,
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

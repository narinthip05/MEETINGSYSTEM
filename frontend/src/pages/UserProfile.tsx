import React, { useState } from "react";
import { FaEdit, FaTrash, FaFileAlt } from "react-icons/fa";
import Layout from "../layout/layout"; // นำเข้า Layout (ตรวจสอบเส้นทาง)
import Swal from "sweetalert2";


interface User {
    id: number;
    userid: string;
    username: string;
    password: string;
    role: string;
}

const UserProfile: React.FC = () => {
    const [users, setUsers] = useState<User[]>([
        { id: 1, userid: "101", username: "ชฎาพร ก่ำพิมาย", password: "1234", role: "Admin" },
        { id: 2, userid: "102", username: "นรินทร์ทิพย์ พระทอง", password: "1234", role: "User" },
        // เพิ่มข้อมูลที่คุณต้องการ...
    ]);

    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isViewOnly, setIsViewOnly] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [role, setRole] = useState(currentUser?.role || "User"); // ควบคุม state ของ role

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10; // จำนวนแถวที่จะแสดงต่อหน้า

    // ฟังก์ชันเปิด Modal
    const openModal = (user?: User, mode: "view" | "edit" | "add" = "edit") => {
        setCurrentUser(user ?? { id: 0, userid: "", username: "", password: "", role: "User" });
        setRole(user?.role || "User"); // ตั้งค่าของ role เมื่อเปิด Modal
        setIsEditing(mode === "edit");
        setIsViewOnly(mode === "view");
        setIsModalOpen(true);
    };

    // ฟังก์ชันปิด Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentUser(null);
    };

    // ฟังก์ชันเพิ่ม/แก้ไขข้อมูลผู้ใช้งาน
    const handleSaveUser = (user: User) => {
        if (isEditing && currentUser) {
            setUsers(users.map((u) => (u.id === currentUser.id ? user : u)));
            Swal.fire("แก้ไขข้อมูลสำเร็จ!", "ข้อมูลผู้ใช้งานถูกแก้ไขเรียบร้อยแล้ว", "success");
        } else {
            setUsers([...users, { ...user, id: users.length + 1 }]);
            Swal.fire("เพิ่มข้อมูลสำเร็จ!", "ข้อมูลผู้ใช้งานถูกเพิ่มเรียบร้อยแล้ว", "success");
        }
        closeModal();
    };

    // ฟังก์ชันกรองข้อมูลตามคำค้นหา
    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    // คำนวณข้อมูลที่จะต้องแสดงในแต่ละหน้า
    const indexOfLastUser = currentPage * rowsPerPage;
    const indexOfFirstUser = indexOfLastUser - rowsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // การคำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteUser = (id: number) => {
        const userToDelete = users.find((user) => user.id === id);

        Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: `คุณต้องการลบผู้ใช้งาน "${userToDelete?.username}" หรือไม่?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ใช่",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                setUsers(users.filter((user) => user.id !== id));
                Swal.fire("ลบสำเร็จ!", "ข้อมูลผู้ใช้งานถูกลบเรียบร้อยแล้ว", "success");
            }
        });
    };

    return (
        <Layout>
            <h2>ข้อมูลผู้ใช้งาน</h2>
            <div className="user-profile">
                <div className="header-actions">
                    <button className="btn btn-success" onClick={() => openModal(undefined, "add")}>
                        เพิ่มข้อมูล
                    </button>
                    <input
                        type="text"
                        placeholder="ค้นหาชื่อผู้ใช้งาน"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รหัสผู้ใช้งาน</th>
                                <th>ชื่อผู้ใช้งาน</th>
                                <th>รหัสผ่าน</th>
                                <th>ตำแหน่ง</th>
                                <th>รายละเอียด</th>
                                <th>การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.userid}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-info"
                                            onClick={() => openModal(user, "view")}
                                        >
                                            <FaFileAlt />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => openModal(user, "edit")}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
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
                {isModalOpen && currentUser && (
                    <div className="modal" onClick={(e) => {
                        // ตรวจสอบว่าคลิกเกิดขึ้นนอก modal-container
                        if ((e.target as HTMLElement).classList.contains("modal")) {
                            closeModal();
                        }
                    }}
                >

                        <div className="modal-content">
                            <h2>
                                {isViewOnly
                                    ? "รายละเอียดผู้ใช้งาน"
                                    : isEditing
                                        ? "แก้ไขข้อมูลผู้ใช้งาน"
                                        : "เพิ่มข้อมูลผู้ใช้งาน"}
                            </h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!isViewOnly) {
                                        const form = e.target as HTMLFormElement;
                                        const username = form.username.value.trim();
                                        const password = form.password.value.trim();

                                        if (username && password && role) {
                                            handleSaveUser({
                                                id: currentUser.id,
                                                userid: String(users.length + 101), // สร้าง user_id ที่ไม่ซ้ำกันสำหรับผู้ใช้ใหม่
                                                username,
                                                password,
                                                role,  // ส่งค่า role ที่เลือกมา
                                            });
                                        }
                                    }
                                }}
                            >
                                <div>
                                    <label>รหัสผู้ใช้งาน:</label>
                                    <input
                                        type="text"
                                        name="user_id"
                                        defaultValue={currentUser.userid}
                                        readOnly={isViewOnly}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>ชื่อผู้ใช้งาน:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        defaultValue={currentUser.username}
                                        readOnly={isViewOnly}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>รหัสผ่าน:</label>
                                    <input
                                        type="text"
                                        name="password"
                                        defaultValue={currentUser.password}
                                        readOnly={isViewOnly}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>ตำแหน่ง:</label>
                                    <select
                                        name="role"
                                        value={role}  // ใช้ value แทน defaultValue
                                        onChange={(e) => setRole(e.target.value)}  // ควบคุมการเลือกค่า
                                        disabled={isViewOnly}
                                        required
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                    </select>
                                </div>
                                {!isViewOnly && (
                                    <button type="submit" className="btn btn-primary">
                                        บันทึก
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    {isViewOnly ? "ปิด" : "ยกเลิก"}
                                </button>
                            </form>
                        </div>
                    </div>

                )}
            </div>
        </Layout>
    );
};

export default UserProfile;

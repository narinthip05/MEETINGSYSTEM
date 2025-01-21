import React, { useState } from 'react';
import '../css/style.css';
import { Link } from 'react-router-dom'; // ใช้ Link สำหรับการนำทาง
import { FaTachometerAlt, FaDatabase, FaSignOutAlt, FaHome, FaUser } from 'react-icons/fa'; // เพิ่มไอคอน Home
import Swal from 'sweetalert2';


interface LayoutProps {
    children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    const handleLogout = () => {
        Swal.fire({
            title: "ยืนยันการออกจากระบบ?",
            text: "คุณต้องการออกจากระบบหรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ออกจากระบบ",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                // ดำเนินการ Logout
                Swal.fire({
                    title: "ออกจากระบบสำเร็จ!",
                    text: "คุณได้ออกจากระบบเรียบร้อยแล้ว",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => {
                    // นำทางไปยังหน้า Login
                    window.location.href = "/login";
                });
            }
        });
    };
    return (
        <div className='layout-container'>
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <img src="src/assets/PEALogo.png" alt="Logo" className="logo" />
                </div>
                <Link
                    to="/home" // ลิ้งไปหน้า Home
                    className={`sidebar-button ${location.pathname === "/home" ? "active" : ""}`}
                >
                    <FaHome className="icon" /> หน้าแรก
                </Link>
                <Link
                    to="/user-profile" // ลิ้งไปหน้า User Profile
                    className={`sidebar-button ${location.pathname === "/user-profile" ? "active" : ""}`}
                >
                    <FaUser className="icon" /> ข้อมูลผู้ใช้งาน
                </Link>
                {/* ปุ่มออกจากระบบ */}
                <button className="sidebar-button logout-button" onClick={handleLogout}>
                    <FaSignOutAlt className="icon" /> ออกจากระบบ
                </button>
            </aside>
            {/* Main Content */}
            <div className="main-layout">
                <div className="content-header">
                    <nav className="navbar" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <div className="navbar-title">PEA การไฟฟ้าส่วนภูมิภาค เขต 3 นครราชสีมา</div>
                    </nav>
                </div>
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;

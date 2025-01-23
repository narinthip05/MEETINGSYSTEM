import React from "react";

interface DashboardCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon }) => {
    return (
        <div
            style={{
                border: "1px solid #e0e0e0", // สีเส้นขอบที่ดูเรียบ
                borderRadius: "16px", // มุมโค้งมน
                padding: "20px", // ระยะห่างภายใน
                backgroundColor: "#f9f9f9", // พื้นหลังค่อนข้างอ่อน
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)", // เงาสวยงาม
                textAlign: "center", // จัดข้อความให้กึ่งกลาง
                transition: "transform 0.3s ease, box-shadow 0.3s ease", // เพิ่มการเปลี่ยนแปลงเมื่อมีการโฮเวอร์
                cursor: "pointer", // เปลี่ยนเคอร์เซอร์ให้เหมือนคลิกได้
            }}
            // เพิ่มเอฟเฟกต์เมื่อโฮเวอร์
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 15px 30px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 10px 20px rgba(0, 0, 0, 0.1)";
            }}
        >
            <div style={{ fontSize: "3rem", marginBottom: "15px", color: "#3498db" }}>{icon}</div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#333" }}>{title}</h3>
            <p style={{ fontSize: "1rem", color: "#777", marginTop: "10px" }}>{description}</p>
        </div>
    );
};

export default DashboardCard;

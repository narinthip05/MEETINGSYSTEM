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
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
            }}
        >
            <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default DashboardCard;

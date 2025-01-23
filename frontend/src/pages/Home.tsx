import React from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "../layout/layout.tsx";
import '../css/style.css';
import { FaTools, FaLaptop } from "react-icons/fa";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="home-container">
                <h2>ยินดีต้อนรับสู่หน้าแรก</h2>
                <div className="card-container">
                    {/* อุปกรณ์ภายในห้องประชุม */}
                    <div
                        className="card"
                        onClick={() => navigate("/dashboard")} // นำทางไปหน้า Dashboard
                    >
                        <FaLaptop className="card-icon" />
                        <h3>อุปกรณ์ภายในห้องประชุม</h3>
                        <p>ดูรายการอุปกรณ์ห้องประชุม</p>
                    </div>
                {/* การแจ้งซ่อม */}
                    <div
                        className="card"
                        onClick={() => navigate("/dashboo")} // นำทางไปหน้า Dashboo
                    >
                        <FaTools className="card-icon" />
                        <h3>การแจ้งซ่อมภายในห้องประชุม</h3>
                        <p>แจ้งปัญหาที่เกิดขึ้นเกี่ยวกับอุปกรณ์</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;

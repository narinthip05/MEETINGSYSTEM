import React from 'react';

// ประเภทข้อมูลสำหรับ Card
interface CardProps {
  title:       string;
  description: string;
  icon?:       JSX.Element;
  footer?:     string;
}

const DashboardCard: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <div
      style={{
        border:          '1px solid #ddd',
        borderRadius:    '10px',
        padding:         '16px',
        backgroundColor: '#fff',
        boxShadow:       '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth:        '300px',
        height:          '100px',
        display:         'flex', // ใช้ Flexbox สำหรับจัดตำแหน่ง
        alignItems:      'center', // จัดเนื้อหาให้อยู่ตรงกลางแนวตั้ง
        gap:             '20px', // เพิ่มระยะห่างระหว่างไอคอนและข้อความ
      }}
    >
      {/* ไอคอน */}
      {icon && (
        <div style={{ fontSize: '2rem', color: '#007BFF' }}>
          {icon}
        </div>
      )}

      {/* ข้อความ */}
      <div style={{ textAlign: 'left' }}>
        <h3 style={{ margin: '0', fontSize:  '18px' }}>{title}</h3>
        <p style={{ color:   '#666', margin: '4px 0', fontSize: '14px' }}>{description}</p>
      </div>
    </div>
  );
};

export default DashboardCard;

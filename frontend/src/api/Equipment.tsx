import React, { useState, useEffect } from 'react';

const Equipment: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);  // ใช้ type ที่เหมาะสมกับข้อมูลของคุณ

  useEffect(() => {
    // เรียก API เพื่อดึงข้อมูลเมื่อ component โหลด
    fetch('http://localhost/get_users.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => alert('Error fetching data: ' + error.message));
  }, []); // [] หมายความว่าจะทำงานแค่ครั้งเดียวเมื่อ component โหลด

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.length === 0 ? (
          <li>Loading...</li>
        ) : (
          users.map((user, index) => (
            <li key={index}>{user.name}</li> // แสดงข้อมูลตามที่ได้รับ
          ))
        )}
      </ul>
    </div>
  );
};

export default Equipment;

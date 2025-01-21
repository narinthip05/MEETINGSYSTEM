import React, { useState, useEffect } from 'react';

const RepairRequests: React.FC = () => {
  const [repairRequests, setRepairRequests] = useState<any[]>([]);

  const fetchRepairRequests = async () => {
    try {
      const response = await fetch('http://localhost/api/repair_requests.php');
      const data = await response.json();
      setRepairRequests(data);
    } catch (error) {
      console.error('Error fetching repair requests:', error);
    }
  };

  useEffect(() => {
    fetchRepairRequests();
  }, []);

  return (
    <div>
      <h1>Repair Requests</h1>
      <ul>
        {repairRequests.map((request, index) => (
          <li key={index}>
            {request.requester_name} - {request.issue_description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepairRequests;

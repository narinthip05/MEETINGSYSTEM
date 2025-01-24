import React, { createContext, useContext, useState, ReactNode } from "react";

// กำหนดประเภทของข้อมูลที่ต้องการแชร์
interface DashboardData {
  totalRepairs: number;
  totalMeetingRooms: number;
  totalPCs: number;
}

// สร้าง Context
const DashboardContext = createContext<any>(null);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalRepairs: 0,
    totalMeetingRooms: 0,
    totalPCs: 0,
  });

  return (
    <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Hook เพื่อใช้ Context ในคอมโพเนนต์อื่น
export const useDashboard = () => useContext(DashboardContext);

import { Equipment } from './IEquipment'

export interface Meetingroom {
    Roomid:   number;               // รหัสห้องประชุม
    Roomname: string;               // ชื่อห้องประชุม
    Location: string;               // ที่ตั้ง
    Capacity: number;               // ความจุ
    Roomdate: string;               // วันเดือนปี (ใช้ string ในรูปแบบ ISO เช่น "2025-01-24")
    Screencount:      number;       // จำนวนจอ
    Microphonescount: number;       // จำนวนไมโครโฟน
    Pccount:          number;       // จำนวนคอมพิวเตออร์ PC
    Screencomputer:   number;       // จำนวนจอคอมพิวเตอร์
    Equipment:        Equipment[];
}

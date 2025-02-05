import { Equipment } from './IEquipment'

export interface Meetingroom {
    Roomid:   number;               // รหัสห้องประชุม
    Roomdate: string;               // วันเดือนปี (ใช้ string ในรูปแบบ ISO เช่น "2025-01-24")
    Roomname: string;               // ชื่อห้องประชุม
    Location: string;               // ที่ตั้ง
    Capacity: number;               // ความจุ
    Microphonescount: number;       // จำนวนไมโครโฟน
    Screencount:      number;       // จำนวนจอทีวี
    Pccount:          number;       // จำนวนจอคอมพิวเตออร์ /PC
    Equipment:        Equipment[];
}

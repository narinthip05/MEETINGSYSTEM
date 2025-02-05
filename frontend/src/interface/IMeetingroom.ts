export interface AdditionalRow {
    Pc: string;
    Brand: string;
    Contract: string;
}

export interface Meetingroom {
    Roomid: number;
    Roomdate: string; // ใช้ ISO Date เช่น "2025-01-24T10:00:00Z"
    Roomname: string;
    Location: string;
    Capacity: number;
    Microphone: number;
    Screen: number;
    AdditionalRows: AdditionalRow[]; // รายละเอียด PC / อุปกรณ์เพิ่มเติม
}

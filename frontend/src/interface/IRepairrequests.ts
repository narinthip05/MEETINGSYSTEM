

export interface Repairrequests {
    Requestid:   number;          // รหัสแจ้งซ่อม
    Requestdate: string;          // วันที่แจ้งซ่อม (ใช้ string สำหรับเก็บวันที่ เช่น ISO format)
    Roomname:    string;          // ชื่อห้องประชุม
    Location:    string;          // ที่ตั้ง
    Username:    string;          // ชื่อผู้ใช้
    Machinename: string;          // ชื่อเครื่อง
    Equipmenttype: string;        // ประเภทอุปกรณ์
    Model:         string;        // รุ่น
    Contractyear:  string;        // เลขที่สัญญา
    Harddisk:      string;        // ฮาร์ดดิส
    Ram:           string;        // แรม
    Problemneed:   string;        // ปัญหาที่แจ้งซ่อม
    Resolution:    string;        // วิธีแก้ไข
}


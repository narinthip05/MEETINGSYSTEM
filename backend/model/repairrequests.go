package model

import (
    "time"
)

type Repairrequests struct {
Requestid      int       `json:"requestid"`         //รหัสแจ้งซ่อม
Requestdate    time.Time `json:"requestdate"`       //วันที่แจ้งซ่อม
Roomname       string    `json:"roomname"`          //ชื่อห้องประชุม
Location       string    `json:"location"`          //ที่ตั้ง    
Username       string    `json:"username"`		     //ชื่อผู้ใช้
Machimename    string    `json:"machimename"`       //ชื่อเครื่อง
Department     string    `json:"department"`	     //แผนก
Equipmenttype  int       `json:"equipmenttype"`     //ประเภทอุปกรณ์
Model          string    `json:"model"`		        //รุ่น
Contractyear   int       `json:"contractyear"`      //เลขที่สัญญา
Harddisk       string    `json:"harddisk"`         //ฮาร์ดดิส
Ram            string    `json:"ram"`               //แรม
Problemneed    string    `json:"problemneed"`       // ปัญหาที่แจ้งซ่อม
Resolution     string    `json:"resolution"`        // วิธีแก้ไข

}
package model

import (
    "fmt"
    "time"
)

type repairrequests struct {
requestid      int       `json:"requestid"`         //รหัสแจ้งซ่อม
requestdate    time.Time `json:"requestdate"`       //วันที่แจ้งซ่อม
roomname       string    `json:"roomname"`          //ชื่อห้องประชุม
location       string    `json:"location"`          //ที่ตั้ง    
username       string    `json:"username"`		     //ชื่อผู้ใช้
machimename    string    `json:"machimename"`       //ชื่อเครื่อง
department     string    `json:"department"`	     //แผนก
equipmenttype  int       `json:"equipmenttype"`     //ประเภทอุปกรณ์
model          string    `json:"model"`		     //รุ่น
contractyear   int       `json:"contractyear"`      //เลขที่สัญญา
้harddisk       string    `json:"harddisk"`          //ฮาร์ดดิส
ram            string    `json:"ram"`               //แรม
problemneed    string    `json:"problemneed"`       // ปัญหาที่แจ้งซ่อม
resolution     string    `json:"resolution"`        // วิธีแก้ไข
}
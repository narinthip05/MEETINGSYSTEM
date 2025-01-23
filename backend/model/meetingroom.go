package model

import (
    
    "time"
)

type Meetingroom struct {
Roomid           int       `json:"roomid"`           //รหัสห้องประชุม
Roomname         string    `json:"roomname"`	     //ชื่อห้องประชุม
Location         string    `json:"location"`	     //ที่ตั้ง
Capacity         int       `json:"capacity"`		 //ความจุ
Roomdate         time.Time `json:"roomdate"`		 //วันเดือนปี
Screencount      int       `json:"screencount"`      //จำนวนจอ
Microphonescount int       `json:"microphonescount"` //จำนวนไมโครโฟน
Pccount          int       `json:"pccount"`		     //จำนวนคอมพิวเตออร์ PC
Screencomputer   int       `json:"screencomputer"`   //จำนวนจอคอมพิวเตอร์
}
package model

import (
    "fmt"
    "time"
)

type meetingroom struct {
roomid           int       `json:"roomid"`           //รหัสห้องประชุม
roomname         string    `json:"roomname"`	     //ชื่อห้องประชุม
location         string    `json:"location"`	     //ที่ตั้ง
capacity         int       `json:"capacity"`		 //ความจุ
roomdate         time.Time `json:"roomdate"`		 //วันเดือนปี
screencount      int       `json:"screencount"`      //จำนวนจอ
microphonescount int       `json:"microphonescount"` //จำนวนไมโครโฟน
pccount          int       `json:"pccount"`		     //จำนวนคอมพิวเตออร์ PC
screencomputer   int       `json:"screencomputer"`   //จำนวนจอคอมพิวเตอร์
}
package model

import (
    "fmt"
)

type users struct {
	user_id   int    `json:"user_id"`       //รหัสผู้ใช้งาน
	username  string `json:"username"`      //ชื่อผู้ใช้งาน
	password  string `json:"password"`      //รหัสผ่าน
	role      int    `json:"role"`			//ตำแหน่ง (Admin,Users)
}


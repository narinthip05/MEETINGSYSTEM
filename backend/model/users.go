package model

type Users struct {
	Userid   int    `json:"user_id"`       //รหัสผู้ใช้งาน
	Username  string `json:"username"`      //ชื่อผู้ใช้งาน
	Password  string `json:"password"`      //รหัสผ่าน
	Role      int    `json:"role"`			//ตำแหน่ง (Admin,Users)
}


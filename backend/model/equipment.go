package model



type Equipment struct {
Equipmentid   int    `json:"equipmentid"`      //รหัสอุปกรณ์
Equipmenttype string `json:"equipmentidtype"`  //ประเภทอุปกรณ์
Brand         string `json:"brand"`			   //รุ่น
Concractyear  string `json:"concractyear"`	   //เลขที่สัญญา
Meetingroomid int    `json:"meetingroomid"`	   //รหัสห้องประชุม
}
package model

import (
    "fmt"
)

type equipment struct {
equipmentid   int    `json:"equipmentid"`      //รหัสอุปกรณ์
equipmenttype string `json:"equipmentidtype"`  //ประเภทอุปกรณ์
brand         string `json:"brand"`			   //รุ่น
concractyear  string `json:"concractyear"`	   //เลขที่สัญญา
meetingroomid int    `json:"meetingroomid"`	   //รหัสห้องประชุม
}
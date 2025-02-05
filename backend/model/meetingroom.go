package model

import (
	"time"
)

type AdditionalRow struct {
	Pc       string `json:"pc"`
	Brand    string `json:"brand"`
	Contract string `json:"contract"`
}

type Meetingroom struct {
	Roomid         int             `json:"roomid"`
	Roomname       string          `json:"roomname"`
	Location       string          `json:"location"`
	Capacity       int             `json:"capacity"`
	Roomdate       time.Time       `json:"roomdate"`
	Microphone     int             `json:"microphone"`
	Screen         int             `json:"screen"`
	AdditionalRows []AdditionalRow `json:"additionalRows"` // รองรับข้อมูล PC ที่ละเอียดขึ้น
}

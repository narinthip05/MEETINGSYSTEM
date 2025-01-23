package controller

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/narinthip05/Meetingsystem/model"
)

var meetingRoomsList []model.Meetingroom // เก็บข้อมูล Meetingroom ใน memory

// GetAllMeetingRooms - ดึงข้อมูลห้องประชุมทั้งหมด
func GetAllMeetingRooms(c *gin.Context) {
	c.JSON(http.StatusOK, meetingRoomsList)
}

// GetMeetingRoomByID - ดึงข้อมูลห้องประชุมตาม ID
func GetMeetingRoomByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid room ID"})
		return
	}

	for _, room := range meetingRoomsList {
		if room.Roomid == id {
			c.JSON(http.StatusOK, room)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Meeting room not found"})
}

// CreateMeetingRoom - เพิ่มข้อมูลห้องประชุมใหม่
func CreateMeetingRoom(c *gin.Context) {
	var newRoom model.Meetingroom
	if err := c.ShouldBindJSON(&newRoom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// กำหนดวันที่ปัจจุบันสำหรับห้องประชุม
	newRoom.Roomdate = time.Now()
	// เพิ่มข้อมูลใน memory
	meetingRoomsList = append(meetingRoomsList, newRoom)

	c.JSON(http.StatusCreated, newRoom)
}

// UpdateMeetingRoom - แก้ไขข้อมูลห้องประชุม
func UpdateMeetingRoom(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid room ID"})
		return
	}

	var updatedRoom model.Meetingroom
	if err := c.ShouldBindJSON(&updatedRoom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	for i, room := range meetingRoomsList {
		if room.Roomid == id {
			// อัปเดตข้อมูลใน memory
			updatedRoom.Roomid = id
			meetingRoomsList[i] = updatedRoom
			c.JSON(http.StatusOK, updatedRoom)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Meeting room not found"})
}

// DeleteMeetingRoom - ลบข้อมูลห้องประชุม
func DeleteMeetingRoom(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid room ID"})
		return
	}

	for i, room := range meetingRoomsList {
		if room.Roomid == id {
			// ลบข้อมูลใน memory
			meetingRoomsList = append(meetingRoomsList[:i], meetingRoomsList[i+1:]...)
			c.JSON(http.StatusNoContent, nil)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Meeting room not found"})
}

package controller

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/narinthip05/Meetingsystem/model"
	"github.com/gin-gonic/gin"
)

var meetingRoomList []model.Meetingroom // จำลองข้อมูลห้องประชุมใน memory

// GetAllMeetingRooms - ดึงข้อมูลห้องประชุมทั้งหมด
func GetAllMeetingRooms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(meetingRoomList)
}

// GetMeetingRoomByID - ดึงข้อมูลห้องประชุมตาม ID
func GetMeetingRoomByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid room ID", http.StatusBadRequest)
		return
	}

	for _, room := range meetingRoomList {
		if room.Roomid == id {
			json.NewEncoder(w).Encode(room)
			return
		}
	}

	http.Error(w, "Meeting room not found", http.StatusNotFound)
}

// CreateMeetingRoom - สร้างห้องประชุมใหม่
func CreateMeetingRoom(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var newMeetingRoom model.Meetingroom
	if err := json.NewDecoder(r.Body).Decode(&newMeetingRoom); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	meetingRoomList = append(meetingRoomList, newMeetingRoom)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newMeetingRoom)
}

// UpdateMeetingRoom - แก้ไขข้อมูลห้องประชุม
func UpdateMeetingRoom(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid room ID", http.StatusBadRequest)
		return
	}

	var updatedMeetingRoom model.Meetingroom
	if err := json.NewDecoder(r.Body).Decode(&updatedMeetingRoom); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	for i, room := range meetingRoomList {
		if room.Roomid == id {
			meetingRoomList[i] = updatedMeetingRoom
			json.NewEncoder(w).Encode(updatedMeetingRoom)
			return
		}
	}

	http.Error(w, "Meeting room not found", http.StatusNotFound)
}

// DeleteMeetingRoom - ลบห้องประชุม
func DeleteMeetingRoom(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid room ID", http.StatusBadRequest)
		return
	}

	for i, room := range meetingRoomList {
		if room.Roomid == id {
			meetingRoomList = append(meetingRoomList[:i], meetingRoomList[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}

	http.Error(w, "Meeting room not found", http.StatusNotFound)
}

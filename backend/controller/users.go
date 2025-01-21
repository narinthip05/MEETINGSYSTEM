package controller

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/narinthip05/Meetingsystem/model"
	"github.com/narinthip05/Meetingsystem/Controller"
	"github.com/gin-gonic/gin"
)

var usersList []model.Users // จำลองการเก็บข้อมูลผู้ใช้ใน memory

// GetAllUsers - ดึงข้อมูลผู้ใช้งานทั้งหมด
func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(usersList)
}

// GetUserByID - ดึงข้อมูลผู้ใช้งานตาม ID
func GetUserByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	for _, user := range usersList {
		if user.User_id == id {
			json.NewEncoder(w).Encode(user)
			return
		}
	}

	http.Error(w, "User not found", http.StatusNotFound)
}

// CreateUser - สร้างผู้ใช้งานใหม่
func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var newUser model.Users
	if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	usersList = append(usersList, newUser)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newUser)
}

// UpdateUser - แก้ไขข้อมูลผู้ใช้งาน
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	var updatedUser model.Users
	if err := json.NewDecoder(r.Body).Decode(&updatedUser); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	for i, user := range usersList {
		if user.User_id == id {
			usersList[i] = updatedUser
			json.NewEncoder(w).Encode(updatedUser)
			return
		}
	}

	http.Error(w, "User not found", http.StatusNotFound)
}

// DeleteUser - ลบผู้ใช้งาน
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	for i, user := range usersList {
		if user.User_id == id {
			usersList = append(usersList[:i], usersList[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}

	http.Error(w, "User not found", http.StatusNotFound)
}

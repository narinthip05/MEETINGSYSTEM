package controller

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/narinthip05/MEETINGSYSTEM/model"
	"github.com/gin-gonic/gin"
)

var repairRequestsList []model.Repairrequests // จำลองข้อมูลคำขอแจ้งซ่อมใน memory

// GetAllRepairRequests - ดึงคำขอแจ้งซ่อมทั้งหมด
func GetAllRepairRequests(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(repairRequestsList)
}

// GetRepairRequestByID - ดึงคำขอแจ้งซ่อมตาม ID
func GetRepairRequestByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid request ID", http.StatusBadRequest)
		return
	}

	for _, request := range repairRequestsList {
		if request.Requestid == id {
			json.NewEncoder(w).Encode(request)
			return
		}
	}

	http.Error(w, "Repair request not found", http.StatusNotFound)
}

// CreateRepairRequest - เพิ่มคำขอแจ้งซ่อมใหม่
func CreateRepairRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var newRequest model.Repairrequests
	if err := json.NewDecoder(r.Body).Decode(&newRequest); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	repairRequestsList = append(repairRequestsList, newRequest)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newRequest)
}

// UpdateRepairRequest - แก้ไขคำขอแจ้งซ่อม
func UpdateRepairRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid request ID", http.StatusBadRequest)
		return
	}

	var updatedRequest model.Repairrequests
	if err := json.NewDecoder(r.Body).Decode(&updatedRequest); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	for i, request := range repairRequestsList {
		if request.Requestid == id {
			repairRequestsList[i] = updatedRequest
			json.NewEncoder(w).Encode(updatedRequest)
			return
		}
	}

	http.Error(w, "Repair request not found", http.StatusNotFound)
}

// DeleteRepairRequest - ลบคำขอแจ้งซ่อม
func DeleteRepairRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid request ID", http.StatusBadRequest)
		return
	}

	for i, request := range repairRequestsList {
		if request.Requestid == id {
			repairRequestsList = append(repairRequestsList[:i], repairRequestsList[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}

	http.Error(w, "Repair request not found", http.StatusNotFound)
}

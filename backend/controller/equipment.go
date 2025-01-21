package controller

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/narinthip05/MEETINGSYSTEM/model"
	"github.com/gin-gonic/gin"
)

var equipmentList []model.Equipment // จำลองข้อมูลอุปกรณ์ใน memory

// GetAllEquipment - ดึงข้อมูลอุปกรณ์ทั้งหมด
func GetAllEquipment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(equipmentList)
}

// GetEquipmentByID - ดึงข้อมูลอุปกรณ์ตาม ID
func GetEquipmentByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid equipment ID", http.StatusBadRequest)
		return
	}

	for _, eq := range equipmentList {
		if eq.Equipmentid == id {
			json.NewEncoder(w).Encode(eq)
			return
		}
	}

	http.Error(w, "Equipment not found", http.StatusNotFound)
}

// CreateEquipment - สร้างอุปกรณ์ใหม่
func CreateEquipment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var newEquipment model.Equipment
	if err := json.NewDecoder(r.Body).Decode(&newEquipment); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	equipmentList = append(equipmentList, newEquipment)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newEquipment)
}

// UpdateEquipment - แก้ไขข้อมูลอุปกรณ์
func UpdateEquipment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid equipment ID", http.StatusBadRequest)
		return
	}

	var updatedEquipment model.Equipment
	if err := json.NewDecoder(r.Body).Decode(&updatedEquipment); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	for i, eq := range equipmentList {
		if eq.Equipmentid == id {
			equipmentList[i] = updatedEquipment
			json.NewEncoder(w).Encode(updatedEquipment)
			return
		}
	}

	http.Error(w, "Equipment not found", http.StatusNotFound)
}

// DeleteEquipment - ลบข้อมูลอุปกรณ์
func DeleteEquipment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid equipment ID", http.StatusBadRequest)
		return
	}

	for i, eq := range equipmentList {
		if eq.Equipmentid == id {
			equipmentList = append(equipmentList[:i], equipmentList[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}

	http.Error(w, "Equipment not found", http.StatusNotFound)
}

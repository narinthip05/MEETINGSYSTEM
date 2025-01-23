package controller

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/narinthip05/Meetingsystem/model"
)

var equipmentList []model.Equipment // เก็บข้อมูลอุปกรณ์ใน memory

// GetAllEquipment - ดึงข้อมูลอุปกรณ์ทั้งหมด
func GetAllEquipment(c *gin.Context) {
	c.JSON(http.StatusOK, equipmentList)
}

// GetEquipmentByID - ดึงข้อมูลอุปกรณ์ตาม ID
func GetEquipmentByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid equipment ID"})
		return
	}

	for _, equipment := range equipmentList {
		if equipment.Equipmentid == id {
			c.JSON(http.StatusOK, equipment)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Equipment not found"})
}

// CreateEquipment - เพิ่มข้อมูลอุปกรณ์ใหม่
func CreateEquipment(c *gin.Context) {
	var newEquipment model.Equipment
	if err := c.ShouldBindJSON(&newEquipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// เพิ่มข้อมูลใหม่เข้า memory
	equipmentList = append(equipmentList, newEquipment)
	c.JSON(http.StatusCreated, newEquipment)
}

// UpdateEquipment - แก้ไขข้อมูลอุปกรณ์
func UpdateEquipment(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid equipment ID"})
		return
	}

	var updatedEquipment model.Equipment
	if err := c.ShouldBindJSON(&updatedEquipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	for i, equipment := range equipmentList {
		if equipment.Equipmentid == id {
			// อัปเดตข้อมูลใน memory
			updatedEquipment.Equipmentid = id
			equipmentList[i] = updatedEquipment
			c.JSON(http.StatusOK, updatedEquipment)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Equipment not found"})
}

// DeleteEquipment - ลบข้อมูลอุปกรณ์
func DeleteEquipment(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid equipment ID"})
		return
	}

	for i, equipment := range equipmentList {
		if equipment.Equipmentid == id {
			// ลบข้อมูลใน memory
			equipmentList = append(equipmentList[:i], equipmentList[i+1:]...)
			c.JSON(http.StatusNoContent, nil)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Equipment not found"})
}

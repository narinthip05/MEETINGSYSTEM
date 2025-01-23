package controller

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/narinthip05/Meetingsystem/model"
)

var repairRequestsList []model.Repairrequests // เก็บข้อมูล Repairrequests ใน memory

// GetAllRepairRequests - ดึงข้อมูลแจ้งซ่อมทั้งหมด
func GetAllRepairRequests(c *gin.Context) {
	c.JSON(http.StatusOK, repairRequestsList)
}

// GetRepairRequestByID - ดึงข้อมูลแจ้งซ่อมตาม ID
func GetRepairRequestByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request ID"})
		return
	}

	for _, req := range repairRequestsList {
		if req.Requestid == id {
			c.JSON(http.StatusOK, req)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Repair request not found"})
}

// CreateRepairRequest - เพิ่มข้อมูลแจ้งซ่อมใหม่
func CreateRepairRequest(c *gin.Context) {
	var newRequest model.Repairrequests
	if err := c.ShouldBindJSON(&newRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// กำหนดวันที่แจ้งซ่อม
	newRequest.Requestdate = time.Now()
	// เพิ่มข้อมูลใน memory
	repairRequestsList = append(repairRequestsList, newRequest)

	c.JSON(http.StatusCreated, newRequest)
}

// UpdateRepairRequest - แก้ไขข้อมูลแจ้งซ่อม
func UpdateRepairRequest(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request ID"})
		return
	}

	var updatedRequest model.Repairrequests
	if err := c.ShouldBindJSON(&updatedRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	for i, req := range repairRequestsList {
		if req.Requestid == id {
			// อัปเดตข้อมูลใน memory
			updatedRequest.Requestid = id
			repairRequestsList[i] = updatedRequest
			c.JSON(http.StatusOK, updatedRequest)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Repair request not found"})
}

// DeleteRepairRequest - ลบข้อมูลแจ้งซ่อม
func DeleteRepairRequest(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request ID"})
		return
	}

	for i, req := range repairRequestsList {
		if req.Requestid == id {
			// ลบข้อมูลใน memory
			repairRequestsList = append(repairRequestsList[:i], repairRequestsList[i+1:]...)
			c.JSON(http.StatusNoContent, nil)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Repair request not found"})
}

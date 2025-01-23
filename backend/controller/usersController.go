package controller

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/narinthip05/Meetingsystem/model"
)

// Mock data: จำลองข้อมูลผู้ใช้งาน
var usersList = []model.Users{
	{Userid: 1, Username: "admin", Password: "admin123", Role: 1}, // Admin
	{Userid: 2, Username: "user1", Password: "user123", Role: 2},  // User
}

// GetAllUsers - ดึงข้อมูลผู้ใช้งานทั้งหมด
func GetAllUsers(c *gin.Context) {
	c.JSON(http.StatusOK, usersList)
}

// GetUserByID - ดึงข้อมูลผู้ใช้งานตาม ID
func GetUserByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	for _, user := range usersList {
		if user.Userid == id {
			c.JSON(http.StatusOK, user)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
}

// CreateUser - สร้างผู้ใช้งานใหม่
func CreateUser(c *gin.Context) {
	var newUser model.Users
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// เพิ่มผู้ใช้งานในระบบ
	newUser.Userid = len(usersList) + 1 // สร้าง ID ใหม่อัตโนมัติ
	usersList = append(usersList, newUser)
	c.JSON(http.StatusCreated, newUser)
}

// UpdateUser - แก้ไขข้อมูลผู้ใช้งาน
func UpdateUser(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var updatedUser model.Users
	if err := c.ShouldBindJSON(&updatedUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	for i, user := range usersList {
		if user.Userid == id {
			usersList[i].Username = updatedUser.Username
			usersList[i].Password = updatedUser.Password
			usersList[i].Role = updatedUser.Role
			c.JSON(http.StatusOK, usersList[i])
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
}

// DeleteUser - ลบผู้ใช้งาน
func DeleteUser(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	for i, user := range usersList {
		if user.Userid == id {
			usersList = append(usersList[:i], usersList[i+1:]...)
			c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
}

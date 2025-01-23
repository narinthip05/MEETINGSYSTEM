package main

import (
	"github.com/gin-gonic/gin"
	"github.com/narinthip05/Meetingsystem/controller"
)

func main() {
	// Initialize the Gin router
	r := gin.Default()

	// Define a protected route group
	protectRoute := r.Group("/")
	{
		// Users routes
		protectRoute.GET("/users", controller.GetAllUsers) 				// ดึงผู้ใช้งานทั้งหมด
		protectRoute.GET("/users/id", controller.GetUserByID)			// ดึงผู้ใช้งานตาม ID
		protectRoute.POST("/users", controller.CreateUser)				// เพิ่มผู้ใช้งานใหม่
		protectRoute.PUT("/users/id", controller.UpdateUser)			// แก้ไขข้อมูลผู้ใช้งาน
		protectRoute.DELETE("/users/id", controller.DeleteUser)			// ลบผู้ใช้งาน

		// Equipment routes
		protectRoute.GET("/equipment", controller.GetAllEquipment)			// ดึงข้อมูลอุปกรณ์ทั้งหมด
		protectRoute.GET("/equipment/id", controller.GetEquipmentByID)		// ดึงข้อมูลอุปกรณ์ตาม ID
		protectRoute.POST("/equipment", controller.CreateEquipment)			// เพิ่มข้อมูลอุปกรณ์ใหม่
		protectRoute.PUT("/equipment/id", controller.UpdateEquipment)		// แก้ไขข้อมูลอุปกรณ์
		protectRoute.DELETE("/equipment/id", controller.DeleteEquipment)	// ลบข้อมูลอุปกรณ์

		// Meeting room routes
		protectRoute.GET("/meetingrooms", controller.GetAllMeetingRooms)		// ดึงข้อมูลห้องประชุมทั้งหมด
		protectRoute.GET("/meetingrooms/id", controller.GetMeetingRoomByID)		// ดึงข้อมูลห้องประชุมตาม ID
		protectRoute.POST("/meetingrooms", controller.CreateMeetingRoom)		// เพิ่มข้อมูลห้องประชุมใหม่
		protectRoute.PUT("/meetingrooms/id", controller.UpdateMeetingRoom)		// แก้ไขข้อมูลห้องประชุม
		protectRoute.DELETE("/meetingrooms/id", controller.DeleteMeetingRoom)	// ลบข้อมูลห้องประชุม

		// Repair requests routes
		protectRoute.GET("/repairrequests", controller.GetAllRepairRequests)		// ดึงข้อมูลแจ้งซ่อมทั้งหมด
		protectRoute.GET("/repairrequests/id", controller.GetRepairRequestByID)		// ดึงข้อมูลแจ้งซ่อมตาม ID
		protectRoute.POST("/repairrequests", controller.CreateRepairRequest)		// เพิ่มข้อมูลแจ้งซ่อมใหม่
		protectRoute.PUT("/repairrequests/id", controller.UpdateRepairRequest)		// แก้ไขข้อมูลแจ้งซ่อม
		protectRoute.DELETE("/repairrequests/id", controller.DeleteRepairRequest)	// ลบข้อมูลแจ้งซ่อม
	}

	// Start the server
	r.Run(":8080")
}

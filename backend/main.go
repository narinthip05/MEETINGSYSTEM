package main

import (	
	"os"
	"github.com/narinthip05/MEETINGSYSTEM/model"
	"github.com/narinthip05/MEETINGSYSTEM/controller"
	"github.com/gin-gonic/gin"

)
func main() {
	 r.gin = gin.Default

	 protectRoute := r.group("/")
	 {
		//users
		// กำหนดเส้นทาง API
		protectRoute.GET("/users", controller.GetAllUsers)         
		protectRoute.GET("/users/id", controller.GetUserByID)      
		protectRoute.POST("/users", controller.CreateUser)         
		protectRoute.PUT("/users/id", controller.UpdateUser)       
		protectRoute.DELETE("/users/id", controller.DeleteUser)    


		//equipment
		protectRoute.GET("/equipment", controller.GetAllEquipment)         
		protectRoute.GET("/equipment/id",controller.GetEquipmentByID)      
		protectRoute.POST("/equipment", controller.CreateEquipment)        
		protectRoute.PUT("/equipment/id", controller.UpdateEquipment)      
		protectRoute.DELETE("/equipment/id", controller.DeleteEquipment)   
		
		//meetingroom
		protectRoute.GET("/meetingrooms", controller.GetAllMeetingRooms)        
		protectRoute.GET("/meetingrooms/id", controller.GetMeetingRoomByID)     
		protectRoute.POST("/meetingrooms", controller.CreateMeetingRoom)         
		protectRoute.PUT("/meetingrooms/id", controller.UpdateMeetingRoom)      
		protectRoute.DELETE("/meetingrooms/id", controller.DeleteMeetingRoom)      

		//repairrequests
		protectRoute.GET("/repairrequests", controller.GetAllRepairRequests)        
		protectRoute.GET("/repairrequests/id", controller.GetRepairRequestByID)     
		protectRoute.POST("/repairrequests", controller.CreateRepairRequest)       
		protectRoute.PUT("/repairrequests/id", controller.UpdateRepairRequest)     
		protectRoute.DELETE("/repairrequests/id", controller.DeleteRepairRequest)   


	 }
}
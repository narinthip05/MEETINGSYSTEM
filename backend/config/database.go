package config

import (
	"log"
	"os"

	"github.com/narinthip05/Meetingsystem/model"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDatabase initializes the SQLite database connection and performs schema migrations
func InitDatabase() {
	var err error

	// Use DATABASE_PATH environment variable or default to "./test.db"
	dbPath := os.Getenv("DATABASE_PATH")
	if dbPath == "" {
		dbPath = "./test.db"
	}

	// Open SQLite database connection
	DB, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	} else {
		log.Println("Database connection successful")
	}

	// Run AutoMigrate for all models
	// AutoMigrate will add missing columns and indexes, but won't remove any existing data
	err = DB.AutoMigrate(
		&model.Users{},
		&model.Equipment{},
		&model.Meetingroom{},
		&model.Repairrequests{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database schema:", err)
	} else {
		log.Println("Database schema successfully migrated")
	}

}

// GetDB returns the database instance
func GetDB() *gorm.DB {
	return DB
}
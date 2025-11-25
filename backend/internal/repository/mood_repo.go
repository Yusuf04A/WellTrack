package repository

import (
	"WellTrack/internal/database"
	"WellTrack/internal/models"
)

func CreateMood(mood *models.Mood) error {
	return database.DB.Create(mood).Error
}

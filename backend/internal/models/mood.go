package models

import "time"

type Mood struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    string    `gorm:"type:uuid;index;not null" json:"user_id"`
	Date      string    `gorm:"type:date;not null" json:"date"`
	Score     int       `json:"score"`
	MoodLabel string    `json:"mood_label"`
	Note      string    `json:"note"`
	CreatedAt time.Time `json:"created_at"`
}

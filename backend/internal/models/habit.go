package models

import "time"

type Habit struct {
	ID            uint       `gorm:"primaryKey" json:"id"`
	UserID        string     `gorm:"type:uuid;index;not null" json:"user_id"`
	Name          string     `gorm:"not null" json:"name"`
	Icon          string     `json:"icon"`
	TargetPerWeek int        `json:"target_per_week"`
	Color         string     `json:"color"`
	CreatedAt     time.Time  `json:"created_at"`
	Logs          []HabitLog `gorm:"foreignKey:HabitID" json:"logs,omitempty"`
}

type HabitLog struct {
	ID      uint   `gorm:"primaryKey" json:"id"`
	HabitID uint   `gorm:"index;not null" json:"habit_id"`
	Date    string `gorm:"type:date;not null" json:"date"`
	Status  string `json:"status"`
	Notes   string `json:"notes"`
}

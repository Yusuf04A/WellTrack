package models

import "time"

type User struct {
	ID        string    `gorm:"primaryKey;type:uuid" json:"id"`
	Email     string    `gorm:"unique;not null" json:"email"`
	Name      string    `json:"name"`
	AvatarURL string    `json:"avatar_url"`
	CreatedAt time.Time `json:"created_at"`
}

func (User) TableName() string {
	return "profiles"
}

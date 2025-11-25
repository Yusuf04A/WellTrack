package handlers

import (
	"WellTrack/internal/models"
	"WellTrack/internal/repository"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateHabit(c *gin.Context) {
	var habit models.Habit

	if err := c.ShouldBindJSON(&habit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	habit.UserID = "user-test-123"
	habit.CreatedAt = time.Now()

	if err := repository.CreateHabit(&habit); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal save ke DB"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Success!", "data": habit})
}

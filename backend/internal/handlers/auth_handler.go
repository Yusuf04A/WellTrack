package handlers

import "github.com/gin-gonic/gin"

func Login(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Login endpoint not implemented yet"})
}

func Register(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Register endpoint not implemented yet"})
}

package routes

import (
	"doneedu/base-go/src/source/middleware"

	"firebase.google.com/go/auth"
	"github.com/gin-gonic/gin"
	"github.com/samber/do"
)

func RegisterRoutes(i *do.Injector, r *gin.Engine, client *auth.Client) {
	versioned := r.Group("/auth")

	versioned.Use(middleware.AuthJWT(client))

}

package routes

import (
	"doneedu/base-go/src/source/config"
	"doneedu/base-go/src/source/middleware"
	controllers "doneedu/base-go/src/source/modules/donation_management/internal/presentation/controller"

	"github.com/gin-gonic/gin"
	"github.com/samber/do"
)

func RegisterRoutes(i *do.Injector, sess config.SessionConfig, r *gin.Engine) {
	api := r.Group("/api/donation")
	api.Use(middleware.AuthAPIKey(sess))
	// Controllers
	donationController := do.MustInvoke[*controllers.DonationController](i)
	// List Donation
	api.GET("/list-donation/", donationController.GetDonation)
}

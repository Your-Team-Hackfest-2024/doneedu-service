package providers

import (
	"context"
	"doneedu/base-go/src/source/config"
	moduleConfig "doneedu/base-go/src/source/modules/donation_management/internal/app/config"
	"doneedu/base-go/src/source/modules/donation_management/internal/app/repositories"
	"doneedu/base-go/src/source/modules/donation_management/internal/app/services"
	controllers "doneedu/base-go/src/source/modules/donation_management/internal/presentation/controller"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
	"github.com/samber/do"
)

func RegisterDependencies(i *do.Injector, cfg config.Config, moduleCfg moduleConfig.DonationConfig, g *gin.Engine) {
	ctx := context.Background()
	dbCfg := moduleCfg.Database()
	client, err := firestore.NewClient(ctx, dbCfg.FirestoreProjectID)
	if err != nil {
		panic("failed to connect SQL Server database for session")
	}
	// Repositories
	DonationRepository := repositories.NewDonationRepository(client)
	// Services
	DonationService := services.NewDonationService(cfg.GetAppConfig(), *DonationRepository)
	// Controllers
	do.Provide[*controllers.DonationController](i, func(i *do.Injector) (*controllers.DonationController, error) {
		return controllers.NewDonationController(
			DonationRepository,
			DonationService,
		), nil
	})
}

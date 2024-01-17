package donation_management

import (
	"doneedu/base-go/src/source/config"
	moduleConfig "doneedu/base-go/src/source/modules/donation_management/internal/app/config"
	"doneedu/base-go/src/source/modules/donation_management/internal/app/providers"
	"doneedu/base-go/src/source/modules/donation_management/internal/presentation/routes"

	"github.com/gin-gonic/gin"
	"github.com/samber/do"
)

func SetupModule(cfg config.Config, g *gin.Engine) {
	i := do.New()

	moduleCfg, err := moduleConfig.SetupConfig()
	if err != nil {
		panic(err)
	}
	providers.RegisterDependencies(i, cfg, moduleCfg, g)
	routes.RegisterRoutes(i, cfg.GetSessionConfig(), g)
}

package providers

import (
	"doneedu/base-go/src/source/config"

	"github.com/gin-gonic/gin"
	"github.com/samber/do"
)

func RegisterDependencies(i *do.Injector, cfg config.Config, g *gin.Engine) {
	// Libraries

	// Queries

	// Repositories

	// Controllers
	// do.Provide[*controllers.AuthController](i, func(i *do.Injector) (*controllers.AuthController, error) {
	// 	return controllers.NewAuthController(cfg, moduleCfg, do.MustInvoke[*oidc.Client](i)), nil
	// })
}

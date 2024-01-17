package auth

import (
	"doneedu/base-go/src/source/config"
	"doneedu/base-go/src/source/modules/auth/internal/app/providers"
	"doneedu/base-go/src/source/modules/auth/internal/presentation/routes"
	firestoreAdapter "doneedu/base-go/src/source/server/firestore"

	"github.com/gin-gonic/gin"
	"github.com/samber/do"
)

func SetupModule(cfg config.Config, g *gin.Engine, firestore *firestoreAdapter.Firestore) {
	i := do.New()

	providers.RegisterDependencies(i, cfg, g)

	routes.RegisterRoutes(i, g, firestore.GetAuth())
}

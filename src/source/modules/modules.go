package modules

import (
	"doneedu/base-go/src/source/config"
	"doneedu/base-go/src/source/modules/auth"
	donation "doneedu/base-go/src/source/modules/donation_management"
	firestoreAdapter "doneedu/base-go/src/source/server/firestore"

	"github.com/gin-gonic/gin"
)

func RegisterModules(cfg config.Config, g *gin.Engine, firestore *firestoreAdapter.Firestore) {
	auth.SetupModule(cfg, g, firestore)
	donation.SetupModule(cfg, g)
}

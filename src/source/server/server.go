package firebase

import (
	"doneedu/base-go/src/source/config"
	firestoreAdapter "doneedu/base-go/src/source/server/firestore"
	"reflect"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

type Server interface {
	Start()
	Engine() *gin.Engine
	FirestoreSession() *firestoreAdapter.Firestore
}

type GinServer struct {
	engine           *gin.Engine
	cfg              config.Config
	firestoreSession *firestoreAdapter.Firestore
}

func SetupServer(cfg config.Config) (Server, error) {
	firestoreAdapter, err := setupFirestoreSessionAdapter(cfg.GetSessionConfig())
	if err != nil {
		return nil, err
	}
	return newGinServer(cfg, firestoreAdapter)
}

// Masih di sini dulu
func (g *GinServer) Start() {
	g.engine.Run()
}
func (g *GinServer) Engine() *gin.Engine {
	return g.engine
}
func (g *GinServer) FirestoreSession() *firestoreAdapter.Firestore{
	return g.firestoreSession
}
func newGinServer(cfg config.Config, firestoreSession *firestoreAdapter.Firestore) (Server, error) {
	appCfg := cfg.GetAppConfig()
	if appCfg.Debug {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}
	r := gin.Default()

	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterTagNameFunc(func(fld reflect.StructField) string {
			name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
			if name == "-" {
				return ""
			}
			return name
		})
	}

	s := &GinServer{r, cfg, firestoreSession}
	// s.buildRouter()
	return s, nil
}

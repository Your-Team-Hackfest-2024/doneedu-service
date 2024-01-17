package firestore

import (
	"time"

	"github.com/gin-gonic/gin"
)

type Data struct {
	ctx       *gin.Context
	id        string
	csrfToken string
	data      map[string]interface{}
	storage   Storage
	expiredAt time.Time
}
type Storage interface {
	Get(ctx *gin.Context, id string) (*Data, error)
	Save(ctx *gin.Context, id string, data map[string]interface{}, expiredAt time.Time, csrfToken string) error
	Delete(ctx *gin.Context, id string) error
}

func NewData(ctx *gin.Context, id string, csrfToken string, data map[string]interface{}, storage Storage, expiredAt time.Time) *Data {
	return &Data{
		ctx:       ctx,
		id:        id,
		csrfToken: csrfToken,
		data:      data,
		storage:   storage,
		expiredAt: expiredAt,
	}
}

func (d *Data) Id() string {
	return d.id
}

func (d *Data) CSRFToken() string {
	return d.csrfToken
}

func (d *Data) Get(key string) (interface{}, bool) {
	data, ok := d.data[key]
	return data, ok
}

// Setiap set harus disertai dengan save
func (d *Data) Set(key string, value interface{}) {
	d.data[key] = value
}

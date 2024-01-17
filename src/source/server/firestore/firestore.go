package firestore

import (
	"time"

	"cloud.google.com/go/firestore"
	"firebase.google.com/go/auth"
	"github.com/gin-gonic/gin"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type FirestoreData struct {
	Data      map[string]interface{} `firestore:"data"`
	ExpiredAt time.Time              `firestore:"expired_at"`
	CSRFToken string                 `firestore:"csrf_token"`
}

type Firestore struct {
	client     *firestore.Client
	auth       *auth.Client
	collection string
}

func NewFirestore(client *firestore.Client, auth *auth.Client, collection string) *Firestore {
	return &Firestore{client, auth, collection}
}

func (f *Firestore) Get(ctx *gin.Context, id string) (*Data, error) {
	ref := f.client.Collection(f.collection).Doc(id)
	doc, err := ref.Get(ctx)
	if err != nil && status.Code(err) == codes.NotFound {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	var data FirestoreData
	if err := doc.DataTo(&data); err != nil {
		return nil, err
	}
	if data.ExpiredAt.Before(time.Now()) {
		return nil, nil
	}

	sess := NewData(ctx, id, data.CSRFToken, data.Data, f, data.ExpiredAt)
	return sess, nil
}

func (f *Firestore) Save(ctx *gin.Context, id string, data map[string]interface{}, expiredAt time.Time, csrfToken string) error {
	ref := f.client.Collection(f.collection).Doc(id)
	_, err := ref.Set(ctx, FirestoreData{data, expiredAt, csrfToken})
	return err
}

func (f *Firestore) Delete(ctx *gin.Context, id string) error {
	ref := f.client.Collection(f.collection).Doc(id)
	_, err := ref.Delete(ctx)
	return err
}

func (f *Firestore) GetClient() *firestore.Client {
	return f.client
}
func (f *Firestore) GetAuth() *auth.Client {
	return f.auth
}
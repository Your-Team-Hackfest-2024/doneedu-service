package firebase

import (
	"context"
	"doneedu/base-go/src/source/config"
	firestoreAdapter "doneedu/base-go/src/source/server/firestore"
	"errors"
	"log"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var ErrProjectIDNotConfigured = errors.New("firestore project ID not configured. please set SESSION_FIRESTORE_PROJECT_ID in .env file")

func setupFirestoreSessionAdapter(cfg config.SessionConfig) (*firestoreAdapter.Firestore, error) {
	ctx := context.Background()
	if cfg.FireBaseProjectID == "" {
		return nil, ErrProjectIDNotConfigured
	}
	conf := &firebase.Config{
		ProjectID: cfg.FireBaseProjectID,
	}
	opt := option.WithCredentialsFile(cfg.Credentials)
	app, err := firebase.NewApp(ctx, conf, opt)
	if err != nil {
		return nil, err
	}
	client, err := app.Firestore(ctx)
	if err != nil {
		log.Printf("Error create client")
		log.Fatalln(err)
	}
	auth, err := app.Auth(ctx)
	if err != nil {
		log.Printf("Error auth client")
		log.Fatalln(err)
	}
	defer client.Close()
	return firestoreAdapter.NewFirestore(client, auth, cfg.FirestoreCollection), nil
}

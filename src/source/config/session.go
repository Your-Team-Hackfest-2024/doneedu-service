package config

import (
	"github.com/joeshaw/envdecode"
	"golang.org/x/exp/slices"
)

type SessionConfig struct {
	// Firestore session adapter
	FireBaseProjectID   string `env:"FIREBASE_PROJECT_ID"`
	Driver              string `env:"SESSION_DRIVER,default="`
	Credentials         string `env:"GOOGLE_APPLICATION_CREDENTIALS,default="`
	FirestoreCollection string `env:"SESSION_FIRESTORE_COLLECTION,default=sessions"`
	FirebaseAPIKey      string `env:"FIREBASE_API_KEY,default="`
}

var availableDrivers = []string{
	"firestore",
}

func (c ConfigSet) GetSessionConfig() SessionConfig {
	return c.session
}

func setupSessionConfig() SessionConfig {
	var session SessionConfig
	err := envdecode.StrictDecode(&session)
	if err != nil {
		panic(err)
	}
	if session.Driver == "" {
		session.Driver = "firestore"
	}
	if !slices.Contains(availableDrivers, session.Driver) {
		panic("invalid session driver")
	}

	return session
}

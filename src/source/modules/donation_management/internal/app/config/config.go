package config

import (
	"github.com/joeshaw/envdecode"
)

type DatabaseConfig struct {
	// Firestore adapter
	FirestoreProjectID  string `env:"DONATION_FIRESTORE_PROJECT_ID"`
	FirestoreCollection string `env:"DONATION_FIRESTORE_COLLECTION"`
}
type DonationConfig interface {
	Database() DatabaseConfig
}

type DonationConfigImpl struct {
	db DatabaseConfig
}

// Database implements DonationConfig.
func (c DonationConfigImpl) Database() DatabaseConfig {
	return c.db
}

func setupDatabaseConfig() DatabaseConfig {
	var db DatabaseConfig
	err := envdecode.StrictDecode(&db)
	if err != nil {
		panic(err)
	}

	return db
}

func SetupConfig() (DonationConfig, error) {
	db := setupDatabaseConfig()

	return DonationConfigImpl{db}, nil
}

package config

import "github.com/joeshaw/envdecode"

type AppConfig struct {
	AppName string `env:"APP_NAME,default=doneedu"`
	Debug       bool   `env:"APP_DEBUG,default=false"`
	URL         string `env:"APP_URL,default=http://localhost"`
}
type HTTPConfig struct {
	PORT    string `env:"PORT,default=8080"`
	GinMode string `env:"GIN_MODE,default=debug"`
}
type Config interface {
	GetSessionConfig() SessionConfig
	GetAppConfig() AppConfig
	GetHTTPConfig() HTTPConfig
}

type ConfigSet struct {
	session SessionConfig
	app     AppConfig
	http    HTTPConfig
}

func (c ConfigSet) GetAppConfig() AppConfig {
	return c.app
}

func (c ConfigSet) GetHTTPConfig() HTTPConfig {
	return c.http
}

func SetupAppConfig() (Config, error) {
	var app AppConfig
	err := envdecode.StrictDecode(&app)
	if err != nil {
		return nil, err
	}

	var http HTTPConfig
	err = envdecode.StrictDecode(&http)
	if err != nil {
		return nil, err
	}
	session := setupSessionConfig()
	return ConfigSet{
		app:     app,
		http:    http,
		session: session,
	}, nil
}

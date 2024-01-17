package main

import (
	"doneedu/base-go/src/source/config"
	"doneedu/base-go/src/source/modules"
	serverSet "doneedu/base-go/src/source/server"

	"log"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Error loading .env file")
	}

	cfg, err := config.SetupAppConfig()
	if err != nil {
		panic(err)
	}
	server, err := serverSet.SetupServer(cfg)
	if err != nil {
		panic(err)
	}
    modules.RegisterModules(cfg, server.Engine(), server.FirestoreSession())
    server.Start()
}

package middleware

import (
	"doneedu/base-go/src/source/config"
	"doneedu/base-go/src/source/secrets"
	"log"
	"net/http"
	"strings"
	"time"

	"firebase.google.com/go/auth"
	"github.com/gin-gonic/gin"
)

const (
	authorizationHeader = "Authorization"
	apiKeyHeader        = "X-API-Key"
	cronExecutedHeader  = "X-Appengine-Cron"
	valName             = "FIREBASE_ID_TOKEN"
)

func AuthJWT(client *auth.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		startTime := time.Now()

		authHeader := c.Request.Header.Get(authorizationHeader)
		log.Println("authHeader", authHeader)
		token := strings.Replace(authHeader, "Bearer ", "", 1)
		idToken, err := client.VerifyIDToken(c, token) // usually hits a local cache
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"message": http.StatusText(http.StatusUnauthorized),
			})
			return
		}

		log.Println("Auth time:", time.Since(startTime))

		c.Set(valName, idToken)
		c.Next()
	}
}

func AuthAPIKey(session config.SessionConfig) gin.HandlerFunc {
	return func(c *gin.Context) {
		key := c.Request.Header.Get(apiKeyHeader)

		secret, err := secrets.GetSecret(session.FirebaseAPIKey, session) //session.FirebaseAPIKey = secretKey
		if err != nil {
			log.Println("failed to get secret")
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"message": http.StatusText(http.StatusUnauthorized),
			})
			return
		}

		log.Println("comparing secret with provided key", secret, key)

		if secret != key {
			log.Println("key doesnt match!")
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"message": http.StatusText(http.StatusUnauthorized),
			})
			return
		}

		log.Println("no error during check")
		c.Next()
	}
}

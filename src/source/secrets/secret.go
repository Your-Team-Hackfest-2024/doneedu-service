package secrets

import (
	"context"
	"doneedu/base-go/src/source/config"
	"fmt"
	"log"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	"cloud.google.com/go/secretmanager/apiv1/secretmanagerpb"
	"github.com/pkg/errors"
	"google.golang.org/api/cloudresourcemanager/v1"
)

func getProjectNumber(projectID string) (int64, error) {
	crmService, err := cloudresourcemanager.NewService(context.Background())
	if err != nil {
		return 0, errors.Wrap(err, "failed to get cloud resource manager service")
	}

	project, err := crmService.Projects.Get(projectID).Do()
	if err != nil {
		return 0, errors.Wrap(err, "failed to get project number from ID")
	}

	log.Println("project number for project:", project.ProjectNumber)

	return project.ProjectNumber, nil
}

func GetSecret(secretId string, sess config.SessionConfig) (string, error) {
	ctx := context.Background()
	client, err := secretmanager.NewClient(ctx)
	if err != nil {
		return "", errors.Wrap(err, "failed to setup secret manager client")
	}
	projectNumber, err := getProjectNumber(sess.FireBaseProjectID)
	if err != nil {
		return "", err
	}
	accessRequest := &secretmanagerpb.AccessSecretVersionRequest{
		Name: fmt.Sprintf("projects/%d/secrets/%s/versions/%d", projectNumber, secretId, 1),
	}
	version, err := client.AccessSecretVersion(ctx, accessRequest)
	if err != nil {
		return "", errors.Wrap(err, "failed to access secret version")
	}
	return string(version.Payload.Data), nil

}

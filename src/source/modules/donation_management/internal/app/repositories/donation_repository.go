package repositories

import (
	"context"
	"doneedu/base-go/src/source/modules/donation_management/internal/app/entities"

	"cloud.google.com/go/firestore"
)

type DonationRepository struct {
	client *firestore.Client
}

// GetDonation implements entities.DonationQuery.

func NewDonationRepository(client *firestore.Client) *DonationRepository {
	return &DonationRepository{
		client: client,
	}
}
func (*DonationRepository) GetDonation(ctx context.Context) ([]entities.Donation, error) {
	panic("unimplemented")
}

package entities

import (
	"context"

	"github.com/google/uuid"
)

type Donation struct {
	IdDonation uuid.UUID `json:"id_donation" firestore:"id_donation" binding:"required"`
}

type DonationQuery interface {
	GetDonation(ctx context.Context)([]Donation, error)
}
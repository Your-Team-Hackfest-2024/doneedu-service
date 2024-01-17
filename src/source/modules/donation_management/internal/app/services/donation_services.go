package services

import (
	"context"
	"doneedu/base-go/src/source/config"
	"doneedu/base-go/src/source/modules/donation_management/internal/app/entities"
	"doneedu/base-go/src/source/modules/donation_management/internal/app/repositories"
)

type DonationService struct {
	AppConfig    config.AppConfig
	DonationRepo repositories.DonationRepository
}

func NewDonationService(cfgApp config.AppConfig, DonationRepo repositories.DonationRepository) *DonationService{
	return &DonationService{
		AppConfig:    cfgApp,
		DonationRepo: DonationRepo,
	}
}

func (s *DonationService) GetDonation(ctx context.Context) ([]entities.Donation, error) {
	panic("unimplemented")
}

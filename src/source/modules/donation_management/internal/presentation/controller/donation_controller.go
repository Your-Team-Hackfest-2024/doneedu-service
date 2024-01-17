package controllers

import (
	"doneedu/base-go/src/source/modules/donation_management/internal/app/repositories"
	"doneedu/base-go/src/source/modules/donation_management/internal/app/services"

	"github.com/gin-gonic/gin"
)

type DonationController struct {
	donationRepository *repositories.DonationRepository
	donationService    *services.DonationService
}

func NewDonationController(donationRepository *repositories.DonationRepository, donationService *services.DonationService) *DonationController {
	return &DonationController{
		donationRepository: donationRepository,
		donationService:    donationService,
	}
}

func (d *DonationController) GetDonation(ctx *gin.Context) {
	panic("unimplemented")
}

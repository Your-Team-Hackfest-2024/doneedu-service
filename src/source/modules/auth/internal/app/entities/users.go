package queries

type User struct {
	ID                string `json:"id" example:"00000000-0000-0000-0000-000000000000"`
	Name              string `json:"name" example:"John Doe"`
	Email             string `json:"email" example:"user@contoso.com"`
	PreferredUsername string `json:"preferred_username" example:"user@contoso.com"`
	ActiveRole        string `json:"active_role" example:"Mahasiswa"`
	Roles             []Role `json:"roles"`
}

type Role struct {
	Name        string   `json:"name" example:"Mahasiswa"`
	Permissions []string `json:"permissions"`
	IsDefault   bool     `json:"is_default"`
}

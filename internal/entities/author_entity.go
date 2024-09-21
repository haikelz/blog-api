package entities

type Author struct {
	Id          string `json:"id"`
	Email       string `json:"email"`
	Username    string `json:"username"`
	Image       string `json:"image,omitempty"`
	Description string `json:"description,omitempty"`
	CreatedAt   string `json:"createdAt,omitempty"`
	UpdatedAt   string `json:"updatedAt,omitempty"`
	DeletedAt   string `json:"deletedAt,omitempty"`
	Blogs       []Blog `json:"blogs"`
}

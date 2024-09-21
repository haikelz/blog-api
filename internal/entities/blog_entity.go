package entities

type Blog struct {
	Id        string   `json:"id"`
	Slug      string   `json:"slug"`
	Thumbnail string   `json:"thumbnail,omitempty"`
	Author    string   `json:"author"`
	Title     string   `json:"title"`
	CreatedAt string   `json:"createdAt,omitempty"`
	UpdatedAt string   `json:"updatedAt,omitempty"`
	DeletedAt string   `json:"deletedAt,omitempty"`
	Content   string   `json:"content"`
	Tags      []string `json:"tags,omitempty"`
}

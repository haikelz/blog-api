package entities

type BaseResponse struct {
	StatusCode int    `json:"statusCode"`
	Message    string `json:"message"`
}

package configs

import "github.com/google/uuid"

func getId() uuid.UUID {
	uuId := uuid.New()
	return uuId
}

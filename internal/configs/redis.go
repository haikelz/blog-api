package configs

import (
	"os"

	"github.com/redis/go-redis/v9"
)

func redisClient() *redis.Client {
	return redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_PORT"),
		Password: os.Getenv("DB_PASSWORD"),
		DB:       0, // use default DB
	})
}

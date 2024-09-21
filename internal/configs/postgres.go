package configs

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5"
)

func postgres() *pgx.Conn {
	conn, err := pgx.Connect(context.Background(), "user="+os.Getenv("DATABASE_USERNAME")+" password="+os.Getenv("DATABASE_PASSWORD")+" host="+os.Getenv("DATABASE_HOST")+" port="+os.Getenv("DATABASE_PORT")+" dbname="+os.Getenv("DATABASE_NAME"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	return conn
}

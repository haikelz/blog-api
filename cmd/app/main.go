package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/haikelz/blog-api/internal/entities"
)

type AllBlogResponse struct {
	entities.BaseResponse
	Data entities.Blog `json:"data"`
}

func main() {
	configs.postgres()
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(entities.BaseResponse{StatusCode: 200, Message: "Sukses mengakses API!"})
	})

	app.Get("/api/v1/blog/:id", func(c *fiber.Ctx) error {
		return c.JSON(AllBlogResponse{BaseResponse: entities.BaseResponse{
			StatusCode: 200, Message: "Success get blog by id!",
		}})
	})

	app.Post("/api/v1/blog", func(c *fiber.Ctx) error {
		return c.JSON(AllBlogResponse{BaseResponse: entities.BaseResponse{
			StatusCode: 200, Message: "Success create new blog!",
		}})
	})

	app.Delete("/api/v1/blog/:id", func(c *fiber.Ctx) error {
		return c.JSON(entities.BaseResponse{StatusCode: 200, Message: "Success delete blog!"})
	})

	app.Put("/api/v1/blog/:id", func(c *fiber.Ctx) error {
		return c.JSON(entities.BaseResponse{StatusCode: 200, Message: "Success edit blog!"})
	})

	app.Get("/api/v1/author", func(c *fiber.Ctx) error {
		return c.SendString("Mantap")
	})

	app.Post("/api/v1/author", func(c *fiber.Ctx) error {
		return c.JSON(entities.BaseResponse{StatusCode: 200, Message: "Success add new author!"})
	})

	app.Put("/api/v1/author/:id", func(c *fiber.Ctx) error {
		return c.JSON(entities.BaseResponse{
			StatusCode: 200, Message: "Success edit author data!",
		})
	})

	app.Delete("/api/v1/author/:id", func(c *fiber.Ctx) error {
		return c.JSON(entities.BaseResponse{
			StatusCode: 200,
			Message:    "Success delete author data!",
		})
	})

	app.Listen(":5000")
}

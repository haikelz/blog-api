import { DataSource } from "typeorm";
import { Author } from "../entities/author.entity";
import { Blog } from "../entities/blog.entity";
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
  REDIS_PORT,
} from "./constants.config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [Blog, Author],
  // We want to use redis for caching, so we can configure the options like this:
  cache: {
    type: "ioredis",
    options: {
      socket: {
        host: "localhost",
        port: Number(REDIS_PORT),
      },
    },
  },
  // Handle migrations
  migrations: [],
  migrationsTableName: "migrations",
});

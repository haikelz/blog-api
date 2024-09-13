import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import * as http from "http";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { PORT } from "./configs/constants.config";
import { AppDataSource } from "./configs/typeorm.config";
import { AuthorResolver } from "./resolvers/author.resolver";
import { BlogResolver } from "./resolvers/blog.resolver";

dotenv.config();
const app = express();
AppDataSource.initialize();

async function main() {
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [BlogResolver, AuthorResolver],
    }),
    introspection: process.env.NODE_ENV !== "production",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }) as any],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(compression());

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer as any, {
      context: async ({ req, res }) => ({
        request: req,
        response: res,
      }),
    })
  );

  app.get("/", (req, res) => {
    res.json({
      status_code: 200,
      message: "Halo",
    });
  });

  httpServer.listen(PORT as string, () => {
    console.log(`server started on ${PORT}!`);
  });
}

main();

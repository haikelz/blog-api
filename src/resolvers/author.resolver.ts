import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { redis } from "../configs/redis.config";
import { Author } from "../entities/author.entity";
import {
  AllAuthorResponse,
  AuthorProfileResponse,
  BaseResponse,
} from "../interfaces/response.interface";
import { AuthorService } from "../services/author.service";
import { ManageCache } from "../utils/manageCache";

@Resolver(Author)
export class AuthorResolver {
  private service: AuthorService;
  private manageCache: ManageCache;

  constructor() {
    this.service = new AuthorService();
    this.manageCache = new ManageCache();
  }

  @Query(() => AllAuthorResponse)
  async getAllAuthor() {
    const [cachedData, response] = await Promise.all([
      await this.manageCache.getDataFromCache("author:all"),
      await this.service.getAll(),
    ]);

    return {
      statusCode: 200,
      message: "Success get all author!",
      data: cachedData ? cachedData : response,
    };
  }

  @Query(() => AuthorProfileResponse)
  async getAuthorProfile(
    @Arg("email") email: string,
    @Arg("username") username: string
  ) {
    const [cachedData, response] = await Promise.all([
      await this.manageCache.getDataFromCache(`author:${email}:${username}`),
      await this.service.getByEmailAndUsername(email, username),
    ]);

    return {
      statusCode: 200,
      message: "Success get author profile!",
      data: cachedData ? cachedData : response,
    };
  }

  @Mutation(() => BaseResponse)
  async createAuthor(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("image") image: string,
    @Arg("description") description: string
  ) {
    await Promise.all([
      await this.service.create({ email, username, image, description }),
      await this.manageCache.setDataToCache(
        `author:${email}:${username}`,
        JSON.stringify({ email, username, image, description })
      ),
    ]);

    return {
      statusCode: 200,
      message: "Success create new Author!",
    };
  }

  @Mutation(() => BaseResponse)
  async editAuthorProfile(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("image") image: string,
    @Arg("description") description: string
  ) {
    await Promise.all([
      await this.service.update({ email, username, image, description }),
      await redis.hset(
        `author:${email}:${username}`,
        JSON.stringify({ image, description })
      ),
    ]);

    return {
      statusCode: 200,
      message: "Success edit Author!",
    };
  }

  @Mutation(() => BaseResponse)
  async deleteAuthor(
    @Arg("email") email: string,
    @Arg("username") username: string
  ) {
    await this.service.delete(email, username);

    return {
      statusCode: 200,
      message: "Success delete Author!",
    };
  }
}

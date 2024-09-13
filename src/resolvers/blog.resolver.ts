import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { redis } from "../config/redis.config";
import { Blog } from "../entities/blog.entity";
import {
  AllBlogResponse,
  BaseResponse,
} from "../interfaces/response.interface";
import { BlogService } from "../services/blog.service";

@Resolver(Blog)
export class BlogResolver {
  private service: BlogService;

  constructor() {
    this.service = new BlogService();
  }

  @Query(() => AllBlogResponse)
  async getAllBlog(
    @Arg("email") email: string,
    @Arg("username") username: string
  ) {
    const [cachedData, blogList] = await Promise.all([
      await redis.get(``),
      await this.service.getAll(email, username),
    ]);

    return {
      statusCode: 200,
      message: "Success get all blog!",
      data: cachedData ? cachedData : blogList,
    };
  }

  @Mutation(() => BaseResponse)
  async createBlog(
    @Arg("thumbnail") thumbnail: string,
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("tags", () => [String]) tags: string[]
  ) {
    await Promise.all([
      await this.service.create({
        thumbnail,
        email,
        username,
        title,
        content,
        tags,
      }),

      await this.service
        .getAll(email, username)
        .then(
          async (res) => await redis.set(`${uuidv4()}`, JSON.stringify(res))
        ),
    ]);

    return {
      statusCode: 200,
      message: "Success create new blog!",
    };
  }

  @Mutation(() => BaseResponse)
  async updateBlog(
    @Arg("slug") slug: string,
    @Arg("content") content: string,
    @Arg("thumbnail") thumbnail: string,
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("title") title: string
  ) {
    await Promise.all([
      await this.service.update({
        slug,
        content,
        thumbnail,
        email,
        username,
        title,
      }),

      await this.service
        .getAll(email, username)
        .then(
          async (res) => await redis.set(`${uuidv4()}`, JSON.stringify(res))
        ),
    ]);

    return {
      statusCode: 200,
      message: "Success update blog!",
    };
  }

  @Mutation(() => BaseResponse)
  async deleteBlog(
    @Arg("slug") slug: string,
    @Arg("email") email: string,
    @Arg("username") username: string
  ) {
    await this.service.delete({ slug, email, username });

    return {
      statusCode: 200,
      message: "Success delete blog!",
    };
  }
}

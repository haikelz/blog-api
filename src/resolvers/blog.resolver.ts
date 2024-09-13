import { Arg, Mutation, Query, Resolver } from "type-graphql";
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
  async getAllBlog() {
    const blogList = await this.service.getAll();

    return {
      statusCode: 200,
      message: "Success get all blog!",
      data: blogList,
    };
  }

  @Mutation(() => BaseResponse)
  async createBlog(
    @Arg("thumbnail") thumbnail: string,
    @Arg("author") author: string,
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("tags", () => [String]) tags: string[]
  ) {
    await this.service.create({ thumbnail, author, title, content, tags });

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
    @Arg("author") author: string,
    @Arg("title") title: string
  ) {
    await this.service.update({ slug, content, thumbnail, author, title });

    return {
      statusCode: 200,
      message: "Success update blog!",
    };
  }

  @Mutation(() => BaseResponse)
  async deleteBlog(@Arg("slug") slug: string) {
    await this.service.delete(slug);

    return {
      statusCode: 200,
      message: "Success delete blog!",
    };
  }
}

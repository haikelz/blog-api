import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Author } from "../entities/author.entity";
import {
  AllAuthorResponse,
  AuthorProfileResponse,
  BaseResponse,
} from "../interfaces/response.interface";
import { AuthorService } from "../services/author.service";

@Resolver(Author)
export class AuthorResolver {
  private service: AuthorService;

  constructor() {
    this.service = new AuthorService();
  }

  @Query(() => AllAuthorResponse)
  async getAllAuthor() {
    const response = await this.service.getAll();

    return {
      statusCode: 200,
      message: "Success get all author!",
      data: response,
    };
  }

  @Query(() => AuthorProfileResponse)
  async getAuthorProfile(
    @Arg("email") email: string,
    @Arg("username") username: string
  ) {
    const response = await this.service.getByEmailAndUsername(email, username);

    return {
      statusCode: 200,
      message: "Success get author profile!",
      data: response,
    };
  }

  @Mutation(() => BaseResponse)
  async createAuthor(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("image") image: string,
    @Arg("description") description: string
  ) {
    await this.service.create({ email, username, image, description });

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
    await this.service.update({ email, username, image, description });

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

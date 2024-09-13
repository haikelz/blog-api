import { Field, ObjectType } from "type-graphql";
import { Author } from "../entities/author.entity";
import { Blog } from "../entities/blog.entity";

@ObjectType()
export class BaseResponse {
  @Field()
  statusCode: number;

  @Field()
  message: string;
}

@ObjectType()
export class AllBlogResponse extends BaseResponse {
  @Field(() => Blog)
  data: Blog;
}

@ObjectType()
export class AuthorProfileResponse extends BaseResponse {
  @Field(() => Author)
  data: Author;
}

@ObjectType()
export class AllAuthorResponse extends BaseResponse {
  @Field(() => [Author])
  data: Author[];
}

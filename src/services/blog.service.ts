import slugify from "slugify";
import AppDataSource from "../configs/typeorm.config";
import { Blog } from "../entities/blog.entity";

export class BlogService {
  public async getAll(email: string, username: string) {
    const response = await AppDataSource.getRepository(Blog).find({
      where: {
        author: { email, username },
      },
    });

    return response;
  }

  public async getBySlug(params: {
    slug: string;
    email: string;
    username: string;
  }) {
    const response = await AppDataSource.getRepository(Blog).findOne({
      where: {
        author: {
          email: params.email,
          username: params.username,
        },
        slug: params.slug,
      },
    });

    return response;
  }

  public async create(params: {
    thumbnail: string;
    email: string;
    username: string;
    content: string;
    title: string;
    tags: string[];
  }): Promise<void> {
    await AppDataSource.getRepository(Blog)
      .create({
        slug: slugify(params.title, { lower: true }),
        thumbnail: params.thumbnail,
        title: params.title,
        content: params.content,
        author: {
          email: params.email,
          username: params.username,
        },
        tags: params.tags,
      })
      .save();
  }

  public async update(params: {
    slug: string;
    content: string;
    thumbnail: string;
    email: string;
    username: string;
    title: string;
  }) {
    await AppDataSource.createQueryBuilder()
      .update(Blog)
      .set({
        content: params.content,
        thumbnail: params.thumbnail,
        author: {
          email: params.email,
          username: params.username,
        },
        title: params.title,
      })
      .where("slug = :slug", { slug: params.slug })
      .execute();
  }

  public async delete(params: {
    slug: string;
    email: string;
    username: string;
  }) {
    await Promise.all([
      await AppDataSource.getRepository(Blog).delete({
        slug: params.slug,
        author: {
          email: params.email,
          username: params.username,
        },
      }),
    ]);
  }
}

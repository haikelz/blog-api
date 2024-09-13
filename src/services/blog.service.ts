import slugify from "slugify";
import { AppDataSource } from "../config/typeorm.config";
import { Blog } from "../entities/blog.entity";

export class BlogService {
  public async create(params: {
    thumbnail: string;
    author: string;
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
        tags: params.tags,
      })
      .save();
  }

  public async getAll() {
    const response = await AppDataSource.getRepository(Blog).find();
    return response;
  }

  public async getBySlug() {}

  public async update(params: {
    slug: string;
    content: string;
    thumbnail: string;
    author: string;
    title: string;
  }) {
    await AppDataSource.createQueryBuilder()
      .update(Blog)
      .set({
        content: params.content,
        thumbnail: params.thumbnail,
        author: params.author,
        title: params.title,
      })
      .where("slug = :slug", { slug: params.slug })
      .execute();
  }

  public async delete(slug: string) {
    await AppDataSource.getRepository(Blog).delete({ slug });
  }
}

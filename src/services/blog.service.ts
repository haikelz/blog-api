import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "../config/typeorm.config";
import { Blog } from "../entities/blog.entity";
import { ManageCache } from "../utils/manageCache";

export class BlogService {
  private manageCache: ManageCache;

  constructor() {
    this.manageCache = new ManageCache();
  }

  public async getAll(email: string, username: string) {
    const response = await AppDataSource.getRepository(Blog).find({
      where: {
        author: { email, username },
      },
    });
    const cachedData = await this.manageCache.getDataFromCache(`${uuidv4()}`);

    if (cachedData) {
      return cachedData;
    } else {
      return response;
    }
  }

  public async getBySlug() {}

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
    await AppDataSource.getRepository(Blog).delete({
      slug: params.slug,
      author: {
        email: params.email,
        username: params.username,
      },
    });
  }
}

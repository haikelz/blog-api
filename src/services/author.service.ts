import AppDataSource from "../configs/typeorm.config";
import { Author } from "../entities/author.entity";
import { ManageCache } from "../utils/manageCache";

export class AuthorService {
  private manageCache: ManageCache;

  constructor() {
    this.manageCache = new ManageCache();
  }

  public async getAll() {
    const response = await AppDataSource.getRepository(Author).find();
    return response;
  }

  public async getByEmailAndUsername(email: string, username: string) {
    const [cachedData, response] = await Promise.all([
      await this.manageCache.getDataFromCache(`author:${email}:${username}`),
      await AppDataSource.getRepository(Author).findOne({
        where: {
          email,
          username,
        },
      }),
    ]);

    console.log(cachedData);

    return response;
    /*
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      return response;
    }*/
  }

  public async create(params: {
    email: string;
    username: string;
    image: string;
    description: string;
  }) {
    await Promise.all([
      await AppDataSource.getRepository(Author)
        .create({
          email: params.email,
          username: params.username,
          image: params.image,
          description: params.description,
        })
        .save(),

      await this.manageCache.setDataToCache(
        `author:${params.email}:${params.username}`,
        JSON.stringify({
          email: params.email,
          username: params.username,
          image: params.image,
          description: params.description,
        })
      ),
    ]);

    await AppDataSource.getRepository(Author)
      .create({
        email: params.email,
        username: params.username,
        image: params.image,
        description: params.description,
      })
      .save();
  }

  public async update(params: {
    email: string;
    username: string;
    image: string;
    description: string;
  }) {
    await Promise.all([
      await AppDataSource.createQueryBuilder()
        .update(Author)
        .set({ image: params.image, description: params.description })
        .where({
          email: params.email,
          username: params.username,
        })
        .execute(),

      await this.manageCache.setDataToCache(
        `author:${params.email}:${params.username}`,
        JSON.stringify({
          email: params.email,
          username: params.username,
          image: params.image,
          description: params.description,
        })
      ),
    ]);
  }

  public async delete(email: string, username: string) {
    await AppDataSource.getRepository(Author).delete({ email, username });
  }
}

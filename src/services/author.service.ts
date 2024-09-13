import { AppDataSource } from "../config/typeorm.config";
import { Author } from "../entities/author.entity";

export class AuthorService {
  public async getAll() {
    const response = await AppDataSource.getRepository(Author).find();
    return response;
  }

  public async getByEmailAndUsername(email: string, username: string) {
    const response = await AppDataSource.getRepository(Author).findOne({
      where: {
        email,
        username,
      },
    });

    return response;
  }

  public async create(params: {
    email: string;
    username: string;
    image: string;
    description: string;
  }) {
    await AppDataSource.getRepository(Author)
      .create({
        email: params.email,
        username: params.email,
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
    await AppDataSource.createQueryBuilder()
      .update(Author)
      .where({
        email: params.email,
      })
      .execute();
  }

  public async delete(email: string, username: string) {
    await AppDataSource.getRepository(Author).delete({ email, username });
  }
}
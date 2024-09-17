import { redis } from "../configs/redis.config";

// Cache management using Redis
export class ManageCache {
  public async getDataFromCache(key: string) {
    const cachedData = await redis.get(key);
    return cachedData;
  }

  public async setDataToCache(
    key: string,
    data: string,
    expire: number = 60 * 60 * 24
  ) {
    await redis.set(key, data, "EX", expire);
  }

  public async addDataToExistingCache(key: string, data: string) {
    await redis.append(key, data);
  }

  public async deleteCache(key: string) {
    await redis.del(key);
  }
}

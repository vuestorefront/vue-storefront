import IORedis, { Redis, RedisOptions } from 'ioredis';

export interface Options {
  setTagsTTL?: boolean,
  defaultTimeout?: number,
  redis?: RedisOptions
}

class TagCache {
  private redis: Redis;
  private options: Options;

  public constructor (options: Options = { setTagsTTL: true }) {
    this.redis = new IORedis(options.redis || {});
    this.options = options;
  }

  public get = async (...keys: string[]): Promise<any> => {
    try {
      return this.redis.mget(keys.map(key => `data:${key}`)).then(res => {
        try {
          // Special case for single element gets
          if (res.length === 1) return res[0] !== null ? JSON.parse(res[0]) : null;
          return res.map(elem => elem !== null ? JSON.parse(elem) : null);
        } catch (err) {
          return res;
        }
      });
    } catch (err) {
      return Promise.reject(err);
    }
  };

  public set = async (
    key: string,
    data: any,
    tags: string[],
    options: {
      timeout?: number
    } = {}
  ): Promise<void> => {
    try {
      const multi = this.redis.multi();

      const timeout =
        (options && options.timeout) || this.options.defaultTimeout;

      // Add the key to each of the tag sets
      for (const tag of tags) {
        const tagKey = `tags:${tag}`;
        multi.sadd(tagKey, key);

        if (!timeout || !this.options.setTagsTTL) {
          continue;
        }

        multi.expire(tagKey, timeout);
      }

      // Add the data to the key
      if (typeof timeout === 'number') {
        multi.set(`data:${key}`, JSON.stringify(data), 'ex', timeout);
      } else {
        multi.set(`data:${key}`, JSON.stringify(data));
      }
      await multi.exec();
      return;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  // How invalidation by tag works:
  // 1. Get all the keys associated with all the passed-in tags (tags:${tag})
  // 2. Delete all the keys data (data:${key})
  // 3. Delete all the tags (tags:${tag})
  public invalidate = async (...tags: string[]): Promise<void> => {
    try {
      const keys = ([] as string[]).concat.apply(
        [],
        await Promise.all(tags.map(tag => this.redis.smembers(`tags:${tag}`)))
      );

      const pipeline = this.redis.pipeline();

      keys.forEach(key => {
        pipeline.del(`data:${key}`);
      });

      tags.forEach(tag => {
        pipeline.del(`tags:${tag}`);
      });

      await pipeline.exec();
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

export default TagCache;

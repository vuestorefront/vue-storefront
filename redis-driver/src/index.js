import Redis from 'redis-tag-cache';

const defaultRedisOptions = {
  maxRetriesPerRequest: 3
};

export default function RedisCache (opt) {
  const options = {
    ...opt,
    redis: {
      ...opt?.redis,
      ...defaultRedisOptions
    }
  };
  const client = new Redis(options);

  return {
    async invoke({ route, render, getTags }) {
      const key = `page:${ route }`;
      const cachedResponse = await client.get(key);

      if (cachedResponse) {
        return cachedResponse;
      }

      const content = await render();
      const tags = getTags();

      if (!tags.length) {
        return content;
      }

      // We could add "await" here, but saving content in cache doesn't have to block the request
      client.set(
        key,
        content,
        tags
      );

      return content;
    },

    invalidate({ tags }) {
      const clearAll = tags.includes('*');

      if (!clearAll) {
        return client.invalidate(...tags)
      }

      return new Promise((resolve, reject) => {
        const prefix = `${options.redis.keyPrefix || ''}tags:`;
        const stream = client.redis.scanStream({ match: `${prefix}*` });

        const tags = [];

        stream.on('data', rawTags => tags.push(...rawTags.map(tag => tag.replace(prefix, ''))));
        stream.on('end', async () => {
          if (tags.length) {
            await client.invalidate(...tags);
          }
          resolve();
        });
        stream.on('error', reject);
      });
    }
  };
};

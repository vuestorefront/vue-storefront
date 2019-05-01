// eslint-disable-next-line @typescript-eslint/no-var-requires
import TagCache from 'redis-tag-cache';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('config');
let cache = false;

if (config.server.useOutputCache) {
  const cacheVersionPath = path.resolve(
    path.join('core', 'build', 'cache-version.json')
  );
  const cacheKey = JSON.parse(fs.readFileSync(cacheVersionPath) || '');
  const redisConfig = Object.assign(config.redis, { keyPrefix: cacheKey });

  console.log('Redis cache set', redisConfig);

  cache = new TagCache({
    redis: redisConfig,
    defaultTimeout: config.server.outputCacheDefaultTtl
  });
}

module.exports = cache;

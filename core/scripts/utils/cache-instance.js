const fs = require('fs')
const path = require('path')
const TagCache = require('redis-tag-cache').default
const config = require('config')

module.exports = () => {
  if (config.server.useOutputCache) {
    return false
  }

  const cacheVersionPath = path.join(__dirname, '..', 'build', 'cache-version.json')
  const cacheKey = JSON.parse(fs.readFileSync(cacheVersionPath) || '')
  const redisConfig = Object.assign(config.redis, { keyPrefix: cacheKey })

  console.log('Redis cache set', redisConfig)

  return new TagCache({
    redis: redisConfig,
    defaultTimeout: config.server.outputCacheDefaultTtl
  })
}

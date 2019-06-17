const fs = require('fs')
const path = require('path')
const TagCache = require('redis-tag-cache').default
const config = require('config')
let cache = false

if (config.server.useOutputCache) {
  const cacheVersionPath = path.resolve(path.join('core', 'build', 'cache-version.json'))
  let cacheKey = ''
  try {
    cacheKey = JSON.parse(fs.readFileSync(cacheVersionPath) || '')
  } catch (err) {
    console.error(err)
  }
  const redisConfig = Object.assign(config.redis, { keyPrefix: cacheKey })

  console.log('Redis cache set', redisConfig)

  cache = new TagCache({
    redis: redisConfig,
    defaultTimeout: config.server.outputCacheDefaultTtl
  })
}

module.exports = cache

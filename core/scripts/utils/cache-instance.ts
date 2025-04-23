import TagCache from './redis-tag-cache'

const fs = require('fs')
const path = require('path')
const config = require('config')

export function cacheInstanceFactory () {
  let cache: false | TagCache = false

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
      defaultTimeout: config.server.outputCacheDefaultTtl,
      setTagsTTL: true
    })
  }

  return cache;
}

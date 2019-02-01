import { Logger } from '@vue-storefront/core/lib/logger'

const program = require('commander')
const config = require('config')
const TagCache = require('redis-tag-cache').default

let cache
if (config.server.useOutputCache) {
  cache = new TagCache({
    redis: config.redis,
    defaultTimeout: config.server.outputCacheDefaultTtl // Expire records after a day (even if they weren't invalidated)
  })
  Logger.log('Redis cache set', config.redis)()
} else {
  Logger.error('Output cache is disabled in the config')()
}

program
  .command('clear')
  .option('-t|--tag <tag>', 'tag name, available tags: ' + config.server.availableCacheTags.join(', '), '*')
  .action((cmd) => { // TODO: add parallel processing
    if (!cmd.tag) {
      Logger.error('error: tag must be specified')()
      process.exit(1)
    } else {
      Logger.log(`Clear cache request for [${cmd.tag}]`)()
      let tags = []
      if (cmd.tag === '*') {
        tags = config.server.availableCacheTags
      } else {
        tags = cmd.tag.split(',')
      }
      const subPromises = []
      tags.forEach(tag => {
        if (config.server.availableCacheTags.indexOf(tag) >= 0 || config.server.availableCacheTags.find(t => {
          return tag.indexOf(t) === 0
        })) {
          subPromises.push(cache.invalidate(tag).then(() => {
            Logger.log(`Tags invalidated successfully for [${tag}]`)()
          }))
        } else {
          Logger.error(`Invalid tag name ${tag}`)()
        }
      })
      Promise.all(subPromises).then(r => {
        Logger.log(`All tags invalidated successfully [${cmd.tag}]`)()
        process.exit(0)
      }).catch(error => {
        Logger.error(error)()
      })
    }
  })

program.parse(process.argv)

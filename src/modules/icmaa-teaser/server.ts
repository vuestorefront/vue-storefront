import appConfig from 'config'
import { serverHooks } from '@vue-storefront/core/server/hooks'
import path from 'path'
import { promises as fs } from 'fs'

serverHooks.afterApplicationInitialized(({ app }) => {
  const storeCodes = appConfig.storeViews.mapStoreUrlsFor
  const storeCodesStr = storeCodes.join('|')
  const filePath = path.resolve(__dirname, 'resource/i18n/en-US.csv')

  const sendFile = async (req, res): Promise<any[]> => {
    const csv = await fs.readFile(filePath, 'utf8').then(v => v)
    let phrases = []

    const regex = /^(")(.*)(")$/gm
    csv.split('\n')
      .filter(l => l.length > 0)
      .forEach(line => {
        const [ key, name ] = line.split(',').map(v => v.replace(regex, '$2'))
        phrases.push({ name, value: name })
      })

    return phrases
  }

  const getTranslations = async (req, res) => {
    // We could add caching – but it's just an IO action – so I think it shouldn't create any load
    // if (appConfig.server.useOutputCache) {
    //   const cache = require('@vue-storefront/core/scripts/utils/cache-instance')
    //   const cacheKey = 'default-translations'
    //   const cacheTags = ['cms']

    //   cache.get(cacheKey).then(output => {
    //     if (output !== null) {
    //       res.setHeader('X-VS-Cache', 'Hit')
    //       res.setHeader('X-VS-Cache-Tags', cacheTags.join(' '))
    //       return res.json(output)
    //     } else {
    //       res.setHeader('X-VS-Cache', 'Miss')
    //       return sendFile(req, res)
    //         .then(v => cache.set(cacheKey, v, cacheTags))
    //         .then(v => res.json(v))
    //     }
    //   })
    // } else {
    //   return sendFile(req, res).then(v => res.json(v))
    // }

    res.header('Access-Control-Allow-Origin', '*')
      .header('Access-Control-Allow-Methods', 'GET')
      .header('Access-Control-Allow-Headers', 'Content-Type')

    return sendFile(req, res).then(v => res.json(v))
  }

  app.get('/default-translations.json', getTranslations)
  app.get(new RegExp(`/(${storeCodesStr})/default-translations.json`), getTranslations)
})

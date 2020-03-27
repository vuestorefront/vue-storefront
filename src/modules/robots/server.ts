import appConfig from 'config'
import path from 'path'
import { serverHooks } from '@vue-storefront/core/server/hooks'

serverHooks.afterApplicationInitialized(({ app }) => {
  const storeCodes = appConfig.storeViews.mapStoreUrlsFor
  const storeCodesStr = storeCodes.join('|')
  const robotsFilePath = path.resolve(__dirname, 'robots.txt')

  app.get('/robots.txt', (req, res) => {
    res.sendFile(robotsFilePath)
  })

  app.get(new RegExp(`/(${storeCodesStr})/robots.txt`), (req, res) => {
    res.sendFile(robotsFilePath)
  })
})

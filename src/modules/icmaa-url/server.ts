import appConfig from 'config'
import { serverHooks } from '@vue-storefront/core/server/hooks'

if (appConfig.storeViews.multistore) {
  serverHooks.afterApplicationInitialized(({ app }) => {
    const storeCodes = appConfig.storeViews.mapStoreUrlsFor
    const blacklist = [
      '__webpack_hmr',
      'invalidate'
    ]

    const blacklistStr = blacklist.join('|')
    const storeCodesStr = storeCodes.join('|')
    const hasStoreCode = new RegExp(
      `^((?!\\/(${storeCodesStr})(\\/|$))(?!\\/(${blacklistStr})$))\\/?.*((?<=\\.html)|(?<!\\.[a-zA-Z0-9]*))$`
    )

    app.get(hasStoreCode, (req, res) => {
      const { path } = req
      const newUrl = '/' + storeCodes[0] + path

      let query = ''
      if (Object.values(req.query).length > 0) {
        const params = new URLSearchParams(req.query)
        query += '?' + params.toString()
      }

      res.redirect(newUrl + query)

      console.log('Redirect to default:', newUrl)
    })
  })
}

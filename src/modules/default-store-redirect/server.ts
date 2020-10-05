import appConfig from 'config'
import { serverHooks } from '@vue-storefront/core/server/hooks'
import { defaultStoreRedirectHooksExecutors } from './hooks'

/**
 * Redirect requests without a store code to the default (or first) store
 */
if (appConfig.storeViews.multistore && appConfig.defaultStoreCodeRedirect.enabled) {
  serverHooks.afterApplicationInitialized(({ app }) => {
    const blacklist = appConfig.defaultStoreCodeRedirect.blacklist
    const storeCodes = appConfig.storeViews.mapStoreUrlsFor

    const blacklistStr = blacklist.join('|')
    const storeCodesStr = storeCodes.join('|')
    const hasStoreCode = new RegExp(
      `^((?!\\/(${storeCodesStr})(\\/|$))(?!\\/(${blacklistStr})$))\\/?.*((?<=\\.html)|(?<!\\.[a-zA-Z0-9]*))$`
    )

    app.get(hasStoreCode, (req, res) => {
      const { path } = req

      // use default storeCode if set
      let storeCode = appConfig.defaultStoreCode
      // if no default storeCode, use first store in list
      if (storeCode === '') {
        storeCode = storeCodes[0]
      }

      // Allow other modules to add custom logic for finding the right store to redirect
      storeCode = defaultStoreRedirectHooksExecutors.beforeRedirectToDefaultStore(storeCode)

      const newUrl = '/' + storeCode + path

      // persist any queries
      let query = ''
      if (Object.values(req.query).length > 0) {
        const params = new URLSearchParams(req.query)
        query += '?' + params.toString()
      }

      res.redirect(newUrl + query)
    })
  })
}

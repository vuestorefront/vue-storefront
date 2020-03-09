import { externalCheckout as config } from 'config'
import { serverHooks } from '@vue-storefront/core/server/hooks'

if (config.enableCookieSessionTransfer && config.httpOnlySupport) {
  serverHooks.afterApplicationInitialized(({ app }) => {
    const domain: string = config.shopUrl.replace(/^(https*:\/\/)/gm, '')

    app.get('/vsf/external-checkout-cookie-logout', (req, res) => {
      res.clearCookie('frontend', { domain })
      res.json({ status: 200, message: 'Cookies deleted' })
    })

    app.get('/vsf/external-checkout-cookie-test', (req, res) => {
      res.cookie('frontend', Date.now(), { httpOnly: true, domain })
      res.json({ status: 200, message: 'Set cookie' })
    })
  })
}

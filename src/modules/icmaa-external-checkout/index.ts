import Vue from 'vue'
import VueCookies from 'vue-cookies'

import config, { externalCheckout as checkoutConfig } from 'config'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { once } from '@vue-storefront/core/helpers'
import { userHooks } from '@vue-storefront/core/modules/user/hooks'
import { isServer } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'

import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'

import { getCookieHostname } from './helper'
import { beforeEachGuard } from './router/beforeEach'
import moduleRoutes from './routes'

export const KEY = 'external-checkout'

export const IcmaaExternalCheckoutModule: StorefrontModule = function ({ router, store }) {
  if (!isServer && checkoutConfig.enableCookieSessionTransfer) {
    once('__VUE_EXTEND_COOKIES__', () => {
      Vue.use(VueCookies)
    })

    EventBus.$on('session-after-nonauthorized', async () => {
      const customerToken = Vue.$cookies.get('vsf_token_customer')
      const quoteToken = Vue.$cookies.get('vsf_token_quote')
      const lastOrderToken = Vue.$cookies.get('vsf_token_lastorder')

      if (!store.getters['user/isLoggedIn'] && (customerToken || quoteToken || lastOrderToken)) {
        if (customerToken) {
          Logger.info('Customer token found in cookie – try to login:', 'external-checkout', customerToken)()
          store.dispatch('user/startSessionWithToken', customerToken).then(() => {
            Vue.$cookies.remove('vsf_token_customer', undefined, getCookieHostname())
            Vue.$cookies.remove('vsf_token_lastorder', undefined, getCookieHostname())
          })
        }

        if (quoteToken) {
          Logger.info('Quote token found in cookie – try to reconnect with:', 'external-checkout', quoteToken)()
          store.dispatch('cart/reconnect', { token: quoteToken }).then(() => {
            Vue.$cookies.remove('vsf_token_quote', undefined, getCookieHostname())
          })
        }

        if (!customerToken && lastOrderToken) {
          Logger.info('Last-order token found in cookie – try to load last order:', 'external-checkout', lastOrderToken)()
          store.dispatch('user/loadLastOrderToHistory', { token: lastOrderToken }).then(() => {
            Vue.$cookies.remove('vsf_token_lastorder', undefined, getCookieHostname())
          })
        }
      }
    })

    userHooks.afterUserUnauthorize(async () => {
      if (checkoutConfig.httpOnlySupport) {
        // As Magento sets HTTP-Only cookies to prevent XSS attacks,
        // it is only possible to delete the session cookie using a non-client-/SSR-request.
        // So there is a special route for it to call using a server-side request.
        // The `{ credentials: 'include' }` is an important part to transfer cookies to SSR.
        await fetch('/vsf/external-checkout-cookie-logout/', { credentials: 'include' })
          .then(r => r.json())
          .then(json => {
            Logger.info('Remove Magento session-cookie', 'external-checkout', json)()
          })
      } else {
        // If Magento isn't using HTTP-Only cookies, just use `vue-cookies` to remove the session cookies.
        Logger.info('Remove Magento session-cookie', 'external-checkout', Vue.$cookies.get('frontend'))()
        Vue.$cookies.remove('frontend')
      }
    })
  }

  router.beforeEach(beforeEachGuard)
  setupMultistoreRoutes(config, router, moduleRoutes, 10)
}

import Vue from 'vue'
import VueGtm from 'vue-gtm'
import { Store } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { isServer } from '@vue-storefront/core/helpers'

import { claimCollection } from 'theme/store/claims'

export const isEnabled = async (config: any): Promise<boolean> => {
  if (isServer) {
    return false
  }

  const { id, forceCookieAccept } = config
  const cookie = await claimCollection(false).getItem('cookiesAccepted')
  const accepted = (!forceCookieAccept || (cookie && cookie.value === true))
  return typeof id === 'string' && id.length > 0 && !isServer && accepted
}

export async function afterRegistration (config, store: Store<any>) {
  const enabled = await isEnabled(config.googleTagManager)
  if (!enabled) {
    return
  }

  const GTM: VueGtm = (Vue as any).gtm

  const storeView = currentStoreView()
  const currencyCode = storeView.i18n.currencyCode

  const getProduct = item => store.getters['icmaaGoogleTagManager/getGTMProductDTO'](item)

  store.subscribe(({ type, payload }, state) => {
    // Adding a Product to a Shopping Cart
    if (type === 'cart/cart/ADD') {
      GTM.trackEvent({
        event: 'addToCart',
        ecommerce: {
          currencyCode: currencyCode,
          add: {
            products: [getProduct(payload.product)]
          }
        }
      })
    }

    // Removing a Product from a Shopping Cart
    if (type === 'cart/cart/DEL') {
      GTM.trackEvent({
        event: 'removeFromCart',
        ecommerce: {
          remove: {
            products: [getProduct(payload.product)]
          }
        }
      })
    }
  })
}

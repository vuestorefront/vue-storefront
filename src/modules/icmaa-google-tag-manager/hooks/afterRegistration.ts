import Vue from 'vue'
import VueGtm from 'vue-gtm'
import { Store } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { isServer } from '@vue-storefront/core/helpers'

import { claimCollection } from 'theme/store/claims'

export const isEnabled = async (gtmId: string | null) => {
  const cookie = await claimCollection(false).getItem('cookiesAccepted')
  return typeof gtmId === 'string' && gtmId.length > 0 && !isServer && (cookie && cookie.value === true)
}

export async function afterRegistration (config, store: Store<any>) {
  const enabled = await isEnabled(config.googleTagManager.id)
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

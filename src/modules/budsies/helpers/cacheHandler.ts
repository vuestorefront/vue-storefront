
import { Logger } from '@vue-storefront/core/lib/logger'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { CART_LOAD_CART_SERVER_TOKEN } from '@vue-storefront/core/modules/cart/store/mutation-types';

import * as types from '../store/mutation-types'
import getCartTokenCookieKey from './get-cart-token-cookie-key.function';

export function cacheHandlerFactory (Vue) {
  const cartTokenCookieKey = getCartTokenCookieKey();

  return (mutation, state) => {
    const type = mutation.type;

    if (type.endsWith(types.CUSTOMER_EMAIL_SET)) {
      return StorageManager.get(types.SN_BUDSIES).setItem('customer-email', state.budsies.customerEmail).catch((reason) => {
        Logger.error(reason)()
      })
    }

    if (type.endsWith(CART_LOAD_CART_SERVER_TOKEN)) {
      const token = mutation.payload;

      if (!token) {
        return Vue.$cookies.remove(
          cartTokenCookieKey
        )
      }

      return Vue.$cookies.set(
        cartTokenCookieKey,
        token,
        '3m',
        null,
        null,
        null,
        'Strict'
      )
    }
  }
}

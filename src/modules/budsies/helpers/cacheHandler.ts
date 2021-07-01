import * as types from '../store/mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger'

import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export function cacheHandlerFactory (Vue) {
  return (mutation, state) => {
    const type = mutation.type;

    if (type.endsWith(types.CUSTOMER_EMAIL_SET)) {
      return StorageManager.get(types.SN_BUDSIES).setItem('customer-email', state.budsies.customerEmail).catch((reason) => {
        Logger.error(reason)()
      })
    }
  }
}

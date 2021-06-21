import * as types from '../store/mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger'

import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export function cacheHandlerFactory (Vue) {
  return (mutation, state) => {
    const type = mutation.type;

    if (type.endsWith(types.CURRENT_PLUSHIE_ID_SET)) {
      return StorageManager.get(types.SN_BUDSIES).setItem('current-plushie-id', state.budsies.currentPlushieId).catch((reason) => {
        Logger.error(reason)()
      })
    }
  }
}

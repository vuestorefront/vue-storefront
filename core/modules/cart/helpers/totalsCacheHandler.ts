import * as types from '../store/mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger'

import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export const totalsCacheHandlerPlugin = ({ type }, state) => {
  if (
    type.endsWith(types.CART_UPD_TOTALS)
  ) {
    return StorageManager.get('cart').setItem('current-totals', {
      platformTotalSegments: state.cart.platformTotalSegments,
      platformTotals: state.cart.platformTotals
    }).catch((reason) => {
      Logger.error(reason)()
    })
  }
}

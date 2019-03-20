import * as types from './mutation-types'
import { cacheStorage } from '../'
import { Logger } from '@vue-storefront/core/lib/logger'

export function plugin (mutation, state) {
  const type = mutation.type
  if (type.includes(types.WISH_ADD_ITEM) || type.includes(types.WISH_DEL_ITEM)) { // check if this mutation is wishlist related
    cacheStorage.setItem('current-wishlist', state.wishlist.items).catch((reason) => {
      Logger.error(reason, 'wishlist') // it doesn't work on SSR
    })
  }
}

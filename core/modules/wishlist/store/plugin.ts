import * as types from './mutation-types'
import { cacheStorage } from '../'

export function plugin (mutation, state) {
  const type = mutation.type

  if (type.startsWith(types.SN_WISHLIST)) { // check if this mutation is wishlist related
    cacheStorage.setItem('current-wishlist', state.wishlist.items).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  }
}
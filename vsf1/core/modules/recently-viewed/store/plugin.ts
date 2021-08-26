import * as types from './mutation-types'
import { cacheStorage } from '../'
import { Logger } from '@vue-storefront/core/lib/logger'

export function plugin (mutation, state) {
  const type = mutation.type

  if (type.startsWith(types.SN_RECENTLY_VIEWED)) { // check if this mutation is recently-viewed related
    cacheStorage.setItem('recently-viewed', state['recently-viewed'].items).catch((reason) => {
      Logger.error(reason)() // it doesn't work on SSR
    })
  }
}

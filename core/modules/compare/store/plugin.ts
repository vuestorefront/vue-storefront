import * as types from './mutation-types'
import { cacheStorage } from '../'
import { Logger } from '@vue-storefront/core/lib/logger'

export function plugin (mutation, state) {
  const type = mutation.type

  if (type.startsWith(types.SN_COMPARE)) { // check if this mutation is comapre related
    cacheStorage.setItem('current-compare', state.compare.items).catch((reason) => {
      Logger.error(reason, 'compare') // it doesn't work on SSR
    })
  }
}

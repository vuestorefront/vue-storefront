import * as types from './mutation-types'
import { cacheStorage } from '../'
import { Logger } from '@vue-storefront/core/lib/logger'

export function plugin (mutation, state) {
  const type = mutation.type

  if ([types.COMPARE_ADD_ITEM, types.COMPARE_DEL_ITEM, types.COMPARE_LOAD_COMPARE].includes(type)) { // check if this mutation is comapre related
    cacheStorage.setItem('current-compare', state.compare.items).catch((reason) => {
      Logger.error(reason, 'compare') // it doesn't work on SSR
    })
  }
}

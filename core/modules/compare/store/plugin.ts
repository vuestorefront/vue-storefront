import * as types from './mutation-types'
import { cacheStorage } from '../'
import { Logger } from '@vue-storefront/core/lib/logger'

export function plugin (mutation, state) {
  const type = mutation.type

  if (type === types.SN_COMPARE  + '/' + types.COMPARE_ADD_ITEM || types.SN_COMPARE + '/' + type === types.COMPARE_DEL_ITEM) { // check if this mutation is comapre related
    cacheStorage.setItem('current-compare', state.compare.items).catch((reason) => {
      Logger.error(reason, 'compare') // it doesn't work on SSR
    })
  }
}

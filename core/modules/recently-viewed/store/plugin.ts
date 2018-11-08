import { getMutationData } from '@vue-storefront/store'
import * as types from './mutation-types'
import { cacheStorage } from '../'

export function plugin (mutation, state) {
  let { storeName, actionName } = getMutationData(mutation.type)
  if (storeName === types.SN_RECENTLY_VIEWED) { // check if this mutation is recently-viewed related
    cacheStorage.setItem(storeName, state[storeName].items).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  }
}

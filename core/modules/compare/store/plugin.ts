import { getMutationData } from '@vue-storefront/store'
import * as types from './mutation-types'
import { cacheStorage } from '../'

export function plugin (mutation, state) {
  let { storeName, actionName } = getMutationData(mutation.type)
  if (storeName === types.SN_COMPARE) { // check if this mutation is comapre related
    cacheStorage.setItem('current-compare', state.compare.items).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  }
}
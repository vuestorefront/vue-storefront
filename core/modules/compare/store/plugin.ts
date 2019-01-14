import * as types from './mutation-types'
import { cacheStorage } from '../'

export function plugin (mutation, state) {
  const type = mutation.type

  if (type.startsWith(types.SN_COMPARE)) { // check if this mutation is comapre related
    cacheStorage.setItem('current-compare', state.compare.items).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  }
}
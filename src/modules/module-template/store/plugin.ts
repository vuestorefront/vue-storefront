import * as types from './mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger'

export function plugin (mutation, state) {
  if (types[mutation.type]) {
    Logger.info('performed mutation from this store with type' + mutation.type)()
  } else {
    Logger.info('performed mutation from other store with type' + mutation.type)()
  }
}

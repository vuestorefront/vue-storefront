import * as types from './mutation-types'

export function plugin (mutation, state) {
  if (types[mutation.type]) {
    console.info('performed mutation from this store with type', mutation.type)
  } else {
    console.info('performed mutation from other store with type', mutation.type)
  }
}
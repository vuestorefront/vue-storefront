import * as types from './mutation-types'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

const mutationToWatch = [types.WISH_ADD_ITEM, types.WISH_DEL_ITEM]
  .map(m => `wishlist/${m}`)

const whishListStorage = StorageManager.get('wishlist')

const whishListPersistPlugin = (mutation, state) => {
  if (mutationToWatch.includes(mutation.type)) {
    whishListStorage.setItem('current-wishlist', state.wishlist.items)
  }
}

export default whishListPersistPlugin

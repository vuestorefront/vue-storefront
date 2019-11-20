import * as types from './mutation-types'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

const mutationToWatch = [types.WISH_ADD_ITEM, types.WISH_DEL_ITEM, types.WISH_DEL_ALL_ITEMS]
  .map(m => `wishlist/${m}`)

const whishListPersistPlugin = (mutation, state) => {
  const whishListStorage = StorageManager.get('wishlist')

  if (mutationToWatch.includes(mutation.type)) {
    whishListStorage.setItem('current-wishlist', state.wishlist.items)
  }
}

export default whishListPersistPlugin

import * as types from '../store/mutation-types';

import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export function cartCacheHandlerFactory (Vue) {
  return (mutation, state) => {
    const type = mutation.type;

    if (
      type.endsWith(types.CART_LOAD_CART) ||
      type.endsWith(types.CART_ADD_ITEM) ||
      type.endsWith(types.CART_DEL_ITEM) ||
      type.endsWith(types.CART_UPD_ITEM) ||
      type.endsWith(types.CART_DEL_NON_CONFIRMED_ITEM) ||
      type.endsWith(types.CART_UPD_ITEM_PROPS)
    ) {
      return StorageManager.get('cart').setItem('current-cart', state.cart.cartItems).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
    } else if (
      type.endsWith(types.CART_LOAD_CART_SERVER_TOKEN)
    ) {
      return StorageManager.get('cart').setItem('current-cart-token', state.cart.cartServerToken).catch((reason) => {
        console.error(reason)
      })
    } else if (
      type.endsWith(types.CART_SET_ITEMS_HASH)
    ) {
      return StorageManager.get('cart').setItem('current-cart-hash', state.cart.cartItemsHash).catch((reason) => {
        console.error(reason)
      })
    }
  }
}

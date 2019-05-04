import * as types from "../store/mutation-types";

export function cartCacheHandlerFactory(Vue) {
  return (mutation, state) => {
    const type = mutation.type;

    if (
      type.endsWith(types.CART_LOAD_CART) ||
      type.endsWith(types.CART_ADD_ITEM) ||
      type.endsWith(types.CART_DEL_ITEM) ||
      type.endsWith(types.CART_UPD_ITEM) ||
      type.endsWith(types.CART_UPD_ITEM_PROPS)
    ) {
      return Vue.prototype.$db.cartsCollection.setItem('current-cart', state.cart.cartItems).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
    } else if (
      type.endsWith(types.CART_LOAD_CART_SERVER_TOKEN)
    ) {
      return Vue.prototype.$db.cartsCollection.setItem('current-cart-token', state.cart.cartServerToken).catch((reason) => {
        console.error(reason)
      })
    }
  }
}

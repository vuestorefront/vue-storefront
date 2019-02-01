import * as types from './../store/mutation-types'

export function afterRegistration({ Vue, config, store, isServer }) {
  if (!isServer) store.dispatch('cart/load')

  store.subscribe((mutation, state) => {
    const type = mutation.type

    if (
      type.endsWith(types.CART_LOAD_CART) || 
      type.endsWith(types.CART_ADD_ITEM) || 
      type.endsWith(types.CART_DEL_ITEM) || 
      type.endsWith(types.CART_UPD_ITEM) || 
      type.endsWith(types.CART_UPD_ITEM_PROPS)
    ) {
      Vue.prototype.$db.cartsCollection.setItem('current-cart', state.cart.cartItems).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
    }

    if (
      type.endsWith(types.CART_LOAD_CART_SERVER_TOKEN)
    ) {
      Vue.prototype.$db.cartsCollection.setItem('current-cart-token', state.cart.cartServerToken).catch((reason) => {
        console.error(reason)
      })
    }
  })
}
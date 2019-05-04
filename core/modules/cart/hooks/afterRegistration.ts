import { cartCacheHandlerFactory } from "../helpers/cartCacheHandler";

export function afterRegistration({ Vue, config, store, isServer }) {
  if (!isServer) store.dispatch('cart/load')

  store.subscribe(cartCacheHandlerFactory(Vue))
}
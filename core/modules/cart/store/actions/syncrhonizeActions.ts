import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger'
import { isServer } from '@vue-storefront/core/helpers'
import config from 'config'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { CartService } from '@vue-storefront/core/data-resolver'
import { createDiffLog } from '@vue-storefront/core/modules/cart/helpers'

const synchronizeActions = {
  async load ({ commit, dispatch }, { forceClientState = false }: {forceClientState?: boolean} = {}) {
    if (isServer) return

    dispatch('setDefaultCheckoutMethods')
    const storedItems = await StorageManager.get('cart').getItem('current-cart')
    commit(types.CART_LOAD_CART, storedItems)
    dispatch('synchronizeCart', { forceClientState })
  },
  async synchronizeCart ({ commit, dispatch }, { forceClientState }) {
    const { synchronize, serverMergeByDefault } = config.cart
    if (!synchronize) return
    const cartStorage = StorageManager.get('cart')
    const token = await cartStorage.getItem('current-cart-token')
    const hash = await cartStorage.getItem('current-cart-hash')

    if (hash) {
      commit(types.CART_SET_ITEMS_HASH, hash)
      Logger.info('Cart hash received from cache.', 'cache', hash)()
    }
    if (token) {
      commit(types.CART_LOAD_CART_SERVER_TOKEN, token)
      Logger.info('Cart token received from cache.', 'cache', token)()
      Logger.info('Syncing cart with the server.', 'cart')()
      dispatch('sync', { forceClientState, dryRun: !serverMergeByDefault })
    } else {
      Logger.info('Creating server cart token', 'cart')()
      await dispatch('connect', { guestCart: false })
    }
  },
  /** @deprecated backward compatibility only */
  async serverPull ({ dispatch }, { forceClientState = false, dryRun = false }) {
    Logger.warn('The "cart/serverPull" action is deprecated and will not be supported with the Vue Storefront 1.11', 'cart')()
    return dispatch('sync', { forceClientState, dryRun })
  },
  async sync ({ getters, rootGetters, commit, dispatch }, { forceClientState = false, dryRun = false }) {
    const shouldUpdateClientState = rootGetters['checkout/isUserInCheckout'] || forceClientState
    const { getCartItems, canUpdateMethods, isSyncRequired, bypassCounter } = getters
    if (!canUpdateMethods || !isSyncRequired) return

    commit(types.CART_SET_SYNC)
    const { result, resultCode } = await CartService.pullCart()
    if (resultCode === 200) {
      return dispatch('merge', {
        dryRun,
        serverItems: result,
        clientItems: getCartItems,
        forceClientState: shouldUpdateClientState
      })
    }

    if (bypassCounter < config.queues.maxCartBypassAttempts) {
      Logger.log('Bypassing with guest cart' + bypassCounter, 'cart')()
      commit(types.CART_UPDATE_BYPASS_COUNTER, { counter: 1 })
      await dispatch('connect', { guestCart: true })
    }

    Logger.error(result, 'cart')
    return createDiffLog()
  }
}

export default synchronizeActions

import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { CartService } from '@vue-storefront/core/data-resolver'
import { createDiffLog } from '@vue-storefront/core/modules/cart/helpers'

const connectActions = {
  toggleMicrocart ({ commit }) {
    commit(types.CART_TOGGLE_MICROCART)
  },
  async clear ({ commit, dispatch, getters }, options = { recreateAndSyncCart: true }) {
    await commit(types.CART_LOAD_CART, [])
    if (options.recreateAndSyncCart && getters.isCartSyncEnabled) {
      await commit(types.CART_LOAD_CART_SERVER_TOKEN, null)
      await commit(types.CART_SET_ITEMS_HASH, null)
      await dispatch('connect', { guestCart: !config.orders.directBackendSync }) // guest cart when not using directBackendSync because when the order hasn't been passed to Magento yet it will repopulate your cart
    }
  },
  async disconnect ({ commit }) {
    commit(types.CART_LOAD_CART_SERVER_TOKEN, null)
  },
  async authorize ({ dispatch, getters }) {
    const coupon = getters.getCoupon.code
    const lastCartBypassTs = await StorageManager.get('user').getItem('last-cart-bypass-ts')
    const timeBypassCart = config.orders.directBackendSync || (Date.now() - lastCartBypassTs) >= (1000 * 60 * 24)

    if (!config.cart.bypassCartLoaderForAuthorizedUsers || timeBypassCart) {
      await dispatch('connect', { guestCart: false })

      if (!getters.getCoupon) {
        await dispatch('applyCoupon', coupon)
      }
    }
  },
  async connect ({ getters, dispatch, commit }, { guestCart = false, forceClientState = false }) {
    if (!getters.isCartSyncEnabled) return
    const { result, resultCode } = await CartService.getCartToken(guestCart, forceClientState)

    if (resultCode === 200) {
      Logger.info('Server cart token created.', 'cart', result)()
      commit(types.CART_LOAD_CART_SERVER_TOKEN, result)

      return dispatch('sync', { forceClientState, dryRun: !config.cart.serverMergeByDefault })
    }

    if (resultCode === 401 && getters.bypassCounter < config.queues.maxCartBypassAttempts) {
      Logger.log('Bypassing with guest cart' + getters.bypassCounter, 'cart')()
      commit(types.CART_UPDATE_BYPASS_COUNTER, { counter: 1 })
      Logger.error(result, 'cart')()
      return dispatch('connect', { guestCart: true })
    }

    Logger.warn('Cart sync is disabled by the config', 'cart')()
    return createDiffLog()
  }
}

export default connectActions

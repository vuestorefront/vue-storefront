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
  async clear ({ commit, dispatch, getters }) {
    await commit(types.CART_LOAD_CART, [])
    await commit(types.CART_LOAD_CART_SERVER_TOKEN, null)
    await commit(types.CART_SET_ITEMS_HASH, null)
  },
  async disconnect ({ commit }) {
    commit(types.CART_LOAD_CART_SERVER_TOKEN, null)
  },
  async authorize ({ dispatch, getters }) {
    await dispatch('connect', { guestCart: false })

    const coupon = getters.getCoupon.code
    if (!getters.getCoupon) {
      await dispatch('applyCoupon', coupon)
    }
  },
  async connect ({ getters, dispatch, commit }, { guestCart = false, forceClientState = false }) {
    if (!getters.isCartSyncEnabled) return
    const { result, resultCode } = await CartService.getCartToken(guestCart, forceClientState)

    if (resultCode === 200) {
      Logger.info('Server cart token created.', 'cart', result)()
      commit(types.CART_LOAD_CART_SERVER_TOKEN, result)

      return dispatch('sync', { forceClientState, dryRun: !config.cart.serverMergeByDefault, mergeQty: true })
    }

    if (resultCode === 401 && getters.bypassCounter < config.queues.maxCartBypassAttempts) {
      Logger.log('Bypassing with guest cart' + getters.bypassCounter, 'cart')()
      commit(types.CART_UPDATE_BYPASS_COUNTER, { counter: 1 })
      Logger.error(result, 'cart')()
      return dispatch('connect', { guestCart: true })
    }

    Logger.warn('Cart sync is disabled by the config', 'cart')()
    return createDiffLog()
  },
  /**
   * Create cart token when there are products in cart and we don't have token already
   */
  async create ({ dispatch, getters }) {
    const storedItems = getters['getCartItems'] || []
    const cartToken = getters['getCartToken']
    if (storedItems.length && !cartToken) {
      Logger.info('Creating server cart token', 'cart')()
      await dispatch('connect', { guestCart: false })
    }
  }
}

export default connectActions

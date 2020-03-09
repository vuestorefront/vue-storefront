import { ActionTree } from 'vuex'
import { cart as config } from 'config'
import RootState from '@vue-storefront/core/types/RootState'
import CartState from '@vue-storefront/core/modules/cart/types/CartState'
import { CartService } from '@vue-storefront/core/data-resolver'
import { cartHooksExecutors } from '@vue-storefront/core/modules/cart/hooks'
import { Logger } from '@vue-storefront/core/lib/logger'
import * as types from '../store/mutation-types'
import * as orgTypes from '@vue-storefront/core/modules/cart/store/mutation-types'

const actions: ActionTree<CartState, RootState> = {
  async reconnect ({ dispatch, commit }, { token, forceClientState = false }) {
    Logger.info('Reconnect quote with:', 'cart', token)()

    commit(orgTypes.CART_LOAD_CART_SERVER_TOKEN, token)
    return dispatch('sync', { forceClientState, dryRun: !config.serverMergeByDefault, mergeQty: true })
  },
  async removeCoupon ({ getters, dispatch }) {
    if (getters.canSyncTotals) {
      const { result } = await CartService.removeCoupon()
      if (result) {
        await dispatch('couponCallback')
        return result
      }
    }
  },
  async applyCoupon ({ getters, dispatch }, couponCode) {
    if (couponCode && getters.canSyncTotals) {
      const { result } = await CartService.applyCoupon(couponCode)
      if (result) {
        await dispatch('couponCallback')
      }
      return result
    }
  },
  /**
   * We need to update/sync the cart after the coupon is applied to update cart for insentive products.
   * There is already an up-to-date representation of the cart in `cart/shipping-information` request
   * of `syncTotals` but this isn't returned so we can't use it without extending the core excessivly.
   * @param param
   */
  async couponCallback ({ getters, dispatch, commit }) {
    const { getCartItems, isTotalsSyncRequired } = getters
    const { result, resultCode } = await CartService.getItems()
    const { serverItems, clientItems } = cartHooksExecutors.beforeSync({ clientItems: getCartItems, serverItems: result })

    if (resultCode === 200) {
      dispatch('updateFreeCartItems', result)

      const diffLog = await dispatch('merge', {
        dryRun: false,
        serverItems,
        clientItems,
        forceClientState: false
      })

      // Force server sync of totals if not already done after `merge`
      if (!isTotalsSyncRequired && clientItems.length > 0) {
        dispatch('syncTotals', { forceServerSync: true })
      }

      cartHooksExecutors.afterSync(diffLog)

      return diffLog
    }
  },
  updateFreeCartItems ({ commit, getters }, result): number[] {
    commit(types.CART_DEL_FREE_ITEM)
    result.forEach(cartItem => {
      const { fooman_auto_added_qty, sku } = cartItem
      if (fooman_auto_added_qty && fooman_auto_added_qty > 0) {
        commit(types.CART_ADD_FREE_ITEM, sku)
      }
    })

    return getters.getFreeCartItems
  }
}

export default actions

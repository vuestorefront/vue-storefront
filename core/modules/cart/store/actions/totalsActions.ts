import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { Logger } from '@vue-storefront/core/lib/logger'
import { CartService } from '@vue-storefront/core/data-resolver'
import { prepareShippingInfoForUpdateTotals, createOrderData } from '@vue-storefront/core/modules/cart/helpers'

const totalsActions = {
  async getTotals (context, { methodsData, hasShippingInformation }) {
    if (hasShippingInformation) {
      return CartService.setServerShippingInfo(methodsData)
    }

    return CartService.getTotals()
  },
  async overrideServerTotals ({ commit, dispatch }, { methodsData, hasShippingInformation }) {
    const { resultCode, result } = await dispatch('getTotals', { methodsData, hasShippingInformation })

    if (resultCode === 200) {
      const totals = result.totals || result
      Logger.info('Overriding server totals. ', 'cart', totals)()
      const itemsAfterTotal = prepareShippingInfoForUpdateTotals(totals.items)

      for (let key of Object.keys(itemsAfterTotal)) {
        const item = itemsAfterTotal[key]
        const product = { server_item_id: item.item_id, totals: item, qty: item.qty }
        await dispatch('updateItem', { product })
      }

      commit(types.CART_UPD_TOTALS, { itemsAfterTotal, totals, platformTotalSegments: totals.total_segments })
      commit(types.CART_SET_TOTALS_SYNC)

      return
    }

    Logger.error(result, 'cart')()
  },
  async syncTotals ({ dispatch, commit, getters, rootGetters }, payload: { forceServerSync: boolean, methodsData?: any } = { forceServerSync: false, methodsData: null }) {
    let methodsData = payload ? payload.methodsData : null
    await dispatch('pullMethods', { forceServerSync: payload.forceServerSync })

    if (getters.isTotalsSyncEnabled && getters.isCartConnected && (getters.isTotalsSyncRequired || payload.forceServerSync)) {
      const shippingMethods = rootGetters['shipping/shippingMethods']
      const paymentMethods = rootGetters['payment/paymentMethods']
      const shippingDetails = rootGetters['checkout/getShippingDetails']
      const shippingMethodsData = methodsData || createOrderData({
        shippingDetails,
        shippingMethods,
        paymentMethods
      })
      const hasShippingInformation = shippingMethodsData.method_code || shippingMethodsData.carrier_code

      if (shippingMethodsData.country && getters.isCartConnected) {
        return dispatch('overrideServerTotals', { methodsData, hasShippingInformation })
      } else {
        Logger.error('Please do set the tax.defaultCountry in order to calculate totals', 'cart')()
      }
    }
  },
  async refreshTotals ({ dispatch }, payload) {
    Logger.warn('The "cart/refreshTotals" action is deprecated and will not be supported with the Vue Storefront 1.11', 'cart')()
    return dispatch('syncTotals', payload)
  }
}

export default totalsActions

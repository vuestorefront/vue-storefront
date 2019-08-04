import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { Logger } from '@vue-storefront/core/lib/logger'
import { CartService } from '@vue-storefront/core/data-resolver'
import { prepareShippingInfoForUpdateTotals } from '@vue-storefront/core/modules/cart/helpers'

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
  // will be refactored soon, waits for #3284
  async syncTotals ({ dispatch, getters, rootGetters }, payload: { forceServerSync: boolean, methodsData?: any } = { forceServerSync: false, methodsData: null }) {
    let methodsData = payload ? payload.methodsData : null
    await dispatch('pullMethods', { forceServerSync: payload.forceServerSync })

    const storeView = currentStoreView()
    let hasShippingInformation = false
    if (getters.isTotalsSyncEnabled && getters.isCartConnected && (getters.isTotalsSyncRequired || payload.forceServerSync)) {
      if (!methodsData) {
        const country = rootGetters['checkout/getShippingDetails'].country ? rootGetters['checkout/getShippingDetails'].country : storeView.tax.defaultCountry
        const shippingMethods = rootGetters['shipping/shippingMethods']
        const paymentMethods = rootGetters['payment/paymentMethods']
        let shipping = shippingMethods && Array.isArray(shippingMethods) ? shippingMethods.find(item => item.default && !item.offline /* don't sync offline only shipping methods with the serrver */) : null
        let payment = paymentMethods && Array.isArray(paymentMethods) ? paymentMethods.find(item => item.default) : null
        if (!shipping && shippingMethods && shippingMethods.length > 0) {
          shipping = shippingMethods.find(item => !item.offline)
        }
        if (!payment && paymentMethods && paymentMethods.length > 0) {
          payment = paymentMethods[0]
        }
        methodsData = {
          country: country
        }
        if (shipping) {
          if (shipping.method_code) {
            hasShippingInformation = true // there are some edge cases when the backend returns no shipping info
            methodsData['method_code'] = shipping.method_code
          }
          if (shipping.carrier_code) {
            hasShippingInformation = true
            methodsData['carrier_code'] = shipping.carrier_code
          }
        }
        if (payment && payment.code) methodsData['payment_method'] = payment.code
      }
      if (methodsData.country && getters.isCartConnected) {
        return dispatch('overrideServerTotals', { methodsData, hasShippingInformation })
      }

      Logger.error('Please do set the tax.defaultCountry in order to calculate totals', 'cart')()
    }
  },
  async refreshTotals ({ dispatch }, payload) {
    Logger.warn('The "cart/refreshTotals" action is deprecated and will not be supported with the Vue Storefront 1.11', 'cart')()
    return dispatch('syncTotals', payload)
  }
}

export default totalsActions

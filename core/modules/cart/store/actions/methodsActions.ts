import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { Logger } from '@vue-storefront/core/lib/logger'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { CartService } from '@vue-storefront/core/data-resolver'
import { preparePaymentMethodsToSync } from '@vue-storefront/core/modules/cart/helpers'

const methodsActions = {
  async pullMethods ({ getters, dispatch }, { forceServerSync }) {
    if (getters.isTotalsSyncRequired || forceServerSync) {
      await dispatch('syncShippingMethods', { forceServerSync })
      await dispatch('syncPaymentMethods', { forceServerSync })
    } else {
      Logger.debug('Skipping payment & shipping methods update as cart has not been changed', 'cart')()
    }
  },
  async setDefaultCheckoutMethods ({ getters, rootGetters, commit }) {
    if (!getters.getShippingMethodCode) {
      commit(types.CART_UPD_SHIPPING, rootGetters['checkout/getDefaultShippingMethod'])
    }

    if (!getters.getPaymentMethodCode) {
      commit(types.CART_UPD_PAYMENT, rootGetters['checkout/getDefaultPaymentMethod'])
    }
  },
  async syncPaymentMethods ({ getters, rootGetters, dispatch }, { forceServerSync = false }) {
    if (getters.canUpdateMethods && (getters.isTotalsSyncRequired || forceServerSync)) {
      Logger.debug('Refreshing payment methods', 'cart')()
      const { result } = await CartService.getPaymentMethods()
      const { uniqueBackendMethods, paymentMethods } = preparePaymentMethodsToSync(
        result,
        rootGetters['checkout/getNotServerPaymentMethods']
      )
      await dispatch('checkout/replacePaymentMethods', paymentMethods, { root: true })
      EventBus.$emit('set-unique-payment-methods', uniqueBackendMethods)
    } else {
      Logger.debug('Payment methods does not need to be updated', 'cart')()
    }
  },
  async updateShippingMethods ({ dispatch }, { shippingMethods }) {
    if (shippingMethods.length > 0) {
      const newShippingMethods = shippingMethods.map(method => ({ ...method, is_server_method: true }))
      await dispatch('checkout/replaceShippingMethods', newShippingMethods, { root: true })
    }
  },
  async syncShippingMethods ({ getters, rootGetters, dispatch }, { forceServerSync = false }) {
    if (getters.canUpdateMethods && (getters.isTotalsSyncRequired || forceServerSync)) {
      const storeView = currentStoreView()
      Logger.debug('Refreshing shipping methods', 'cart')()
      const shippingDetails = rootGetters['checkout/getShippingDetails']

      // build address data with what we have
      const address = (shippingDetails) ? {
        region: shippingDetails.state,
        region_id: shippingDetails.region_id ? shippingDetails.region_id : 0,
        country_id: shippingDetails.country,
        street: [shippingDetails.streetAddress1, shippingDetails.streetAddress2],
        postcode: shippingDetails.zipCode,
        city: shippingDetails.city,
        region_code: shippingDetails.region_code ? shippingDetails.region_code : ''
      } : {country_id: storeView.tax.defaultCountry}

      const { result } = await CartService.getShippingMethods(address)
      await dispatch('updateShippingMethods', { shippingMethods: result })
    } else {
      Logger.debug('Shipping methods does not need to be updated', 'cart')()
    }
  }
}

export default methodsActions

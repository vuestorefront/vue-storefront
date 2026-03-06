import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { Logger } from '@vue-storefront/core/lib/logger'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { CartService } from '@vue-storefront/core/data-resolver'
import { preparePaymentMethodsToSync, createOrderData, createShippingInfoData, getAvailableShippingMethod } from '@vue-storefront/core/modules/cart/helpers'
import PaymentMethod from '../../types/PaymentMethod'
import { isCartNotFoundError } from '../../helpers/is-cart-not-found-error'
import { createShippingAddressData } from '../../helpers/createOrderData'
import ShippingAddress from '../../types/ShippingAddress'

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
  async syncPaymentMethods ({ commit, getters, rootGetters, dispatch }, { forceServerSync = false }) {
    if (getters.canUpdateMethods && (getters.isTotalsSyncRequired || forceServerSync)) {
      commit(types.SET_IS_PAYMENT_METHODS_SYNCING, true);

      try {
        Logger.debug('Refreshing payment methods', 'cart')()
        let backendPaymentMethods: PaymentMethod[]

        const paymentDetails = rootGetters['checkout/getPaymentDetails']
        if (paymentDetails.country) {
          // use shipping info endpoint to get payment methods
          const shippingDetails = rootGetters['checkout/getShippingDetails']
          const shippingMethods = rootGetters['checkout/getShippingMethods']

          const shippingMethodsData = createOrderData({
            shippingDetails,
            shippingMethods,
            paymentMethods: rootGetters['checkout/getPaymentMethods'],
            paymentDetails: paymentDetails
          })

          if (shippingMethodsData.country) {
            const availableShippingMethod = getAvailableShippingMethod(
              shippingDetails.shippingCarrier,
              shippingDetails.shippingMethod,
              shippingMethods
            );

            const hasShippingInformation = !!availableShippingMethod;
            const addressInformation = createShippingInfoData({
              ...shippingMethodsData,
              carrier_code: availableShippingMethod?.carrier_code,
              method_code: availableShippingMethod?.method_code
            });

            if (hasShippingInformation) {
              const task = await dispatch('getTotals', { addressInformation, hasShippingInformation });
              backendPaymentMethods = task.result.payment_methods || []

              if (isCartNotFoundError(task)) {
                return dispatch('clear', { disconnect: true, sync: false });
              }
            }
          }
        }

        if (!backendPaymentMethods || backendPaymentMethods.length === 0) {
          const task = await CartService.getPaymentMethods();

          if (isCartNotFoundError(task)) {
            return dispatch('clear', { disconnect: true, sync: false });
          }

          backendPaymentMethods = task.resultCode === 200 ? task.result : [];
        }

        const { uniqueBackendMethods, paymentMethods } = preparePaymentMethodsToSync(
          backendPaymentMethods,
          rootGetters['checkout/getNotServerPaymentMethods']
        )
        await dispatch('checkout/replacePaymentMethods', paymentMethods, { root: true })
        EventBus.$emit('set-unique-payment-methods', uniqueBackendMethods)
      } finally {
        commit(types.SET_IS_PAYMENT_METHODS_SYNCING, false);
      }
    } else {
      Logger.debug('Payment methods does not need to be updated', 'cart')()
    }
  },
  async updateShippingMethods ({ dispatch }, { shippingMethods }) {
    const newShippingMethods = shippingMethods
      .map(method => ({ ...method, is_server_method: true }))
      .filter(method => !method.hasOwnProperty('available') || method.available)
    await dispatch('checkout/replaceShippingMethods', newShippingMethods, { root: true })
  },
  async syncShippingMethods ({ commit, getters, rootGetters, dispatch }, { forceServerSync = false }) {
    if (getters.canUpdateMethods && (getters.isTotalsSyncRequired || forceServerSync)) {
      commit(types.SET_IS_SHIPPING_METHODS_SYNCING, true);
      const storeView = currentStoreView()
      Logger.debug('Refreshing shipping methods', 'cart')()
      const shippingDetails = rootGetters['checkout/getShippingDetails']

      // build address data with what we have
      const address: ShippingAddress & { countryId: string } = {
        ...createShippingAddressData(shippingDetails),
        countryId: shippingDetails.country || storeView.tax.defaultCountry
      }

      try {
        const task = await CartService.getShippingMethods(address);

        if (isCartNotFoundError(task)) {
          return dispatch('clear', { disconnect: true, sync: false });
        }

        const result = task.resultCode === 200 ? task.result : [];

        await dispatch('updateShippingMethods', { shippingMethods: result })

        const availableMethods = rootGetters['checkout/getShippingMethods'];
        const availableShippingMethod = getAvailableShippingMethod(
          shippingDetails.shippingCarrier,
          shippingDetails.shippingMethod,
          availableMethods
        );

        if (availableShippingMethod) {
          commit('checkout/checkout/UPDATE_PROP_VALUE', ['shippingCarrier', availableShippingMethod.carrier_code], { root: true });
          commit('checkout/checkout/UPDATE_PROP_VALUE', ['shippingMethod', availableShippingMethod.method_code], { root: true });
        } else {
          commit('checkout/checkout/UPDATE_PROP_VALUE', ['shippingCarrier', ''], { root: true });
          commit('checkout/checkout/UPDATE_PROP_VALUE', ['shippingMethod', ''], { root: true });
        }
      } finally {
        commit(types.SET_IS_SHIPPING_METHODS_SYNCING, false);
      }
    } else {
      Logger.debug('Shipping methods does not need to be updated', 'cart')()
    }
  }
}

export default methodsActions

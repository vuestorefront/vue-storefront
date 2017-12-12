import * as types from '../mutation-types'
import EventBus from 'src/event-bus'

const store = {
  namespaced: true,
  state: {
    order: {},
    personalDetails: {},
    shippingDetails: {}
  },
  mutations: {
    /**
     * Setup current order object
     * @param {Object} order Object
     */
    [types.ORDER_PLACE_ORDER] (state, order) {
      state.order = order
    },
    [types.CHECKOUT_SAVE_PERSONAL_DETAILS] (state, personalDetails) {
      state.personalDetails = personalDetails
    },
    [types.CHECKOUT_SAVE_SHIPPING_DETAILS] (state, shippingDetails) {
      state.shippingDetails = shippingDetails
    },
    [types.CHECKOUT_LOAD_PERSONAL_DETAILS] (state, storedPersonalDetails) {
      state.personalDetails = storedPersonalDetails
    },
    [types.CHECKOUT_LOAD_SHIPPING_DETAILS] (state, storedShippingDetails) {
      state.shippingDetails = storedShippingDetails
    },
    [types.CHECKOUT_UPDATE_PROP_VALUE] (state, payload) {
      state.shippingDetails[payload[0]] = payload[1]
    }
  },
  getters: {
    getPersonalDetails (state) {
      if (Object.keys(state.personalDetails).length > 0) {
        return state.personalDetails
      } else {
        return {
          firstName: '',
          lastName: '',
          emailAddress: ''
        }
      }
    },
    getShippingDetails (state) {
      if (Object.keys(state.shippingDetails).length > 0) {
        return state.shippingDetails
      } else {
        return {
          firstName: '',
          lastName: '',
          country: '',
          streetAddress: '',
          apartmentNumber: '',
          city: '',
          state: '',
          zipCode: '',
          phoneNumber: '',
          shippingMethod: 'flatrate'
        }
      }
    }
  },
  actions: {
    /**
     * Place order - send it to service worker queue
     * @param {Object} commit method
     * @param {Object} order order data to be send
     */
    placeOrder (context, { order }) {
      try {
        context.dispatch('order/placeOrder', order, {root: true}).then(result => {
          context.dispatch('cart/clear', {}, {root: true})
        })
      } catch (e) {
        if (e.name === 'ValidationError') {
          console.error('Internal validation error; Order entity is not compliant with the schema', e.messages)
          EventBus.$emit('notification', {
            type: 'error',
            message: 'Internal validation error. Please check if all required fileds are filled in. Please contact us on contributors@vuestorefront.io',
            action1: { label: 'OK', action: 'close' }
          })
        } else {
          console.error(e)
        }
      }
    },
    savePersonalDetails ({ commit }, personalDetails) {
      commit(types.CHECKOUT_SAVE_PERSONAL_DETAILS, personalDetails)
    },
    saveShippingDetails ({ commit }, shippingDetails) {
      commit(types.CHECKOUT_SAVE_SHIPPING_DETAILS, shippingDetails)
    },
    load ({ commit }) {
      global.db.checkoutFieldsCollection.getItem('personal-details', (err, details) => {
        if (err) throw new Error(err)
        if (details) {
          commit(types.CHECKOUT_LOAD_PERSONAL_DETAILS, details)
        }
      })
      global.db.checkoutFieldsCollection.getItem('shipping-details', (err, details) => {
        if (err) throw new Error(err)
        if (details) {
          commit(types.CHECKOUT_LOAD_SHIPPING_DETAILS, details)
        }
      })
    },
    updatePropValue ({ commit }, payload) {
      commit(types.CHECKOUT_UPDATE_PROP_VALUE, payload)
    }
  }
}

export default store

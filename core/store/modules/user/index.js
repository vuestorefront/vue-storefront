import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import EventBus from '../../lib/event-bus'
import i18n from '../../lib/i18n'
import store from '../../'

EventBus.$on('user-after-update', (event) => {
  if (event.resultCode === 200) {
    EventBus.$emit('notification', {
      type: 'success',
      message: i18n.t('Account data has successfully been updated'),
      action1: { label: 'OK', action: 'close' }
    })
    store.dispatch('user/refreshCurrentUser', event.result)
  }
})

EventBus.$on('session-after-started', (event) => { // example stock check callback
  console.log('Loading user profile')
  store.dispatch('user/me', { refresh: navigator.onLine }, { root: true }).then((us) => {})
  store.dispatch('user/getOrdersHistory', { refresh: navigator.onLine }, { root: true }).then((us) => {})
})

// After order has been placed fill in missing address information in user's profile and update orders history
EventBus.$on('order-after-placed', (order) => {
  if (store.getters['user/isLoggedIn']) {
    let currentUser = store.state.user.current
    let hasShippingAddress = currentUser.hasOwnProperty('default_shipping')
    let hasBillingAddress = currentUser.hasOwnProperty('default_billing')
    if (!(hasShippingAddress && hasBillingAddress)) {
      let customer = Object.assign({}, currentUser)
      if (!hasShippingAddress) {
        let shippingAddress = order.order.addressInformation.shippingAddress
        customer.addresses.push({
          firstname: shippingAddress.firstname,
          lastname: shippingAddress.lastname,
          street: [shippingAddress.street[0], shippingAddress.street[1]],
          city: shippingAddress.city,
          ...(shippingAddress.region ? { region: { region: shippingAddress.region } } : {}),
          country_id: shippingAddress.country_id,
          postcode: shippingAddress.postcode,
          ...(shippingAddress.telephone ? { telephone: shippingAddress.telephone } : {}),
          default_shipping: true
        })
      }
      if (!hasBillingAddress) {
        let billingAddress = order.order.addressInformation.billingAddress
        let hasCompany = billingAddress.company
        if (hasCompany) {
          customer.addresses.push({
            firstname: billingAddress.firstname,
            lastname: billingAddress.lastname,
            street: [billingAddress.street[0], billingAddress.street[1]],
            city: billingAddress.city,
            ...(billingAddress.region ? { region: { region: billingAddress.region } } : {}),
            country_id: billingAddress.country_id,
            postcode: billingAddress.postcode,
            company: billingAddress.company,
            vat_id: billingAddress.vat_id,
            default_billing: true
          })
        }
      }

      store.dispatch('user/update', { customer: customer })
    }
    store.dispatch('user/getOrdersHistory', { refresh: true, useCache: false }).then(result => {})
  }
})

export default {
  namespaced: true,
  state: {
    token: '',
    current: null,
    session_started: new Date(),
    newsletter: null,
    orders_history: null
  },
  getters,
  actions,
  mutations
}

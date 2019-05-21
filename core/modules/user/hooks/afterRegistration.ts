import Vue from 'vue'
import * as types from './../store/mutation-types'

export async function afterRegistration({ Vue, config, store, isServer }){
  if (!isServer) {
    await store.dispatch('user/startSession')

    Vue.prototype.$bus.$on('user-before-logout', () => {
      store.dispatch('user/logout', { silent: false })
      //TODO: Move it to theme
      store.commit('ui/setSubmenu', {
        depth: 0
      })
    })

    Vue.prototype.$bus.$on('user-after-loggedin', receivedData => {
      //TODO: Make independent of checkout module
      store.dispatch('checkout/savePersonalDetails', {
        firstName: receivedData.firstname,
        lastName: receivedData.lastname,
        emailAddress: receivedData.email
      })
    })
  }

  store.subscribe((mutation, state) => {
    const type = mutation.type

    if (
      type.endsWith(types.USER_INFO_LOADED)
    ) {
      Vue.prototype.$db.usersCollection.setItem('current-user', state.user.current).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
    }

    if (
      type.endsWith(types.USER_ORDERS_HISTORY_LOADED)
    ) {
      Vue.prototype.$db.ordersHistoryCollection.setItem('orders-history', state.user.orders_history).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
    }

    if (
      type.endsWith(types.USER_TOKEN_CHANGED)
    ) {
      Vue.prototype.$db.usersCollection.setItem('current-token', state.user.token).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
      if (state.user.refreshToken) {
        Vue.prototype.$db.usersCollection.setItem('current-refresh-token', state.user.refreshToken).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
      }
    }
  })
}
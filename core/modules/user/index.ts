import { userStore } from './store'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { isServer } from '@vue-storefront/core/helpers'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import * as types from './store/mutation-types'

export const UserModule: StorefrontModule = async function ({ store }) {
  StorageManager.init('user')
  store.registerModule('user', userStore)
  if (!isServer) {
    EventBus.$on('user-before-logout', () => {
      store.dispatch('user/logout', { silent: false })
      // TODO: Move it to theme
      store.commit('ui/setSubmenu', {
        depth: 0
      })
    })

    EventBus.$on('user-after-loggedin', receivedData => {
      // TODO: Make independent of checkout module
      store.dispatch('checkout/savePersonalDetails', {
        firstName: receivedData.firstname,
        lastName: receivedData.lastname,
        emailAddress: receivedData.email
      })
    })

    store.dispatch('user/startSession')
  }

  store.subscribe((mutation, state) => {
    const type = mutation.type

    if (
      type.endsWith(types.USER_INFO_LOADED)
    ) {
      StorageManager.get('user').setItem('current-user', state.user.current).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
    }

    if (
      type.endsWith(types.USER_ORDERS_HISTORY_LOADED)
    ) {
      StorageManager.get('user').setItem('orders-history', state.user.orders_history).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
    }

    if (
      type.endsWith(types.USER_TOKEN_CHANGED)
    ) {
      StorageManager.get('user').setItem('current-token', state.user.token).catch((reason) => {
        console.error(reason) // it doesn't work on SSR
      }) // populate cache
      if (state.user.refreshToken) {
        StorageManager.get('user').setItem('current-refresh-token', state.user.refreshToken).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
      }
    }
  })
}

import { userStore } from './store'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { isServer } from '@vue-storefront/core/helpers'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { localStorageSynchronizationFactory } from 'src/modules/shared'

import { cacheHandlerFactory } from './helpers/cache-handler.factory'
import { getItemsFromStorage } from './helpers/get-local-storage-items.function'

export const UserModule: StorefrontModule = async function ({ store }) {
  StorageManager.init('user')
  store.registerModule('user', userStore)

  if (!isServer) {
    const localStorageSynchronization = localStorageSynchronizationFactory(
      getItemsFromStorage,
      cacheHandlerFactory()
    );

    store.subscribe(localStorageSynchronization.setItems);

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

    EventBus.$on('address-added', (payload: any) => {
      store.dispatch('user/addAddress', payload);
    })

    EventBus.$on('address-updated', (payload: any) => {
      store.dispatch('user/updateAddress', payload);
    })

    EventBus.$on('address-removed', (payload: any) => {
      store.dispatch('user/removeAddress', payload);
    })

    store.dispatch('user/startSession');
  }
}

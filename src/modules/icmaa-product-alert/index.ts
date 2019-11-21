import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { ProductAlertStore } from './store'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

export const IcmaaProductAlertModule: StorefrontModule = async function ({ store }) {
  store.registerModule('icmaaProductAlert', ProductAlertStore)

  EventBus.$on('user-after-loggedin', async result => {
    await store.dispatch('icmaaProductAlert/fetchProductStockAlerts')
  })

  EventBus.$on('user-after-logout', result => {
    store.dispatch('icmaaProductAlert/clearProductStockAlerts')
  })
}

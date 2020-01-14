import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { GiftcertStore } from './store'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

export const IcmaaGiftcertModule: StorefrontModule = async function ({ store }) {
  store.registerModule('icmaaGiftcert', GiftcertStore)

  EventBus.$on('user-after-logout', result => {
    store.dispatch('icmaaGiftcert/clearGiftcert')
  })
}

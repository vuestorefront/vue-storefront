import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { TrackingStore } from './store'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

export const IcmaaTrackingModule: StorefrontModule = async function ({ store }) {
  store.registerModule('icmaaTracking', TrackingStore)

  EventBus.$on('user-after-logout', result => {
    store.dispatch('icmaaTracking/clearTracking')
  })
}

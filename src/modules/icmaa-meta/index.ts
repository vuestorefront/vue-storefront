import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { IcmaaMetaStore } from './store'

export const IcmaaMetaModule: StorefrontModule = function ({ store }) {
  store.registerModule('icmaaMeta', IcmaaMetaStore)
}

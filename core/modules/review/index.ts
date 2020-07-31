import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { reviewStore } from './store'

export const ReviewModule: StorefrontModule = function ({ store }) {
  store.registerModule('review', reviewStore)
}

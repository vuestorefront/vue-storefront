import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { module } from './store'

export const GiftCardModule: StorefrontModule = function ({ store }) {
  store.registerModule('giftCard', module)
}

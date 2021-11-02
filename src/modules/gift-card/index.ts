import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { module } from './store'
import GiftCardTemplateSize from './GiftCardTemplateSize';

export const GiftCardModule: StorefrontModule = function ({ store }) {
  store.registerModule('giftCard', module)
}

export {
  GiftCardTemplateSize
}

import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { module } from './store'
import GiftCardTemplateSize from './GiftCardTemplateSize';
import GiftCardOptions from './types/GiftCardOptions';

export const GiftCardModule: StorefrontModule = function ({ store }) {
  store.registerModule('giftCard', module)
}

export {
  GiftCardTemplateSize,
  GiftCardOptions
}

import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { module } from './store'
import GiftCardTemplateSize from './GiftCardTemplateSize';
import GiftCardOptions from './types/GiftCardOptions';

if (typeof URLSearchParams === 'undefined') {
  (global as any).URLSearchParams = require('url').URLSearchParams;
}

export const GiftCardModule: StorefrontModule = function ({ store }) {
  store.registerModule('giftCard', module)
}

export {
  GiftCardTemplateSize,
  GiftCardOptions
}

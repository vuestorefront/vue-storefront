import { VueStorefrontModule } from '@vue-storefront/core/lib/module';
import { Homepage } from './homepage'
import { PromotedOffers } from './promoted-offers'

export const registerModules: VueStorefrontModule[] = [
  Homepage,
  PromotedOffers
];

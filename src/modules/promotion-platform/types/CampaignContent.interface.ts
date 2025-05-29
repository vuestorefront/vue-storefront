import { ProductDiscountedPrice } from '@vue-storefront/core/modules/catalog';
import { Dictionary } from 'src/modules/budsies';

import { ImageBanner } from './ImageBanner.interface';
import { CountdownBanner } from './CountdownBanner.interface';

export interface CampaignContent {
  countdown?: CountdownBanner,
  discounts?: Dictionary<ProductDiscountedPrice>,
  image_banner?: ImageBanner
}

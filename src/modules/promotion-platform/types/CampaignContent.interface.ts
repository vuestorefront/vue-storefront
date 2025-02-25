import { Dictionary } from 'src/modules/budsies';
import { ImageBanner } from './ImageBanner.interface';

export interface CampaignContent {
  countdownBannerContent?: string,
  productDiscountPriceDictionary?: Dictionary<number>,
  imageBanner?: ImageBanner,
  countdownBannerBlacklistUrls: string[]
}

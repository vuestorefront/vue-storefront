import { CampaignContent } from '../types/CampaignContent.interface';

export function isCampaignEmpty (campaignContent: CampaignContent): boolean {
  const isProductDiscountsEmpty = !campaignContent.productDiscountPriceDictionary ||
      !Object.values(campaignContent.productDiscountPriceDictionary).length;

  return !campaignContent.countdownBannerContent &&
      isProductDiscountsEmpty &&
      !campaignContent.imageBanner
}

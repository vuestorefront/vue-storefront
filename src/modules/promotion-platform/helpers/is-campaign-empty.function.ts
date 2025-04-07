import { CampaignContent } from '../types/CampaignContent.interface';

export function isCampaignEmpty (campaignContent: CampaignContent): boolean {
  const isProductDiscountsEmpty = !campaignContent.discounts ||
      !Object.values(campaignContent.discounts).length;

  return !campaignContent.countdown &&
      isProductDiscountsEmpty &&
      !campaignContent.image_banner
}

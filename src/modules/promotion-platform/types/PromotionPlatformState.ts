import { CampaignContent } from './CampaignContent.interface';

export default interface PromotionPlatformState {
  campaignContent?: CampaignContent,
  campaignToken?: string,
  isSynced: boolean,
  lastClosedBannerVersionByUser?: string,
  productionSpotCountdownExpirationDate?: number
}

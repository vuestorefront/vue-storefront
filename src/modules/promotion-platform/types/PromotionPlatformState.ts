import CampaignContent from './CampaignContent.model';

export default interface PromotionPlatformState {
  campaignContent?: CampaignContent,
  campaignToken?: string,
  isSynced: boolean,
  lastClosedBannerVersionByUser?: string,
  productionSpotCountdownExpirationDate?: number
}

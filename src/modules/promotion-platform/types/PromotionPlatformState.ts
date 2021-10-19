import CampaignContent from './CampaignContent.model';

export default interface PromotionPlatformState {
  campaignContent?: CampaignContent,
  campaignToken?: string
}

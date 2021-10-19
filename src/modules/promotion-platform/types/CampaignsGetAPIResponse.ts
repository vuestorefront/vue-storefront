import CampaignContent from './CampaignContent.model';

export default interface CampaignsGetAPIResponse {
  campaignContent: CampaignContent,
  campaignToken: string
}

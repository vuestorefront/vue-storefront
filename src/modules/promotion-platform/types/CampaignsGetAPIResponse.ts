import { CampaignContent } from './CampaignContent.interface';

export default interface CampaignsGetAPIResponse {
  campaignContent: CampaignContent,
  campaignToken: string
}

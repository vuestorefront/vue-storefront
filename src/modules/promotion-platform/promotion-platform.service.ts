import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';

import CampaignsGetAPIResponse from './types/CampaignsGetAPIResponse';

export const PromotionPlatformService = {
  async fetchCampaignContent (): Promise<CampaignsGetAPIResponse> {
    const url = processURLAddress(`${config.budsies.endpoint}/promotion-platform/campaigns`);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode: 'cors'
    });

    const data = await response.json();

    return {
      campaignContent: data.result.campaignContent,
      campaignToken: data.result.campaignToken
    };
  }
}

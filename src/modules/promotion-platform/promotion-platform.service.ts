import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';

export const PromotionPlatformService = {
  async fetchCampaignContent (): Promise<string> {
    const url = processURLAddress(`${config.budsies.endpoint}/promotion-platform/campaigns`);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode: 'cors'
    });

    const data = await response.json();

    return data.result.campaignContent;
  }
}

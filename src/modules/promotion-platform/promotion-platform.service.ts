import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';

import CampaignsGetAPIResponse from './types/CampaignsGetAPIResponse';
import CampaignContent from './types/CampaignContent.model';
import { Dictionary } from '../budsies';

export const PromotionPlatformService = {
  async fetchCampaignContent (campaignToken?: string, dataParam?: string): Promise<CampaignsGetAPIResponse> {
    let url = processURLAddress(`${config.budsies.endpoint}/promotion-platform/campaigns`);

    let query = new URLSearchParams();

    if (campaignToken) {
      query.append('campaignToken', campaignToken)
    }

    if (dataParam) {
      query.append('data', dataParam);
    }

    const queryString = query.toString();

    if (queryString) {
      url += `?${queryString}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode: 'cors'
    });

    const responseData = await response.json();

    const campaignData = responseData.result.campaignContent;
    let countdownBannerContent;
    let discountsContent: Dictionary<number> | undefined;
    let imagesBannerContent;
    let countdownBannerBlacklistUrls: string[] = [];

    if (!campaignData || campaignData.length === 0) {
      return {
        campaignContent: new CampaignContent(),
        campaignToken: responseData.result.campaignToken
      }
    }

    if (campaignData.countdown_banner) {
      countdownBannerContent = campaignData.countdown_banner;
    }

    if (campaignData.countdown_banner_blacklist_urls &&
       campaignData.countdown_banner_blacklist_urls.length > 0
    ) {
      countdownBannerBlacklistUrls = campaignData.countdown_banner_blacklist_urls;
    }

    if (campaignData.image_banner && campaignData.image_banner.content) {
      imagesBannerContent = campaignData.image_banner.content;
    }

    if (campaignData.discounts && campaignData.discounts.content) {
      discountsContent = {};
      for (const [key, value] of Object.entries(campaignData.discounts.content) as [string, string][]) {
        discountsContent[key] = Number.parseInt(value.split('$')[1])
      }
    }

    const campaignContent = new CampaignContent(
      countdownBannerContent,
      discountsContent,
      imagesBannerContent,
      countdownBannerBlacklistUrls
    )

    return {
      campaignContent,
      campaignToken: responseData.result.campaignToken
    };
  }
}

import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';

import CampaignsGetAPIResponse from './types/CampaignsGetAPIResponse';
import CampaignContent from './types/CampaignContent.model';

export const PromotionPlatformService = {
  async fetchCampaignContent (): Promise<CampaignsGetAPIResponse> {
    const url = processURLAddress(`${config.budsies.endpoint}/promotion-platform/campaigns`);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode: 'cors'
    });

    const responseData = await response.json();

    const campaignData = responseData.result.campaignContent;
    let countdownBannerContent;
    let discountsContent;
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
      discountsContent = campaignData.discounts.content;
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

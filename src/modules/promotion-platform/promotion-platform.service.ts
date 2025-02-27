import fetch from 'isomorphic-fetch';
import config from 'config';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { processURLAddress } from '@vue-storefront/core/helpers';

import CampaignsGetAPIResponse from './types/CampaignsGetAPIResponse';
import { CampaignContent } from './types/CampaignContent.interface';
import { Dictionary } from '../budsies';
import { ImageBanner } from './types/ImageBanner.interface';
import { BEFORE_STORE_BACKEND_API_REQUEST } from '../shared';

function parseResponseData (responseData: any): CampaignsGetAPIResponse {
  const campaignData = responseData.result.campaignContent;
  let countdownBannerContent;
  let discountsContent: Dictionary<number> | undefined;
  let imagesBannerContent: ImageBanner | undefined;
  let countdownBannerBlacklistUrls: string[] = [];

  if (!campaignData || campaignData.length === 0) {
    return {
      campaignContent: {
        countdownBannerBlacklistUrls: []
      },
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

  const imageBanner = campaignData.image_banner;

  if (imageBanner && imageBanner.content && imageBanner.campaign_id) {
    imagesBannerContent = {
      campaignId: imageBanner.campaign_id,
      content: imageBanner.content
    };
  }

  if (campaignData.discounts && campaignData.discounts.prices) {
    discountsContent = campaignData.discounts.prices;
  }

  const campaignContent: CampaignContent = {
    countdownBannerContent,
    productDiscountPriceDictionary: discountsContent,
    imageBanner: imagesBannerContent,
    countdownBannerBlacklistUrls
  };

  return {
    campaignContent,
    campaignToken: responseData.result.campaignToken
  };
}

export const PromotionPlatformService = {
  async updateActiveCampaign (campaignToken?: string, dataParam?: string, cartId?: string): Promise<CampaignsGetAPIResponse> {
    let url = processURLAddress(`${config.budsies.endpoint}/promotion-platform/active-campaign-update-requests`);

    let query = new URLSearchParams();

    if (campaignToken) {
      query.append('campaignToken', campaignToken)
    }

    if (dataParam) {
      query.append('data', dataParam);
    }

    if (cartId) {
      query.append('cartId', cartId);
    }

    const queryString = query.toString();

    if (queryString) {
      url += `?${queryString}`;
    }

    const mode: RequestMode = 'cors';
    const payload = {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      mode
    }

    const eventPayload = {
      url
    };

    EventBus.$emit(BEFORE_STORE_BACKEND_API_REQUEST, eventPayload);

    url = eventPayload.url;

    const response = await fetch(url, payload);

    const responseData = await response.json();

    return parseResponseData(responseData);
  },
  async fetchActiveCampaign (cartId: string, userToken?: string): Promise<CampaignsGetAPIResponse> {
    let url = processURLAddress(`${config.budsies.endpoint}/promotion-platform/quotes-campaigns?cartId=${cartId}`);

    if (userToken) {
      url += `&token=${userToken}`;
    }

    const mode: RequestMode = 'cors';
    const payload = {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode
    };

    const eventPayload = {
      url
    };

    EventBus.$emit(BEFORE_STORE_BACKEND_API_REQUEST, eventPayload);

    url = eventPayload.url;

    const response = await fetch(url, payload);

    const responseData = await response.json();

    return parseResponseData(responseData);
  },
  async fetchDefaultActiveCampaignData (): Promise<CampaignsGetAPIResponse> {
    let url = processURLAddress(`${config.budsies.endpoint}/promotion-platform/campaigns/default`);

    const mode: RequestMode = 'cors';
    const payload = {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode
    };

    const eventPayload = {
      url
    };

    EventBus.$emit(BEFORE_STORE_BACKEND_API_REQUEST, eventPayload);

    url = eventPayload.url;

    const response = await fetch(url, payload);

    const responseData = await response.json();

    return parseResponseData(responseData);
  }
}

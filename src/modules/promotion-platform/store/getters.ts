import { GetterTree } from 'vuex';
import CampaignContent from '../types/CampaignContent.model';

import PromotionPlatformState from '../types/PromotionPlatformState';

export const getters: GetterTree<PromotionPlatformState, any> = {
  campaignContent (state): CampaignContent | undefined {
    return state.campaignContent;
  },
  campaignToken (state): string | undefined {
    return state.campaignToken;
  },
  getProductCampaignDiscountPrice (state): (product: any) => number | undefined {
    return (product) => {
      const campaignContent = state.campaignContent;

      if (!campaignContent || !campaignContent.productDiscountPriceDictionary) {
        return;
      }

      const discountPrice = campaignContent.productDiscountPriceDictionary[product.id];

      if (!discountPrice) {
        return;
      }

      return discountPrice;
    }
  },
  lastClosedBannerVersionByUser (state): string | undefined {
    return state.lastClosedBannerVersionByUser;
  }
}

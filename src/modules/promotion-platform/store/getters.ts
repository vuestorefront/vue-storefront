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
  getProductCampaignDiscount (state): (product: any, format: boolean) => string | number | undefined {
    return (product, format = true) => {
      const campaignContent = state.campaignContent;

      if (!campaignContent || !campaignContent.discountsContent) {
        return;
      }

      const discount = campaignContent.discountsContent[product.id];

      if (!discount) {
        return format ? '' : 0;
      }

      if (format) {
        return discount;
      }

      return Number.parseInt(discount.split('$')[1], 10);
    }
  }
}

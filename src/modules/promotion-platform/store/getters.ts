import { GetterTree } from 'vuex';

import { ProductDiscountedPrice } from '@vue-storefront/core/modules/catalog';

import { CampaignContent } from '../types/CampaignContent.interface';
import PromotionPlatformState from '../types/PromotionPlatformState';

export const getters: GetterTree<PromotionPlatformState, any> = {
  campaignContent (state): CampaignContent | undefined {
    return state.campaignContent;
  },
  campaignToken (state): string | undefined {
    return state.campaignToken;
  },
  getProductCampaignDiscountPrice (state): (product: any) => ProductDiscountedPrice | undefined {
    return (product) => {
      const campaignContent = state.campaignContent;

      if (!campaignContent || !campaignContent.discounts) {
        return;
      }

      const discountPrice = campaignContent.discounts[product.id];

      if (!discountPrice) {
        return;
      }

      return discountPrice;
    }
  },
  productDiscount (state): Record<string, ProductDiscountedPrice> {
    return state.campaignContent?.discounts || {};
  },
  isSynced (state): boolean {
    return state.isSynced;
  },
  lastClosedBannerVersionByUser (state): string | undefined {
    return state.lastClosedBannerVersionByUser;
  },
  productionSpotCountdownExpirationDate (state): number | undefined {
    return state.productionSpotCountdownExpirationDate;
  }
}
